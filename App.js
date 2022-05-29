import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Amplify, { Auth, Hub, DataStore } from 'aws-amplify';
import { Message, User } from './src/models'
import config from './src/aws-exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Initializing from './app/navigation/Initialising';
import AuthenticationNavigator from './app/navigation/AuthenticationNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import Moment from 'moment';

Amplify.configure(config);

function App() {

  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  //Check whether latest message is synchronised with DataStore
  useEffect(() => {
    //Create listener
    const listener = Hub.listen('datastore', async hubData => {
      const { event, data } = hubData.payload;
      if (event === 'networkStatus') {
        console.log('User has a network connection:',data.active)
      }
      if (event === 'outboxMutationProcessed' && data.model === Message 
      && !(['DELIVERED','READ'].includes(data.element.status))) {
          // Set message status to delivered (if not already delivered or read)
          DataStore.save(
            Message.copyOf(data.element, (updated) => {
              updated.status= "DELIVERED"
            }
          )
          )
      }})
      //Remove listener
      return () => listener();
  },[])

    //Subcribe to user updates to maintain version of instance for fetching online status
    useEffect(() => {
      if (!user) {
        return;
      }
      const subscription = DataStore.observe(User, user.id).subscribe((user) => {
          //console.log(msg.element)
          if (user.model === User && user.opType === "UPDATE") {
            setUser(user.element);
          }
      });

      return () => subscription.unsubscribe();
    }, [user?.id]);

    //Subcribe to new User updates to save associated role info to Role table
    useEffect(() => {
      if (!user) {
        return;
      }
      const subscription = DataStore.observe(User.subscribe((user) => {
          //console.log(msg.element)
          if (user.model === User && user.opType === "UPDATE") {
            //setNewUser(user.element);
            console.log(user)
          }
      }));

      return () => subscription.unsubscribe();
    }, []);

  //Fetch user to log online status
  useEffect(() => {
    if (!user) {
      return;
    }
    fetchUser();
  },[])

  useEffect(()=> {
    if (!user) {
      return;
    }
    const interval = setInterval(() => {
      updateLastOnline();

    },5000);
    return () => clearInterval(interval);
  },[user])

  const fetchUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const user = await DataStore.query(User, userData.attributes.sub);
    if (user) {
      setUser(user);
    }
  }

  const updateLastOnline = async () => {

    if (!user) {
      return;
    }
    const response = await DataStore.save(
      User.copyOf(user, (updated) => {
        updated.lastOnlineAt = +(new Date());
      })
    )

    setUser(response);
  };

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('✅ User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('❌ User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppNavigator updateAuthState={updateAuthState} isUserLoggedIn={isUserLoggedIn}/>
      )}
      {isUserLoggedIn === 'loggedOut' && (
        <AuthenticationNavigator updateAuthState={updateAuthState} isUserLoggedIn={isUserLoggedIn}/>
      )}
    </NavigationContainer>
  );
}

export default App;
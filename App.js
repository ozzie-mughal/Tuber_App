import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Amplify, { Auth, Hub, DataStore } from 'aws-amplify';
import { Message } from './src/models'
import config from './src/aws-exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Initializing from './app/navigation/Initialising';
import AuthenticationNavigator from './app/navigation/AuthenticationNavigator';
import AppNavigator from './app/navigation/AppNavigator';

Amplify.configure(config);

function App() {

  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

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
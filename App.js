import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Amplify from 'aws-amplify';
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
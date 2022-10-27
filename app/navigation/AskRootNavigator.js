import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AskModal from '../components/AskModal/AskStack';

const Stack = createNativeStackNavigator();

const AskRootNavigator = props => {
  
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='Ask Stack' component={AskModal}/>
      </Stack.Navigator>
    );
  };

  export default AskRootNavigator;
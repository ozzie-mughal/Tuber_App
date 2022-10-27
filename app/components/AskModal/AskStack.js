import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AskHow from './AskHow';
import AskWho from './AskWho';

const AskStack = createNativeStackNavigator();

const AskModal = props => {
  
    return (
      <AskStack.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <AskStack.Screen name='Ask How'>
        {screenProps => (
                <AskHow {...screenProps} />
              )}
        </AskStack.Screen>
        <AskStack.Screen name='Ask Who'>
        {screenProps => (
                <AskWho {...screenProps} />
              )}
        </AskStack.Screen>
      </AskStack.Navigator>
    );
  };

  export default AskModal;
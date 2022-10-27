import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import NewAsk_SelectWho from './NewAsk_SelectWho';
import NewAsk_Summary from './NewAsk_Summary';

const MainStack = createNativeStackNavigator();

const NewAskMainNavigator = props => {
  
    return (
        <MainStack.Navigator>
            <MainStack.Screen name = 'NewAsk_SelectWho' options={{headerShown: false}}>
            {screenProps => (
                <NewAsk_SelectWho {...screenProps} updateAuthState={props.updateAuthState} />
              )}
            </MainStack.Screen>
            <MainStack.Screen name = 'NewAsk_Summary' options={{headerShown: false}}>
            {screenProps => (
                <NewAsk_Summary {...screenProps} updateAuthState={props.updateAuthState} />
              )}
            </MainStack.Screen>
        </MainStack.Navigator>
    );
  };

  export default NewAskMainNavigator;
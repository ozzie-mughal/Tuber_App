import React from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import MyBumpsScreen from '../screens/MyBumpsScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import MyTabs from '../navigation/BottomTab'

const AppStack = createNativeStackNavigator();

const AppNavigator = props => {
  
    return (
      <AppStack.Navigator>
        <AppStack.Screen name="MyTabs" options={{headerShown: false}}>
            {screenProps => (
                <MyTabs {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </AppStack.Screen>
        {/* <AppStack.Screen name="Home" options={{headerShown:false}}>
          {screenProps => (
            <WelcomeScreen {...screenProps} updateAuthState={props.updateAuthState} />
          )}
        </AppStack.Screen>
        <AppStack.Screen name="MyBumps" options={{headerShown:false}}>
          {screenProps => (
            <MyBumpsScreen {...screenProps} updateAuthState={props.updateAuthState} />
          )}
        </AppStack.Screen>*/}
        <AppStack.Screen name="ChatRoom" options={{headerShown:true}}>
          {screenProps => (
            <ChatRoomScreen {...screenProps} updateAuthState={props.updateAuthState} />
          )}
        </AppStack.Screen> 
      </AppStack.Navigator>
    );
  };

  export default AppNavigator;
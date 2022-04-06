import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
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
        <AppStack.Screen name="ChatRoom" options={{headerShown:true}}>
          {screenProps => (
            <ChatRoomScreen {...screenProps} updateAuthState={props.updateAuthState} />
          )}
        </AppStack.Screen> 
      </AppStack.Navigator>
    );
  };

  export default AppNavigator;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import MyTabs from '../navigation/BottomTab'
import colors from '../styles/colors';
import ChatRoomScreenHeader from '../components/ChatRoomScreenHeader';
import NewAskModal from '../components/NewAskModal';


const AppStack = createNativeStackNavigator();

const AppNavigator = props => {
  
    return (
      <AppStack.Navigator>
        <AppStack.Screen name="MyTabs" options={{headerShown: false}}>
            {screenProps => (
                <MyTabs {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </AppStack.Screen>
        <AppStack.Screen name="New Ask" options={{headerShown: false}}>
            {screenProps => (
                <NewAskModal {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </AppStack.Screen>
        <AppStack.Screen name="ChatRoom" options={({ route }) => ({
          headerTitle: () => <ChatRoomScreenHeader id={route.params?.id}/>,
          headerShown:true,
          headerStyle: {backgroundColor:colors.slate_blue_light},
          headerShadowVisible: false,
          headerTintColor: colors.turquoise})}>
          {screenProps => (
            <ChatRoomScreen {...screenProps} updateAuthState={props.updateAuthState} />
          )}
        </AppStack.Screen> 
      </AppStack.Navigator>
    );
  };

  export default AppNavigator;
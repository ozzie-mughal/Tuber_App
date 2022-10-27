import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import MyTabs from '../navigation/BottomTab'
import MyDrawer from './HamburgerMenu';
import colors from '../styles/colors';
import ChatRoomScreenHeader from '../components/ChatRoomScreenHeader';
import NewAsk from '../components/NewAsk';
import AskRootNavigator from './AskRootNavigator';
import AskHow from '../components/AskModal/AskHow';
import AskModal from '../components/AskModal/AskStack';
import AskWho from '../components/AskModal/AskWho';
import AskNowWidget from '../components/AskNow/components/AskNowWidget';
import NewAskNavigator from '../components/AskNow/screens/NewAskModal';

const AppStack = createNativeStackNavigator();

const AppNavigator = props => {
  
    return (
      <AppStack.Navigator>

        <AppStack.Group>
        {/* <AppStack.Screen name="MyTabs" options={{headerShown: false}}>
            {screenProps => (
                <MyTabs {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </AppStack.Screen> */}
        <AppStack.Screen name="MyDrawer" options={{headerShown: false}}>
            {screenProps => (
                <MyDrawer {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </AppStack.Screen>
        <AppStack.Screen name="New Ask Modal" options={{headerShown: false}}>
            {screenProps => (
                <NewAsk {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </AppStack.Screen>
        <AppStack.Screen name="Ask Now" options={{headerShown: false}}>
            {screenProps => (
                <AskNowWidget {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </AppStack.Screen>
        <AppStack.Screen name="Quick Ask" options={{
          headerTitle: "Quick Ask",
          headerShown:true,
          headerStyle: {backgroundColor:colors.startup_purple},
          headerTitleStyle: {fontFamily: 'Nunito-Bold',fontSize: 24},
          headerShadowVisible: false,
          headerTintColor: colors.yellow_sun}}>
            {screenProps => (
                <NewAskNavigator {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </AppStack.Screen>
        <AppStack.Screen name="ChatRoom" options={({ route }) => ({
          headerTitle: () => <ChatRoomScreenHeader id={route.params?.id}/>,
          headerShown:true,
          headerStyle: {backgroundColor:colors.startup_purple},
          headerShadowVisible: false,
          headerTintColor: colors.yellow_sun})}>
          {screenProps => (
            <ChatRoomScreen {...screenProps} updateAuthState={props.updateAuthState} />
          )}
        </AppStack.Screen> 
        </AppStack.Group>

        <AppStack.Group screenOptions={{ 
          headerShown: false,
           }}>
          <AppStack.Screen name='Ask How'>
                  {screenProps => (
                          <AskHow {...screenProps} />
                        )}
                  </AppStack.Screen>
                  <AppStack.Screen name='Ask Who'>
                  {screenProps => (
                          <AskWho {...screenProps} />
                        )}
                  </AppStack.Screen>        
        </AppStack.Group>
      </AppStack.Navigator>
    );
  };

  export default AppNavigator;
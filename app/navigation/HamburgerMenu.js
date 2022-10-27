import * as React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MyTabs from './BottomTab';
import colors from '../styles/colors';
import { Auth } from 'aws-amplify';

const SettingsScreen = ({ updateAuthState }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button title='see updateState' onPress={()=>{updateAuthState('loggedOut')}}/>
    </View>
  );
}
const LogOutScreen = ({ updateAuthState }) => {

  alert(
    'You have been logged out.',
    '',
    [
      {
        text: 'Cancel',
      },
      {
        text: 'Log Out',
        onPress: signOut(updateAuthState),
        style: 'destructive'
      },
    ]
  )

  //alert('You pressed log out', [{ text: 'OK'}]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      </View>
    
  );
}

async function signOut(updateAuthState) {
  try {
      await Auth.signOut();
      //console.log(isUserLoggedIn);
      updateAuthState('loggedOut');
  } 
  catch(error) {
      console.log('Error signing out: ', error)
  }
  }

  
  const Drawer = createDrawerNavigator();
  
  const MyDrawer = props => {

  return (
    <Drawer.Navigator
    screenOptions={{
      headerShown: true, 
      drawerActiveTintColor: colors.startup_purple,
      drawerActiveBackgroundColor: colors.grey_lightest}}
    >
      <Drawer.Screen name="Dashboard" options={{headerShown: false}}>
            {screenProps => (
                <MyTabs {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </Drawer.Screen>
      <Drawer.Screen name="My Profile" component={SettingsScreen} />
      <Drawer.Screen name="Give Us Feedback" component={SettingsScreen} />
      <Drawer.Screen name="FAQ" component={SettingsScreen} />
      <Drawer.Screen name="Help / Report a Problem" component={SettingsScreen} />
      <Drawer.Screen name="Log Out"
        options={{headerShown: false, drawerLabelStyle:{color:'tomato'}}} >
          {screenProps => (
                <LogOutScreen {...screenProps} updateAuthState={props.updateAuthState} />
              )}
        </Drawer.Screen>
      
    </Drawer.Navigator>
  );
}

export default MyDrawer;
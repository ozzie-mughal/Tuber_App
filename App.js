import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
  Alert, Image, SafeAreaView, Button } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './app/navigation/BottomTab';
import MyDrawer from './app/navigation/HamburgerMenu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { create } from '@mui/material/styles/createTransitions';
import ChatRoomScreen from './app/screens/ChatRoomScreen';
import BumpModal from './app/components/BumpModal';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
  <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen options={{headerShown:false}} name='Login' component={LoginScreen}/>
      <Stack.Screen options={{headerShown:false}} name='Home' component={MyTabs}/>
      <Stack.Screen options={{headerShown:false}} name='Register' component={RegisterScreen}/>
      <Stack.Screen options={{headerShown:false}} name='Drawer' component={MyDrawer}/>
      <Stack.Screen 
        options={{
          headerShown:true, 
          headerBackTitleVisible: false
          }} 
        name='Chat'  
        component={ChatRoomScreen}
      />
      <Stack.Screen options={{headerShown:false}} name='BumpModal' component={BumpModal}/>


    </Stack.Navigator>

  </NavigationContainer>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

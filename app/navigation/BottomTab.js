import * as React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import StoreScreen from '../screens/StoreScreen';
import MyTutorsScreen from '../screens/MyTutorsScreen';
import MyBumpsScreen from '../screens/MyBumpsScreen'
import BumpComponent from '../components/BumpComponent';
import BumpModal from '../components/BumpModal';
import { BlurView } from 'expo-blur';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

//Declare icons
const inbox = <FontAwesome5 name={"inbox"} color={"#0AFFC2"} size={25}/>;



function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarActiveBackgroundColor: '#c0c2c4',
        tabBarLabelStyle: styles.tablabel,
    tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={30} style={StyleSheet.absoluteFill} />
    ),
  }}>
      <Tab.Screen 
      name="Home" 
      component={WelcomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{alignItems:'center'}}>
          <Image
            source={require('../assets/home-fill.png')} />
          <Text style={styles.tablabel}>Home</Text>
          </View>
          )}} />
      <Tab.Screen 
      name="My Tutors" 
      component={MyTutorsScreen}
      options={{
        tabBarLabel: 'My Tutors',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{right: 10, alignItems:'center'}}>
          <Image
            source={require('../assets/user-star-fill.png')} />
          <Text style={styles.tablabel}>My Tutors</Text>
          </View>
          )}} />
      <Tab.Screen 
      name="Store" 
      component={StoreScreen}
      options={{
        tabBarLabel: 'Store',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{left: 10, alignItems:'center'}}>
          <Image
            source={require('../assets/coins-fill.png')} />
          <Text style={styles.tablabel}>Store</Text>
          </View>
        ),
      }}/> 
      <Tab.Screen 
      name="My Bumps" 
      component={MyBumpsScreen}
      options={{
        tabBarLabel: 'My Bumps',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{alignItems:'center'}}>
            {inbox}
            <Text style={styles.tablabel}>My Bumps</Text>
          </View>
          )}} />
      <Tab.Screen 
        name="Bump" 
        component={BumpComponent}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => (<BumpModal {...props}/>),
          tabBarIcon: ({tintColor}) => (
            <View 
            style={{
              backgroundColor: "#FFF000",
              borderRadius: 40,
              borderWidth: 3,
              height: 80,
              width: 80,
              right: 0.5*Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
              ...styles.shadow
            }}>
              <FontAwesome 
                  name={"paper-plane"} 
                  color={"black"} 
                  size={40}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tablabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000"
  },
  shadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.7,
    shadowRadius: 7,
    shadowOffset : { width: 2, height: 2}
},
})

export default MyTabs;
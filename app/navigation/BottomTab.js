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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../styles/colors';
import { Auth } from 'aws-amplify';


const Tab = createBottomTabNavigator();


//Declare icons
const inbox = <FontAwesome5 name={"inbox"} color={colors.aquamarine} size={25}/>;
const store = <FontAwesome5 name={"coins"} color={colors.aquamarine} size={25}/>;
const myTutors = <MaterialIcons name={"favorite"} color={colors.aquamarine} size={25}/>;
const home = <MaterialIcons name={"home"} color={colors.aquamarine} size={25}/>;
const paperPlane = <FontAwesome name={"paper-plane"} color={"black"} size={40}/>

const MyTabs = props => {
  
  return (
    <Tab.Navigator
      screenOptions={{
      headerShown: false, 
      tabBarActiveBackgroundColor: '#c0c2c4',
      tabBarLabelStyle: styles.tablabel,
      tabBarShowLabel: false,
      tabBarStyle: { position: 'absolute' },
  }}>
      <Tab.Screen name="Home" options={{tabBarLabel: 'Home',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{alignItems:'center'}}>
          {home}
          <Text style={styles.tablabel}>Home</Text>
          </View>
          )}} >
        {screenProps => (
                <WelcomeScreen {...screenProps} updateAuthState={props.updateAuthState} />
              )}
      </Tab.Screen>

      <Tab.Screen name="My Tutors" options={{
        tabBarLabel: 'My Tutors',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{right: 10, alignItems:'center'}}>
          {myTutors}
          <Text style={styles.tablabel}>My Tutors</Text>
          </View>
          )}} >
        {screenProps => (
                <MyTutorsScreen {...screenProps} updateAuthState={props.updateAuthState} />
              )}
      </Tab.Screen>

      <Tab.Screen name="Store" options={{
        tabBarLabel: 'Store',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{left: 10, alignItems:'center'}}>
          {store}
          <Text style={styles.tablabel}>Store</Text>
          </View>
        ),
      }}>
        {screenProps => (
                <StoreScreen {...screenProps} updateAuthState={props.updateAuthState} />
              )}
      </Tab.Screen>

      <Tab.Screen name="My Bumps" options={{
        tabBarLabel: 'My Bumps',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{alignItems:'center'}}>
            {inbox}
            <Text style={styles.tablabel}>My Bumps</Text>
          </View>
          )}} >
        {screenProps => (
                <MyBumpsScreen {...screenProps} updateAuthState={props.updateAuthState} />
              )}
      </Tab.Screen>

      <Tab.Screen name="Bump" 
        component={BumpComponent}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => (<BumpModal {...props}/>),
          tabBarIcon: ({tintColor}) => (
            <View style={[styles.bumpIcon,styles.shadow]}>
              {paperPlane}
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
  bumpIcon: {
    backgroundColor: colors.aquamarine,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    height: 80,
    width: 80,
    right: 0.5*Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default MyTabs;
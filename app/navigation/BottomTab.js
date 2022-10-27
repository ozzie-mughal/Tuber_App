import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import StoreScreen from '../screens/StoreScreen';
import MyTutorsScreen from '../screens/MyTutorsScreen';
import MyAsksScreen from '../screens/MyAsksScreen'
import BumpComponent from '../components/BumpComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';
import NewAsk from '../components/NewAsk';

const Tab = createBottomTabNavigator();

//Declare icons
const inbox = <FontAwesome5 name={"inbox"} color={colors.grey_light} size={32}/>;
const store = <AntDesign name={"appstore1"} color={colors.grey_light} size={32}/>;
const myTutors = <MaterialIcons name={"favorite"} color={colors.grey_light} size={32}/>;
const home = <MaterialIcons name={"home"} color={colors.grey_light} size={32}/>;
const paperPlane = <FontAwesome name={"paper-plane"} color={'white'} size={40}/>
const inbox_active = <FontAwesome5 name={"inbox"} color={colors.startup_purple} size={32}/>;
const store_active = <AntDesign name={"appstore1"} color={colors.startup_purple} size={32}/>;
const myTutors_active = <MaterialIcons name={"favorite"} color={colors.startup_purple} size={32}/>;
const home_active= <MaterialIcons name={"home"} color={colors.startup_purple} size={32}/>;
const paperPlane_active = <FontAwesome name={"paper-plane"} color={'white'} size={40}/>

const PlaceholderNewAsk = () => {
  return (
    <View>
      <Text>this is a placeholder for New Ask</Text>
    </View>
  )
}




const MyTabs = props => {
  
  const [showNewAsk, setShowNewAsk] = useState(false);
  
  return (
    <Tab.Navigator
      screenOptions={{
      headerShown: false, 
      tabBarActiveTintColor: colors.turquoise_blue,
      tabBarInactiveTintColor: 'transparent',
      //tabBarActiveBackgroundColor: '#c0c2c4',
      tabBarLabelStyle: styles.tablabel,
      tabBarShowLabel: false,
      tabBarStyle: { position: 'absolute', borderTopWidth: 2, bottom:-5,borderColor:colors.grey },
  }}>
      <Tab.Screen name="Home" options={{tabBarLabel: 'Home',
        
        tabBarIcon: ({focused, color, size}) => (
          <View style={{alignItems:'center'}}>
          {focused ? home_active : home}
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
          <View style={{alignItems:'center'}}>
          {focused ? myTutors_active : myTutors}
          <Text style={styles.tablabel}>My Tutors</Text>
          </View>
          )}} >
        {screenProps => (
                <MyTutorsScreen {...screenProps} updateAuthState={props.updateAuthState} />
              )}
      </Tab.Screen>

      <Tab.Screen name="New Ask" component={PlaceholderNewAsk}
        options={{
          tabBarButton: () => (<NewAsk showNewAsk={showNewAsk} setShowNewAsk={setShowNewAsk}/>),
        }}/>
      {/* <Tab.Screen name="New Ask" options={{
        tabBarShowLabel: false,
        unmountOnBlur: true,
        tabBarItemStyle: {backgroundColor: colors.turquoise_blue, 
          borderWidth:3, borderColor:'white',
        borderRadius: 30, shadowColor: '#000000',
        shadowOpacity: 0.7,
        shadowRadius: 7,
        shadowOffset : { width: 0, height: 2}},
        tabBarIcon: ({focused, color, size}) => (
          <View style={{alignItems:'center'}}>
          {paperPlane}
          </View>
        ),
      }}>
        {screenProps => (
          <BumpComponent {...screenProps} updateAuthState={props.updateAuthState} />
          
          )}
      </Tab.Screen> */}

      <Tab.Screen name="Store" options={{
        tabBarLabel: 'Store',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{alignItems:'center'}}>
          {focused ? store_active : store}
          <Text style={styles.tablabel}>Store</Text>
          </View>
        ),
      }}>
        {screenProps => (
          <StoreScreen {...screenProps} updateAuthState={props.updateAuthState} />
          )}
      </Tab.Screen>

      <Tab.Screen name="My Asks" options={{
        tabBarLabel: 'My Asks',
        tabBarIcon: ({focused, color, size}) => (
          <View style={{alignItems:'center'}}>
            {focused ? inbox_active : inbox}
            <Text style={styles.tablabel}>My Asks</Text>
          </View>
          )}} >
        {screenProps => (
          <MyAsksScreen {...screenProps} updateAuthState={props.updateAuthState} />
          )}
      </Tab.Screen>

              

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
    backgroundColor: colors.turquoise_blue,
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
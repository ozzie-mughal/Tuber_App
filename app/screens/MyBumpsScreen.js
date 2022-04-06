import { FlatList, ScrollView, Dimensions, StyleSheet, Text, View, 
  Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { Fragment } from 'react';
import ChatRoomPreview from '../components/ChatRoomPreview';
import WavyHeader from '../components/WavyHeader';
import chatRoomsData from '../assets/dummy-data/ChatRooms';
import colors from '../styles/colors';
import elements from '../styles/elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import BumpModal from '../components/BumpModal';


//Declare dummy data
const chatRoom1 = chatRoomsData[0];
const chatRoom2 = chatRoomsData[1];
const newMessage = <Entypo name={"new-message"} color={'white'} size={25} style={{marginHorizontal: 5}}/>;



const MyBumpsScreen = () => {

  return (
    <Fragment>
    <SafeAreaView style={{flex:0, backgroundColor:colors.grey_lightest}}/>
    <SafeAreaView style={styles.page}>
    {/* Header Components */}
      <View style={styles.header_container}>   
        <LinearGradient
                // Background Linear Gradient
                colors={[colors.grey_lightest, colors.grey_light]}
                locations={[0.5,0.8]}
                style={[styles.background]}
        />             
        <Text style={elements.contentHeading_text}>My Asks</Text>
        <Text style={{fontSize: 24,
          fontWeight: '600',
          color: colors.grey}}>
            View all your current and previous questions.
        </Text>
        <View style={{flexDirection:'row', justifyContent:'flex-end',}}>
          <TouchableOpacity 
            style={styles.newAskButton}
            >
            {newMessage}
            <Text style={styles.newAskButtonText}>New Ask</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*Message Previews */}
      <FlatList
          data={chatRoomsData}
          renderItem={({ item }) => <ChatRoomPreview chatRoom={item}/> }
          style={styles.messagepreviews_container}
      />

    </SafeAreaView>
    </Fragment>
  )
}

export default MyBumpsScreen

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
},
  page: {
    flex: 1,
    backgroundColor: colors.grey_light
  },
  header_container: {
    paddingHorizontal: 15,
    backgroundColor: colors.grey_lightest,
    width: "100%",
    height: "20%",

  },
  messagepreviews_container: {
    padding: 10,
    borderRadius: 30,
    backgroundColor:'white',

  },
  heading_text: {
      fontSize: 48,
      fontWeight: "800"
  },
  subheading_text: {
      fontSize: 20,
      fontWeight: "600",
  },
  newAskButton: {
    backgroundColor: colors.skyblue_crayola,
    borderRadius: 15,
    flexDirection:'row', 
    justifyContent:'center',
    width: 120,
    padding: 5,
    shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
  },
  newAskButtonText: {
    fontSize: 18,
    fontWeight: '500',
    padding: 5,
    color: 'white'
  }
})
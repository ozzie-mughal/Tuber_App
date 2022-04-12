import { FlatList, ScrollView, Dimensions, StyleSheet, Text, View, 
  Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { Fragment, useState, useEffect } from 'react';
import ChatRoomPreview from '../components/ChatRoomPreview';
import colors from '../styles/colors';
import elements from '../styles/elements';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatRoom, ChatRoomUser } from '../../src/models';
import { Auth, DataStore } from 'aws-amplify';
import BumpModal from '../components/BumpModal';

//Icons
const newMessage = <Entypo name={"new-message"} color={'white'} size={20} style={{marginHorizontal: 5}}/>;
const search_icon = <Ionicons name={"search"} color={'white'} size={30} style={{marginHorizontal: 5}}/>;


const MyAsksScreen = (props) => {

  const [chatRooms, setChatRooms] = useState([]);

  //Fetch chatRooms
  useEffect(() => {
    const fetchChatRooms = async () => {
      //Fetch only chatrooms which current user belongs to
      const authUser = await Auth.currentAuthenticatedUser();
      //DataStore.clear();
      const chatRooms = (await DataStore.query(ChatRoomUser))
          .filter(
            (chatRoomUser) => chatRoomUser.user.id === authUser.attributes.sub)
          .map(
            (chatRoomUser) => chatRoomUser.chatRoom);
      //console.log(chatRooms);
      setChatRooms(chatRooms);
    };
    fetchChatRooms();
  },[])

  //on New Ask press
  const newAskOnPress = (props) => {
    return (
      <BumpModal {...props}/>
    )
  }

  return (
    <Fragment>
    <SafeAreaView style={{flex:0, backgroundColor:colors.slate_blue}}/>
    <SafeAreaView style={styles.page}>
    {/* Header Components */}
      <View style={styles.header_container}>   
        <LinearGradient
                // Background Linear Gradient
                colors={[colors.slate_blue, colors.lavender_blue]}
                locations={[0.2,0.9]}
                style={[styles.background]}
        />         
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>    
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={elements.contentHeading_text}>My Asks</Text>
            <Text style={elements.contentSubheading_text}> (2)</Text>
          </View>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
            {search_icon}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'flex-start', marginVertical: 20}}>
          <TouchableOpacity 
            style={styles.newAskButton}
            onPress={newAskOnPress}
          >
            {newMessage}
            <Text style={styles.newAskButtonText}>New Ask</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*Message Previews */}
      <FlatList
          data={chatRooms}
          renderItem={({ item }) => <ChatRoomPreview chatRoom={item}/> }
          style={styles.messagepreviews_container}
      />



    </SafeAreaView>
    </Fragment>
  )
}

export default MyAsksScreen

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
    backgroundColor: colors.lavender_blue
  },
  header_container: {
    paddingHorizontal: 15,
    backgroundColor: colors.grey_lightest,
    width: "100%",
    height: "17%",

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
    backgroundColor: colors.turquoise,
    borderRadius: 15,
    flexDirection:'row', 
    justifyContent:'center',
    width: 110,
    padding: 5,
    shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
  },
  newAskButtonText: {
    fontSize: 14,
    fontWeight: '500',
    padding: 5,
    color: 'white'
  }
})
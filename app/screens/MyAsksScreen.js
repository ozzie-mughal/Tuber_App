import { FlatList, ScrollView, Dimensions, StyleSheet, Text, View, 
  Image, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { Fragment, useState, useEffect } from 'react';
import ChatRoomPreview from '../components/ChatRoomPreview';
import colors from '../styles/colors';
import elements from '../styles/elements';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatRoom, ChatRoomUser } from '../../src/models';
import { Auth, DataStore } from 'aws-amplify';
import NewAsk from '../components/NewAsk';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Moment from 'moment';
import moment from 'moment';


//Icons
const newMessage = <Ionicons name={"ios-create-outline"} color={colors.yellow_sun} size={35} style={{marginHorizontal: 5}}/>;
const search_icon = <Ionicons name={"search"} color={colors.yellow_sun} size={30} style={{marginHorizontal: 5}}/>;
const hamburger_menu = <Entypo name={"menu"} color={colors.yellow_sun} size={40}/>;


const MyAsksScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true)

  const [chatRooms, setChatRooms] = useState([]);
  const [activeChatCount, setActiveChatCount] = useState(0);
  const [showNewAsk, setShowNewAsk] = useState(false);
  const [toggleActiveAsks, setToggleActiveAsks] = useState(0);
  const [showActiveAsks, setShowActiveAsks] = useState(true);

  const renderLoading = () =>  {
    if (isLoading) {
        return (         
        <SafeAreaView style = {{flex:1,justifyContent: 'center', backgroundColor: 'white', textAlign: 'center',}}>
        <ActivityIndicator
        color = {colors.turquoise_blue}
        size = 'large'
        animated = {false}
      />
      <Text style = {[{fontWeight:'600',textAlign: 'center'}]}>Loading Dashboard</Text>
      </SafeAreaView>

        );
    }else {
        return null;
    }
}


  //Fetch chatRooms
  const fetchChatRooms = async (toggleValue) => {
    //Fetch only chatrooms which current user belongs to
    const authUser = await Auth.currentAuthenticatedUser();
    //DataStore.clear();
    if (toggleValue === 'All') {
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === authUser.attributes.sub)
        .map(
          (chatRoomUser) => chatRoomUser.chatRoom)
        .sort((a, b) => (a._lastChangedAt > b._lastChangedAt) ? -1 : 1);

      setChatRooms(chatRooms);

    } else if (toggleValue === 'Active') {
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === authUser.attributes.sub)
        .map(
          (chatRoomUser) => chatRoomUser.chatRoom)
        .filter(
          (chatRoom) => chatRoom.active === true)
        .sort((a, b) => (a._lastChangedAt > b._lastChangedAt) ? -1 : 1);
          
      setChatRooms(chatRooms);
      setActiveChatCount(chatRooms.length);
    }
    //console.log(chatRooms);
  };
  
  useEffect(() => {
    fetchChatRooms('Active');
  },[])

  useEffect(() => {
    if (isLoading){
        setIsLoading(!isLoading);
    }
})


  return (
    <SafeAreaView style={styles.page}>
    {/* Header Components */}
        <LinearGradient
                // Background Linear Gradient
                colors={[colors.startup_purple, colors.startup_purple]}
                locations={[0,0.3]}
                //start={{x:0.1,y:0.3}}
                //end={{x:0.7,y:0.5}}
                style={[styles.background]}
        />         
      <View style={styles.header_container}>   
        <View style={{flexDirection:'row', justifyContent:'center'}}>   
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', position:'absolute', left: 0}}
            onPress={()=>props.navigation.toggleDrawer()}>
              {hamburger_menu}
          </TouchableOpacity>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={elements.pageHeading_text}>My Asks</Text>
            <Text style={elements.pageSubheading_text}> ({activeChatCount})</Text>
          </View>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', position:'absolute', right: 0}}
            onPress={()=> {setShowNewAsk(true)}}>
            {newMessage}
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center', marginTop: 30}}>
          <SegmentedControl
            tintColor={colors.turquoise_green}
            fontStyle={{fontFamily:'Nunito-Bold', color:'black'}}
            activeFontStyle={{color:'black'}}
            values={['Active', 'All']}
            selectedIndex={0}
            onValueChange={(value) => {
              fetchChatRooms(value);
            }}
            style={{width:'60%'}}
          />
        </View>
      </View>
      {/*Message Previews */}
      {renderLoading()}
      {!isLoading && <FlatList
          data={chatRooms}
          renderItem={({ item }) => <ChatRoomPreview chatRoom={item}/> }
          style={styles.messagepreviews_container}
      />}
      {/* <NewAsk showNewAsk={showNewAsk} navigation={props.navigation} setShowNewAsk={setShowNewAsk}/> */}
    </SafeAreaView>
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
    //backgroundColor: colors.lavender_blue
  },
  header_container: {
    paddingHorizontal: 15,
    //backgroundColor: colors.grey_lightest,
    width: "100%",
    height: "15%",

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
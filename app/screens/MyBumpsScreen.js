import { FlatList, ScrollView, Dimensions, StyleSheet, Text, View, Image, SafeAreaView, } from 'react-native';
import React, { Fragment } from 'react';
import ChatRoomPreview from '../components/ChatRoomPreview';
import WavyHeader from '../components/WavyHeader';
import chatRoomsData from '../assets/dummy-data/ChatRooms';

//Declare dummy data
const chatRoom1 = chatRoomsData[0];
const chatRoom2 = chatRoomsData[1];

const MyBumpsScreen = () => {

  return (
    <Fragment>
    <SafeAreaView style={{flex:0, backgroundColor:"#0AFFC2"}}/>
    <SafeAreaView style={styles.page}>
    {/* Header Components */}
      <View style={styles.header_container}>                
            <Text style={styles.heading_text}>My Bumps</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:5}}>
                <Text style={[styles.subheading_text, {textAlign:'right'}]}>
                    See all your current and previous questions here!
                </Text>
            </View>
        </View>
      <View style={{
            height: 50,
        }}>
            <WavyHeader
                customHeight={450}
                customBgColor="white"
                customFill="#0affc2"
                customFillOpacity="0"
                customWavePattern="m0 0 48 26.7C96 53 192 107 288 144s192 59 288 48 192-53 288-80 192-37 288-26.7c96 10.7 192 42.7 240 58.7l48 16V0H0Z"
            />
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
  page: {
    flex: 1,
    backgroundColor: "white"
  },
  header_container: {
    paddingHorizontal: 15,
    backgroundColor: '#0AFFC2',
    width: "100%",
    height: "15%",

  },
  messagepreviews_container: {
    padding: 10,
  },
  heading_text: {
      fontSize: 48,
      fontWeight: "800"
  },
  subheading_text: {
      fontSize: 20,
      fontWeight: "600",
  },
  svgCurve: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      backgroundColor: 'white'
  },
})
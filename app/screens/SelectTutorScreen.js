import { FlatList, ScrollView, Dimensions, StyleSheet, Text, View, 
  Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import WavyHeader from '../components/WavyHeader';
import Users from '../assets/dummy-data/Users';
import colors from '../styles/colors';
import elements from '../styles/elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import BumpModal from '../components/BumpModal';
import UserPreview from '../components/UserPreview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';


//Declare dummy data
//const chatRoom1 = chatRoomsData[0];
//const chatRoom2 = chatRoomsData[1];
//const newMessage = <Entypo name={"new-message"} color={'black'} size={25} style={{marginHorizontal: 5}}/>;



const SelectTutorScreen = ( { ...props } ) => {

  return (
    <View style={styles.page}>
    {/* Header Components */}
      <View style={styles.header_container}>   
        <SegmentedControl
          tintColor={colors.aquamarine}
          fontStyle={{color: 'black'}}
          values={['Favourites', 'Top-Rated', 'All']}
        />
      </View>
      {/*User Previews */}
      <FlatList
          data={Users}
          renderItem={({ item }) => <UserPreview user={item} showButton={true} 
            buttonTitle="Select" onPress={()=>{
              try {
                props.selectTutorAction(item)
              }
              finally {
                //console.log('the tutor selected is ',selectedTutor)
                props.setShowActionModal(false)

            }}}/> }
          style={styles.messagepreviews_container}
      />
    </View>
  )
}

export default SelectTutorScreen

const styles = StyleSheet.create({
  page: {
    //flex: 1,
    backgroundColor: colors.grey_light
  },
  header_container: {
    paddingHorizontal: 15,
    backgroundColor: colors.grey_lightest,
    width: "100%",
    height: "10%",

  },
  messagepreviews_container: {
    padding: 10,
    //borderRadius: 30,
    backgroundColor:'white',
    height: '80%'

  }
})
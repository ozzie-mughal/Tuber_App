import React, { Fragment, useEffect, useState } from 'react';
import Users from '../assets/dummy-data/Users';
import colors from '../styles/colors';
import elements from '../styles/elements';
import UserPreview from '../components/UserPreview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../src/models';
import { FlatList, ScrollView, Dimensions, StyleSheet, Text, View, 
  Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const MyTutorsScreen = () => {

  const arrowRight = <MaterialIcons name={"keyboard-arrow-right"} color={colors.sky_pink} size={40}/>;

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
        <Text style={elements.contentHeading_text}>My Tutors</Text>
        <Text style={{fontSize: 24,
          fontWeight: '600',
          color: colors.grey}}>
            View your favourite tutors.
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={{alignItems:'center'}}>
          <SegmentedControl
            tintColor={colors.skyblue_crayola}
            fontStyle={{color: 'black'}}
            values={['Favourites', 'Top-Rated', 'All']}
            selectedIndex={0}
            style={{width:'80%'}}
          />
        </View>
      {/*User Previews */}
      <FlatList
          data={Users}
          renderItem={({ item }) => <UserPreview user={item} showButton={true} 
            buttonTitle={arrowRight} onPress={()=>{
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
    </SafeAreaView>
    </Fragment>
  )
}

export default MyTutorsScreen

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
  contentContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  messagepreviews_container: {
    padding: 10,
    //borderRadius: 30,
    backgroundColor:'white',
    height: '80%'

  },
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
})
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
import Ionicons from 'react-native-vector-icons/Ionicons';


const MyTutorsScreen = () => {

  const arrowRight = <MaterialIcons name={"keyboard-arrow-right"} color={colors.sky_pink} size={40}/>;
  const search_icon = <Ionicons name={"search"} color={'white'} size={30} style={{marginHorizontal: 5}}/>;

  const [users, setUsers] = useState([]);

  useEffect(()=> {
    try {DataStore.query(User).then(setUsers);
    console.log(users)
    }
    catch (e) {
      console.log("Datastory query error: ",e)
    }
    },[])
  
  return (
    <Fragment>
    <SafeAreaView style={{flex:0, backgroundColor:colors.skyblue_crayola}}/>
    <SafeAreaView style={styles.page}>
    {/* Header Components */}
    <View style={styles.header_container}>   
        <LinearGradient
                // Background Linear Gradient
                colors={[colors.skyblue_crayola, colors.baby_blue_light]}
                locations={[0.4,0.8]}
                style={[styles.background]}
        />         
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>    
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={elements.contentHeading_text}>My Tutors</Text>
          </View>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
            {search_icon}
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center', marginTop: 40}}>
          <SegmentedControl
            tintColor={colors.sky_pink_light}
            fontStyle={{color: 'white'}}
            values={['Favourites', 'Top-Rated', 'All']}
            selectedIndex={0}
            style={{width:'90%'}}
          />
        </View>

    </View>

    {/*Content components*/}
      {/*User Previews */}
      <FlatList
          data={users}
          renderItem={({ item }) => <UserPreview user={item} showArrow={true}
            onPress={()=>{
              try {
                props.selectTutorAction(item)
              }
              finally {
                //console.log('the tutor selected is ',selectedTutor)
                props.setShowActionModal(false)

            }}}/> }
          style={styles.messagepreviews_container}
      />
    </SafeAreaView>
    </Fragment>
  )
}

export default MyTutorsScreen

const styles = StyleSheet.create({
  header_container: {
    paddingHorizontal: 15,
    backgroundColor: colors.grey_lightest,
    width: "100%",
    height: "17%",

  },
  contentContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  messagepreviews_container: {
    padding: 10,
    borderRadius: 30,
    backgroundColor:'white',

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
    backgroundColor: colors.baby_blue_light
  },
  header_container: {
    paddingHorizontal: 15,
    backgroundColor: colors.grey_lightest,
    width: "100%",
    height: "20%",

  },
})
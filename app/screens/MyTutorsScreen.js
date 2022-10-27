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
import SearchBar from '../components/SearchBar';

const MyTutorsScreen = (props) => {

  const arrowRight = <MaterialIcons name={"keyboard-arrow-right"} color={colors.sky_pink} size={40}/>;
  const search_icon = <Ionicons name={"search"} color={'white'} size={30} style={{marginHorizontal: 5}}/>;
  const hamburger_menu = <Entypo name={"menu"} color={'white'} size={40}/>;

  const [users, setUsers] = useState([]);
  const [tutors, setTutors] = useState([]);

  useEffect(()=> {
    try {
      DataStore.query(User,user => user.UserRole("ne",null))
        .then(setUsers);
    }
    catch (e) {
      console.log("Datastory query error: ",e)
    }
    },[])

  useEffect(()=>{
    if (users.length > 0) {
      const tutors = users.map(user => {return user.UserRole.roleType === 'Tutor' ? user : null});
      setTutors(tutors);
    }
  },[users])
  
  return (
    <SafeAreaView style={styles.page}>
    {/* Header Components */}
    <LinearGradient
                // Background Linear Gradient
                colors={[colors.primary, colors.primary]}
                locations={[0,0.3]}
                //start={{x:0,y:0.3}}
                //end={{x:0.7,y:0.4}}
                style={[styles.background]}
        />         
      <View style={styles.header_container}>   
        <View style={{flexDirection:'row', justifyContent:'center'}}>   
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', position:'absolute', left: 0}}
            onPress={()=>props.navigation.toggleDrawer()}>
              {hamburger_menu}
          </TouchableOpacity>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={elements.pageHeading_text}>My Tutors</Text>
          </View>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', position:'absolute', right: 0}}>
            {search_icon}
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center', marginTop: 30}}>
          <SegmentedControl
            tintColor={colors.secondary}
            fontStyle={{color: 'black'}}
            activeFontStyle={{color:'white'}}
            values={['Favourites', 'Top-Rated', 'All']}
            selectedIndex={0}
            // onValueChange={(value) => {
            //   fetchChatRooms(value);
            // }}
            style={{width:'90%'}}
          />
        </View>
        <View style={{marginTop:10, alignItems:'center'}}>
          <SearchBar/>
        </View>
      </View>

    {/*Content components*/}
      {/*User Previews */}
      <FlatList
          data={users}
          renderItem={({ item }) => <UserPreview user={item} showArrow={true}
            onPress={()=>{
              try {
                //props.selectTutorAction(item)
              }
              finally {
                //console.log('the tutor selected is ',selectedTutor)
                //props.setShowActionModal(false)

            }}}/> }
          style={styles.messagepreviews_container}
      />
    </SafeAreaView>
  )
}

export default MyTutorsScreen

const styles = StyleSheet.create({
  header_container: {
    paddingHorizontal: 15,
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
  },
  header_container: {
    paddingHorizontal: 15,
    width: "100%",
    height: "20%",

  },
})
import { FlatList, ScrollView, Dimensions, StyleSheet, Text, View, 
  Image, SafeAreaView, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';
import React, { Fragment, useState, useEffect } from 'react';
import ChatRoomPreview from '../components/ChatRoomPreview';
import colors from '../styles/colors';
import elements from '../styles/elements';
import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatRoom, ChatRoomUser } from '../../src/models';
import { Auth, DataStore } from 'aws-amplify';
import NewAsk from '../components/NewAsk';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Moment from 'moment';
import moment from 'moment';
import SecondaryButtonInline from '../components/SecondaryButtonInline';
import TopUpButton from '../components/TopUpButton'

//Icons
const newMessage = <Ionicons name={"ios-create-outline"} color={'white'} size={35} style={{marginHorizontal: 5}}/>;
const search_icon = <Ionicons name={"search"} color={'white'} size={30} style={{marginHorizontal: 5}}/>;
const hamburger_menu = <Entypo name={"menu"} color={'white'} size={40}/>;
const coins = <FontAwesome5 name={"coins"} color={'gold'} size={30}/>;


const StoreScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true)

  const [chatRooms, setChatRooms] = useState([]);
  const [activeChatCount, setActiveChatCount] = useState(0);
  const [showNewAsk, setShowNewAsk] = useState(false);
  const [toggleActiveAsks, setToggleActiveAsks] = useState(0);
  const [showActiveAsks, setShowActiveAsks] = useState(true);
  const width = Dimensions.get('window').width;

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
                colors={[colors.primary, colors.primary]}
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
            <Text style={elements.pageHeading_text}>Store</Text>
          </View>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center', position:'absolute', right: 0}}
            onPress={()=> {setShowNewAsk(true)}}>
            {newMessage}
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center', marginTop: 30}}>

        </View>
      </View>
      {/*Message Previews */}
      {renderLoading()}
      {!isLoading && 
      <View
        style={styles.messagepreviews_container}>
        <View style={[styles.storeStatsContainer, 
          {position:'absolute',top:-50, left:0.5*width-0.5*340, zIndex: 999}]}>
          <View style={[styles.storeStatContainer, {paddingTop:20, paddingBottom: 30, borderBottomWidth:1, borderColor:colors.grey_light}]}>
            <View style={{flexDirection:'row'}}>
              {coins}
              <Text style={styles.stats_CoinsText}>
                $14.5
              </Text>
            </View>
            <TopUpButton title='Top up'/>
          </View>
          <View style={styles.storeStatContainer}>
            <Text style={styles.stats_TitleText}>
              Auto top-up
            </Text>
            <Switch
                style={{ transform: [{ scaleX: .75 }, { scaleY: .75 }] }}
                value={true}
                disabled={true}
            />
          </View>
          <View style={styles.storeStatContainer}>
            <Text style={styles.stats_TitleText}>
              My Plan
            </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.stats_ValueText}>
              Basic
            </Text>
            <SecondaryButtonInline title='Upgrade'/>
            </View>
          </View>
        </View>
      </View>
      }
    </SafeAreaView>
  )
}

export default StoreScreen

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
    flex:1

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
  },
  storeStatsContainer: {
    justifyContent:'center',
    //alignItems:'center',
    backgroundColor: colors.grey_lightest,
    width: '90%',
    borderRadius: 15
  },
  storeStatContainer: {
    flexDirection:'row', 
    paddingHorizontal:10,
    paddingVertical:5, 
    justifyContent:'space-between'
  },
  stats_CoinsText: {
    fontSize: 30,
    fontWeight: '600',
    paddingLeft: 10
  },
  stats_TitleText: {
    fontSize: 18,
    fontWeight:'600'
  },
  stats_ValueText: {
    fontSize: 16,
    fontWeight:'400',
    paddingRight: 10
  }
})
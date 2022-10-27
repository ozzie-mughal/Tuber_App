import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import colors from '../styles/colors';
import PrimaryActionListButton from './PrimaryActionListButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SecondaryButtonInline from './SecondaryButtonInline';
import { S3Image } from 'aws-amplify-react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getLastOnlineParser from '../functions/getLastOnlineParser';

const UserPreview = ({ user, showButton, showArrow, showBadges, buttonTitle, onPress }) => {

  const arrow_right = <MaterialIcons name={"keyboard-arrow-right"} color={colors.secondary} size={40}/>;
  const star = <MaterialIcons name={"star"} color={'gold'} size={20}/>;
  const asks_badge = <Ionicons name={"chatbubble"} color={colors.primary} size={20}/>;
  const certified_tick = <MaterialIcons name={"verified"} color={'black'} size={15}/>;
  const trophy = <Ionicons name={"ios-trophy-sharp"} color={colors.turquoise_green} size={20}/>;
  
  const [active, setActive] = useState();
  const userSub = user?.sub;
  const senderAvatarImage = user?.avatarImage;
  const senderGivenName = user?.givenName;
  const senderFamilyName = user?.familyName;
  const org = user?.UserRole?.org;
  const partnerCentre = user?.UserRole?.partnerCentre;
  const rating = user?.UserRole?.rating;
  const asks = user?.UserRole?.asks;
  const certified = partnerCentre ? true : false;
  const badgeVisible = true;

  //Set online status as active if logged in within past 5min
  useEffect(() => {
    const active = getLastOnlineParser(user);
    setActive(active==='Online' ? true : false);
  },[])

  return (

<TouchableOpacity style={styles.cellContainer}>
  <View style={{
      flexDirection: "row",
      justifyContent: "space-between",}}>
      <View style={{flexDirection: "row"}}>
          <View style={styles.ratingSummary}>
                  <S3Image imgKey={senderAvatarImage} resizeMode='cover'
                      style={styles.viewImage}/>
              <View style={{paddingLeft:5}}>
                  <View style={[styles.usernameContainer, 
                      certified ? {backgroundColor:colors.primary} : {backgroundColor:'transparent'}]}>
                      <Text style={styles.usernameText}>
                        {senderGivenName} {senderFamilyName}
                      </Text>
                      {active ? 
                      <View style={styles.activebadge_container}/>
                      : null}
                      <View style={{paddingLeft:5}}>
                          {certified ? certified_tick : null}
                      </View>
                  </View>
                  <Text style={styles.schoolContainer}>
                      {org}
                  </Text>
                  {partnerCentre && <Text style={styles.partnerCentreContainer}>
                      {partnerCentre}
                  </Text>}
              </View>
          </View>
          <View style={styles.ratingBadges}>
              <View style={styles.specialsContainer}>
                  {star}
                  <Text style={styles.specialsText}>{rating}</Text>
              </View>
              <View style={styles.specialsContainer}>
                  {asks_badge}
                  <Text style={styles.specialsText}>{asks}</Text>
              </View>
              {badgeVisible && 
              <View style={styles.specialsContainer}>
                  {trophy}
                  <Text style={styles.specialsText}>2</Text>
              </View>}
          </View>
      </View>
    {showArrow && <TouchableOpacity style={styles.openbutton} onPress={onPress}>
        {arrow_right}
    </TouchableOpacity>}
    {showButton && 
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text>{buttonTitle}</Text>
    </TouchableOpacity>}
  </View>
</TouchableOpacity>
  )
}

export default UserPreview

const styles = StyleSheet.create({
    activebadge_container: {
      backgroundColor: "lawngreen",
      height: 15,
      width: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 45,
      top: 45
    },
    buttonContainer: {
      width: 60,
      height:30,
      padding: 5,
      backgroundColor: colors.yellow_sun,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      shadowColor: '#000000',
      shadowOpacity: 0.5,
      shadowRadius: 6,
      shadowOffset : { width: 0, height: 3}
    },
    cellContainer: {
      paddingVertical:15,
      borderBottomColor: colors.grey_light,
      borderBottomWidth: 1
  },
  usernameContainer: {
    flexDirection:"row", 
    borderRadius:15, 
    paddingHorizontal:5
},
usernameText: {
    fontFamily: 'Nunito-Bold'
},
schoolContainer: {
    flexDirection:"row", 
    borderRadius:15, 
    paddingTop:5,
    paddingLeft: 5,
    fontSize:12,
    fontFamily:'Nunito-Medium'
},
partnerCentreContainer: {
    flexDirection:"row", 
    borderRadius:15, 
    paddingTop:5,
    paddingLeft: 5,
    fontSize:12,
    fontFamily:'Nunito-Bold'
},
ratingSummary: {
    flexDirection:'row',
    width: 175,
},
ratingBadges: {
    flexDirection:'row',
    width:'40%'
},
openbutton: {
    justifyContent:'center',
    alignItems:'center',
},
openbutton_text: {
    fontWeight: "600",
    fontSize: 16,
    padding: 4
},
viewImage: {
    width: 45,
    height: 45,
    borderRadius: 45
},
specialsContainer: {
    marginRight: 5,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'row'
},
specialsText: {
    fontSize:16,
    fontWeight:'600',
    marginLeft: 5
}
  })
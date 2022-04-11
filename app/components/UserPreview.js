import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import colors from '../styles/colors';
import PrimaryActionListButton from './PrimaryActionListButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserPreview = ({ user, showButton, showArrow, buttonTitle, onPress }) => {

  const arrowRight = <MaterialIcons name={"keyboard-arrow-right"} color={colors.sky_pink} size={40}/>;

  const userSub = user?.sub;
  const senderAvatarImage = user?.avatarImage;
  const senderGivenName = user?.givenName;
  const senderFamilyName = user?.familyName;
  const active = user?.active;

  const navigation = useNavigation();

  const onUserPress = () => {
    console.log('tutor selected');
    //navigation.navigate('ChatRoom', { id: chatRoom.id, name: senderName, avatarImage: senderAvatarImage });  
        }

  return (
    <View style={styles.container}>

      <Image style={styles.avatarimage} source={{uri: senderAvatarImage}}/>

      {active ? 
      <View style={styles.activebadge_container}/>
      : null}

      <View style={styles.preview_container}>
        <View style={styles.row}>
          <Text style={styles.name_text}>{senderGivenName} {senderFamilyName}</Text>
          {showButton && <PrimaryActionListButton title={buttonTitle} onPress={onPress}/>}
          {showArrow && <TouchableOpacity>{arrowRight}</TouchableOpacity>}
        </View>
      </View>

    </View>
  )
}

export default UserPreview

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: colors.grey,
    },
    preview_container: {
      flex: 1,
      justifyContent: 'space-evenly'
    },
    badge_container: {
      backgroundColor: colors.med_turquoise,
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 40,
      top: 10
    },
    badge_text: {
      color: "white",
      fontWeight: '600'
    },
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
    avatarimage:{
      width: 50,
      height: 50,
      borderRadius: 30,
      marginRight: 10
    },
    name_text: {
      fontWeight: "bold",
      fontSize: 18
    },
    timestamp_text_unread: {
      color: "black",
      fontWeight: "bold"
    },
    timestamp_text_read: {
      color: "grey"
    },
    message_text_unread: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
    message_text_read: {
      color: "grey",
      fontSize: 16
    },
    row: {
      flexDirection:'row', 
      justifyContent:'space-between',
    }
  })
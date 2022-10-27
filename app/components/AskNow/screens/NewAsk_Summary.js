import { FlatList, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Users from '../../../assets/dummy-data/Users';
import colors from '../../../styles/colors';
import elements from '../../../styles/elements';
import UserPreview from '../../../components/UserPreview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import PageHeader from '../../PageHeader';
import SearchBar from '../../../components/SearchBar';
import PageFooter from '../../PageFooter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useRoute, useNavigation } from '@react-navigation/core';
import SummaryReadOnlyField from '../../SummaryReadOnlyField';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { User,UserRole,ChatRoom,ChatRoomUser } from '../../../../src/models'
import NumberHeading from '../../NumberHeading';

export default function NewAsk_Summary( { ...props } ) {

const route = useRoute();
const navigation = useNavigation()

const selectedTutor = route.params?.selectedTutor;
const quickAskValues = route.params?.quickAskValues;

//const [selectedTutor, setSelectedTutor] = useState({
//  givenName: 'Ossama',
//})

const timer_icon = <Ionicons name={"ios-timer-outline"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
const person = <Ionicons name={"person"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
const newAsk = <Ionicons name={"ios-chatbubble-ellipses-sharp"} color={colors.turquoise_green} size={60}/>;
const store = <FontAwesome5 name={"coins"} color={'black'} size={20}/>;
const askValues = {
  askHow: 'Text',
  askWhatDesc: 'Calculate range X',
  askWhatYear: 'Year 12',
  askWhatSubject: 'Physics'}

//Button press functions
const beginAsk = async () => {
  try {
  //Create chat room
  const newChatRoom = await DataStore.save(new ChatRoom({
      newMessages: 0, topic: askValues.askWhatDesc, active: true}));

  //Connect authenticated user to chat room
  const authUser = await Auth.currentAuthenticatedUser();
  const currentUser = await DataStore.query(User, authUser.attributes.sub);
  await DataStore.save(new ChatRoomUser({
      user: currentUser,
      chatRoom: newChatRoom,
  }))

  //Connect selected tutor to chat room
  await DataStore.save(new ChatRoomUser({
      user: selectedTutor,
      chatRoom: newChatRoom,
  }))
 
  //Add logic to determine which HOW process to run (eg. if Text, navigate to a chatroom etc.)
  navigation.navigate('ChatRoom', { id: newChatRoom.id, name: selectedTutor.givenName, avatarImage: selectedTutor.avatarImage });  
  //console.log('Pressed ask option');
  }
  catch (e) {
      console.log('Error beginning Ask:',e)
  }
};

  return (
    <View style={styles.page}>
    {/* Header Components */}
      <PageHeader headerTitle='Your Summary' subHeadingTitle='Tap Begin to request the Ask to a Tutor.'/>

      {/*Content */}
      <View style={elements.pageContentContainer}>

      <View style={elements.stackedGreyContainer}>
          <View style={{marginVertical:10}}>
              <NumberHeading number='2' title='Ask Details' hideHelp={true}/>
          </View>
          <View style={{marginVertical:10}}>
        { selectedTutor && 
        <SummaryReadOnlyField icon={person} label={'Selected Tutor'}
          value={selectedTutor.givenName}/>}

          </View>
      </View>


        <SummaryReadOnlyField icon={timer_icon} label={'Estimated Total Time'}
          value={'03:20'}/>
        <SummaryReadOnlyField icon={store} label={'Base Fee'}
          value={'3 (A$7.20)'}/>
       

      </View>
      {/*Footer */}
      <PageFooter primaryButtonTitle='Begin' secondaryButtonTitle='Previous'
        primaryOnPress={()=>{beginAsk()}}
        secondaryOnPress={()=>{props.navigation.navigate('NewAsk_SelectWho')}}/>
    </View>
  )
}


const styles = StyleSheet.create({
  page: {
    //flex: 1,
    backgroundColor: 'white'
  },
})
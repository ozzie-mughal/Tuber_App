import React, { useRef, useState } from 'react';
import { ScrollView, Image, TouchableOpacity, SafeAreaView, Modal, StyleSheet, View, Button, Text, Dimensions } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core'
import RBSheet from "react-native-raw-bottom-sheet";
import Svg, { Path } from 'react-native-svg';
import RadioButtonCard from './RadioButtonCard';
import ToggleCard from './ToggleCard';
import icons from '../styles/icons';
import colors from '../styles/colors';
import elements from '../styles/elements';
import SecondaryButton from './SecondaryButton';
import PrimaryActionButton from './PrimaryActionButton';
import PrimaryActionButtonWide from './PrimaryActionButtonWide';
import SecondaryActionButton from './SecondaryActionButton';
import NumberHeading from '../components/NumberHeading';
import ShowMore from './ShowMore';
import InfoModal from './InfoModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import chatRoomsData from '../assets/dummy-data/ChatRooms';

export default function BumpModal({children, onPress}) {

    const timer_icon = <Ionicons name={"ios-timer-outline"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
    const store = <FontAwesome5 name={"coins"} color={'black'} size={20}/>;
    const randomAvatar = 'https://i.pravatar.cc/300';


    //Dummy tutor chat room data
    const chatRoom = {
        id:'1',
        name:'Elon Musk',
        avatarImage: randomAvatar
    }

    const refRBSheet = useRef();
    const navigation = useNavigation()

    const [askOptionData, setAskOptionData] = useState('');

    const selectedAskOption = (value) => {
        setAskOptionData(value);
    } 
    const [whoOptionData, setWhoOptionData] = useState('');

    const selectedWhoOption = (value) => {
        setWhoOptionData(value);
    } 

    //Learn More Modal toggle
    const [showInfoModal, setShowInfoModal] = useState(false);

    const beginAsk = () => {
        refRBSheet.current.close();
        navigation.navigate('ChatRoom', { id: chatRoom.id, name: chatRoom.name, avatarImage: chatRoom.avatarImage });  
        console.log('Pressed ask option');
    };
    const closeModal = () => {
        setAskOptionData('');
        setWhoOptionData('');
        console.log('ask modal is closed');
    };


    const askOptions = [
        {value: 'Book 1:1 Class', icon: icons.chalkboard_medium, desc: "Schedule an interactive lesson with a tutor of your choice."},
        {value: 'Join Group', icon: icons.group_medium, desc: "Enter a virtual, interactive classroom with other students."},
        {value: 'Video', icon: icons.video_medium, desc: "Get your questions answered on a short video call."},
        {value: 'Text', icon: icons.text_medium, desc: "Get your questions answered in a chat - as quick as 60 seconds."},
    ];

    const whoOptions = [
        {value: 'Suggest best for me', icon: icons.chalkboard_medium, desc: "Let Bump AI predict the most effective tutor for me, based on my preferences, ask history, and availability."},
        {value: 'Select own tutor', icon: icons.group_medium, desc: "Choose from your list of favourited tutors (NOTE: Tutor availability may differ)."},
    ];


  return (
    <TouchableOpacity 
    onPress={()=>{refRBSheet.current.open()}} 
    style={{
        top: -20,
        justifyContent:'center',
        alignItems:'center'}}>  
        <View>
            {children}
        </View> 
      <RBSheet
        ref={refRBSheet}
        animationType= "slide"
        closeOnDragDown={false}
        closeOnPressMask={true}
        onClose={closeModal}
        customStyles={{
          container: {
              height: 550,
              backgroundColor: "white",
              borderRadius: 30,
              top: 0,
              paddingHorizontal: 20
          },
        }}
      >
        <View>
            <View style={{marginTop: 15}}>

                <View style={{alignItems:'center'}}>
                    {/*Collapse bar*/}
                    <View style={{width:70, height: 5, backgroundColor:colors.aquamarine, borderRadius:15}}/>
                </View>

                <Text style={{marginVertical: 15, fontSize:24, fontWeight: "700"}}>Stumped on something? Let's sort you out.</Text>
                <ShowMore title='How it works >'/>
            </View>
            <ScrollView style={{
                marginVertical:20,
                height: 350}}>
                <View style={elements.stackedModalInputContainer}>
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='1' title='How do you want to ask?'/>
                        <RadioButtonCard data={askOptions} selectedOption={selectedAskOption}/>
                        {askOptionData? <ShowMore title='Learn More' onPress={() => {
                        setShowInfoModal(true)}}
                        /> : null}
                    </View>
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='2' title='Who do you want to ask?'/>
                        <ToggleCard data={whoOptions} selectedOption={selectedWhoOption}/>
                        {whoOptionData? <ShowMore title='Learn More' onPress={() => {
                        setShowInfoModal(true)}}
                        /> : null}
                        {whoOptionData==='Select own tutor' && 
                        <PrimaryActionButtonWide title='Select from favourite tutors'/>}
                    </View>
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='3' title='Your Summary'/>
                            <View style={{flexDirection:'row', alignItems:'center', 
                            justifyContent:'space-between', marginVertical:5}}>
                                <Text style={{fontSize:16, fontWeight: "800"}}>Estimated Total Time </Text>
                                <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                                    <View style={styles.headerTimer}>
                                        {timer_icon}
                                        <Text style={styles.timerText}>03:20</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', 
                                justifyContent:'space-between', marginVertical:5}}>
                                <Text style={{fontSize:16, fontWeight: "800"}}>Minimum Fee </Text>
                                <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                                    <View style={styles.headerTimer}>
                                        {store}
                                        <Text style={styles.timerText}>3 </Text>
                                        <Text style={styles.timerText}>(A$7.20)</Text>
                                    </View>
                                </View>
                            </View>
                    </View>

                </View>


                <View style={{flexDirection:'row', marginBottom: 35, 
                justifyContent:'space-evenly'}}>
                    <SecondaryActionButton title='Cancel' onPress={closeModal}/>
                    <PrimaryActionButton title='Begin' onPress={beginAsk}/>
                </View>

                <InfoModal 
                    showInfoModal={showInfoModal} 
                    setShowInfoModal={setShowInfoModal} 
                    headerTitle={'Some title'}
                    modalContent={'some extra information'}/>
            </ScrollView>
        </View>
      </RBSheet>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
        timerText: {
            fontSize: 14,
            fontWeight: '600'
        },
        headerTimer: {
            padding: 5,
            backgroundColor: colors.grey_light,
            width: 120,
            flexDirection: 'row',
            borderRadius: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
        }
})
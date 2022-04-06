import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/core'
import RBSheet from "react-native-raw-bottom-sheet";
import RadioButtonCard from './RadioButtonCard';
import ToggleCard from './ToggleCard';
import icons from '../styles/icons';
import colors from '../styles/colors';
import elements from '../styles/elements';
import PrimaryActionButton from './PrimaryActionButton';
import PrimaryActionButtonWide from './PrimaryActionButtonWide';
import SecondaryActionButton from './SecondaryActionButton';
import NumberHeading from '../components/NumberHeading';
import ShowMore from './ShowMore';
import InfoModal from './InfoModal';
import ActionModal from './ActionModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectTutorScreen from '../screens/SelectTutorScreen';
import UserPreview from './UserPreview';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../src/models';
import { ChatRoom } from '../../src/models';
import { ChatRoomUser } from '../../src/models';
import {Picker} from '@react-native-picker/picker';
import TextInputBasic from './TextInputBasic';

export default function BumpModal({children, onPress}) {

    const timer_icon = <Ionicons name={"ios-timer-outline"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
    const person = <Ionicons name={"person"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
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
    
    //Modal states
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);

    //Ask How states
    const [askOptionData, setAskOptionData] = useState('');
    const selectedAskOption = (value) => {
        setAskOptionData(value);
    } 

    //Ask Who states
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [whoOptionData, setWhoOptionData] = useState('');
    const selectedWhoOption = (value) => {
        setWhoOptionData(value);

        if (value==='Suggest best for me') {
            setSelectedTutor(null)
        }
    } 

    //Ask What states
    const [selectedSubject, setSelectedSubject] = useState();

    const pickerRef = useRef();

    function open() {
    pickerRef.current.focus();
    }

    function close() {
    pickerRef.current.blur();
    }

    //Button press functions
    const beginAsk = async () => {
        //Create chat room
        const newChatRoom = await DataStore.save(new ChatRoom({newMessages: 0}));

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

        refRBSheet.current.close();
        
        navigation.navigate('ChatRoom', { id: newChatRoom.id, name: selectedTutor.givenName, avatarImage: selectedTutor.avatarImage });  
        //console.log('Pressed ask option');
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
        {key: 0, value: 'Suggest best for me', icon: icons.chalkboard_medium, desc: "Let Nemo AI predict the most effective tutor for me, based on my preferences, ask history, and availability."},
        {key: 1, value: 'Select own tutor', icon: icons.group_medium, desc: "Choose a favourite, top-rated, or any tutor. (NOTE: Tutor availability may differ)."},
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
                    <View style={{width:70, height: 5, backgroundColor:colors.skyblue_crayola, borderRadius:15}}/>
                </View>

                <Text style={{marginVertical: 15, fontSize:24, fontWeight: "700"}}>Stumped on something? Let's sort you out.</Text>
                <ShowMore title='See how it works >'/>
                
            </View>
            <ScrollView style={{
                marginVertical:20,
                height: 350}}>
                <View style={elements.stackedModalInputContainer}>

                    {/* HOW */}
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='1' keyword='How' title=' do you want to ask?'
                            onPress={()=>{
                                setShowInfoModal(true)}}/>
                        <RadioButtonCard data={askOptions} selectedOption={selectedAskOption}/>
                    </View>

                    {/* WHO */}
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='2' keyword='Who' title=' do you want to ask?'
                            onPress={()=>{
                                setShowInfoModal(true)}}/>
                        <ToggleCard data={whoOptions} selectedOption={selectedWhoOption}/>
                        {whoOptionData==='Select own tutor' && !selectedTutor &&
                        <PrimaryActionButtonWide 
                            title='Select my own' 
                            onPress={()=>{
                                setShowActionModal(true);
                            }}/>}
                        {selectedTutor && <View style={{marginVertical: 20}}>
                            <Text style={{fontSize:16, fontWeight: "800"}}>Your Selected Tutor </Text>
                            <UserPreview user={{
                                avatarImage:selectedTutor.avatarImage,
                                givenName:selectedTutor.givenName,
                                active:selectedTutor.active
                                }}
                                showButton={true} 
                                buttonTitle="Change" onPress={()=>{
                                    setShowActionModal(true)
                                }}/>
                        </View>}
                    </View>

                    {/* WHAT */}
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='3' keyword='What' title=' do you want to ask?'
                            onPress={()=>{
                                setShowInfoModal(true)}}/>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width: '40%'}}>
                            <Text style={{fontSize:20, fontWeight: "800"}}>Year </Text>
                            <Picker
                            ref={pickerRef}
                            selectedValue={selectedSubject}
                            onValueChange={(itemValue, itemIndex) =>
                            setSelectedSubject(itemValue)
                            }
                            itemStyle={{fontSize:18}}>
                            <Picker.Item label="K-6" value="K-6" />
                            <Picker.Item label="7-10" value="7-10" />
                            <Picker.Item label="Prelim" value="Prelim" />
                            <Picker.Item label="HSC" value="HSC" />
                            </Picker>
                            </View>

                            <View style={{width: '60%'}}>
                            <Text style={{fontSize:20, fontWeight: "800"}}>Subject </Text>
                            <Picker
                            ref={pickerRef}
                            selectedValue={selectedSubject}
                            onValueChange={(itemValue, itemIndex) =>
                            setSelectedSubject(itemValue)
                            }
                            itemStyle={{fontSize:18}}>
                            <Picker.Item label="Mathematics" value="maths" />
                            <Picker.Item label="Science" value="science" />
                            <Picker.Item label="Chemistry" value="chemistry" />
                            <Picker.Item label="English" value="english" />
                            </Picker>
                            </View>

                        </View>
                        <View>
                            <TextInputBasic
                                label={'Brief Description of Ask'}                        
                                //value={values.username}
                                //onChangeText={handleChange('username')}
                                //onBlur={handleBlur('username')}
                                //error={errors.username}
                                //touched={touched.username}
                            />
                        </View>
                    </View>

                    {/* SUMMARY */}
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='4' title='Your Summary'
                            onPress={()=>{
                                setShowInfoModal(true)}}/>
                            {selectedTutor && <View style={{flexDirection:'row', alignItems:'center', 
                            justifyContent:'space-between', marginVertical:5}}>
                                <Text style={{fontSize:16, fontWeight: "800"}}>Selected Tutor </Text>
                                <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                                    <View style={styles.headerTimer}>
                                        {person}
                                        <Text style={styles.timerText}>{selectedTutor.givenName}</Text>
                                    </View>
                                </View>
                            </View>}
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
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={styles.timerText}>3 </Text>
                                            <Text style={[styles.timerText,{color:colors.grey}]}>
                                                (A$7.20)
                                            </Text>
                                        </View>
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

                {/* Modals */}
                <InfoModal 
                    showInfoModal={showInfoModal} 
                    setShowInfoModal={setShowInfoModal} 
                    headerTitle={'Some title'}
                    ModalContent={<Text>some extra information</Text>}
                />
                <ActionModal 
                    showActionModal={showActionModal} 
                    setShowActionModal={setShowActionModal} 
                    headerTitle={'Find A Tutor'}
                    ModalContent={SelectTutorScreen}
                    selectTutorAction={setSelectedTutor}
                />
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
        },
        pickerItem: {
            fontSize: 12
        }
})
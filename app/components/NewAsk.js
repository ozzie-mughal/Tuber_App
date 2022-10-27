import React, { useRef, useState, useEffect, Fragment } from 'react';
import { ScrollView, ImageBackground, TouchableOpacity, StyleSheet, Modal, View, Text, Button } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/core'
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
import TutorialModal from './animations/TutorialModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectTutorScreen from '../screens/SelectTutorScreen';
import UserPreview from './UserPreview';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { User,ChatRoom,ChatRoomUser } from '../../src/models';
import TextInputBasic from './TextInputBasic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DialPicker from './DialPicker';
import { HowToAsk, WhoToAsk, WhatToAsk, Summary } from '../assets/content-info/HelperData';
import { askOptions,yearAskOptions,subjectOptions,whoOptions } from '../assets/content-info/ReferenceData';

export default NewAsk = ({ ...props }) => {

    const timer_icon = <Ionicons name={"ios-timer-outline"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
    const person = <Ionicons name={"person"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
    const newAsk = <Ionicons name={"ios-chatbubble-ellipses-sharp"} color={colors.turquoise_green} size={60}/>;
    const store = <FontAwesome5 name={"coins"} color={'black'} size={20}/>;

    const navigation = useNavigation()

    //Field validation
    const AskSchema = Yup.object().shape({
        askType: Yup.string().required('Required'),
        askSelectedTutor: Yup.string().required('Required'),
        askWhatYear: Yup.string().required('You must select a Year and Subject for your Ask'),
        askWhatSubject: Yup.string().required('You must select a Year and Subject for your Ask'),
        askWhatDesc: Yup.string().max(32,'Description is too long.').required('Required'),
    });

    const { handleChange, setFieldValue, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        validationSchema: AskSchema,
        initialValues: {
            askType: '',
            askSelectedTutor: '',
            askWhatYear: '',
            askWhatSubject: '',
            askWhatDesc: ''},
        onSubmit: values => beginAsk()
    
    });
    
    //Modal states
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showTutorialModal, setShowTutorialModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);

    //Ask How states
    const [askOptionData, setAskOptionData] = useState('');
    const selectedAskOption = (value) => {
        setAskOptionData(value);
        values.askType = value;
    } 

    //Ask Who states
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [whoOptionData, setWhoOptionData] = useState('');

    //If auto is selected, set askSelectedTutor to a string
    const selectedWhoOption = (value) => {
        setWhoOptionData(value);
        if (value==='Suggest best for me') {
            values.askSelectedTutor = value;
        } else {
            return;
        }
    } 

    //If tutor is selected, set askSelectedTutor to them
    useEffect(() => {
        if (!selectedTutor){
            return;
        }
        values.askSelectedTutor = selectedTutor.givenName;

    },[selectedTutor])

    //Ask What states
    const [selectYear, setSelectYear] = useState();
    const [selectSubject, setSelectSubject] = useState();

    const selectedYear = (value) => {
        setSelectYear(value);
        values.askWhatYear = value;
    }
    const selectedSubject = (value) => {
        setSelectSubject(value);
        values.askWhatSubject = value;
    }


    //Button press functions
    const beginAsk = async () => {
        try {
        //Create chat room
        const newChatRoom = await DataStore.save(new ChatRoom({
            newMessages: 0, topic: values.askWhatDesc, active: true}));

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
        props.setShowNewAsk(!props.showNewAsk);
        closeModal();
        //Add logic to determine which HOW process to run (eg. if Text, navigate to a chatroom etc.)
        navigation.navigate('ChatRoom', { id: newChatRoom.id, name: selectedTutor.givenName, avatarImage: selectedTutor.avatarImage });  
        //console.log('Pressed ask option');
        }
        catch (e) {
            console.log('Error beginning Ask:',e)
        }
    };

    const closeModal = () => {
        setAskOptionData('');
        setWhoOptionData('');
    };

    

    
    // const subjectOptions = [
    //     {key: 0,name: 'Maths', value: 'Maths'},
    //     {key: 1,name: 'Science', value: 'Science'}
    // ]


  return (
    <Fragment>
    <TouchableOpacity onPress={() => {props.setShowNewAsk(true)}} style={styles.buttonStyle}>
        {newAsk}
    </TouchableOpacity>
  <View>
    <Modal
    animationType="slide"
    transparent={true}
    presentationStyle="overFullScreen"
    visible={props.showNewAsk}
    onRequestClose={() => {
      props.setShowNewAsk(!props.showNewAsk);
      closeModal();
      }}    
    >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <ImageBackground source={require('../../app/assets/banners/AskBanner.png')} resizeMode='cover'
            style={[styles.imageBG,{padding: 10}]}
            imageStyle={{borderTopLeftRadius:25, borderTopRightRadius:25}}
            >
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{marginVertical: 15,width:280, fontSize:24, fontWeight: "700"}}>Stumped on something? Let's sort you out.</Text>
                    <TouchableOpacity 
                        onPress={()=> {
                            props.setShowNewAsk(!props.showNewAsk);
                            closeModal();
                            //props.navigation.navigate('Home');
                        }}
                            style={{ width:40,height:40}}
                        >
                        {icons.close}
                    </TouchableOpacity>
                </View>
            <ShowMore title='See how it works >' onPress={()=>{setShowTutorialModal(true)}}/>
        </ImageBackground>

 

        <ScrollView style={{
            marginVertical:20,
            paddingHorizontal: 20,
            height: 1000
            }}>

            <View style={elements.stackedModalInputContainer}>

                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='1' keyword='How' title=' do you want to ask?'
                        ModalContent={<HowToAsk/>}
                        headerTitle='How to ask?'
                        onPress={()=>{
                            setShowInfoModal(true)}}/>
                    <View style={{alignItems:'center'}}>
                        <RadioButtonCard data={askOptions} selectedValue={selectedAskOption}/>
                    </View>
                    {touched.askType && errors.askType && <Text style={styles.errorText}>{errors.askType}</Text>}
                </View>

                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='2' keyword='Who' title=' do you want to ask?'
                        ModalContent={<WhoToAsk/>}
                        headerTitle='Who to ask?'
                        onPress={()=>{
                            setShowInfoModal(true)}}/>
                    <ToggleCard data={whoOptions} selectedValue={selectedWhoOption}/>
                    {whoOptionData==='Select own tutor' && !selectedTutor &&
                    <View style={{alignItems:'center'}}>
                    <PrimaryActionButtonWide 
                        title='Select my own' 
                        onPress={()=>{
                            setShowActionModal(true);
                        }}/>
                    </View>}
                    {selectedTutor && <View style={{marginVertical: 20}}>
                        <Text style={{fontSize:16, fontWeight: "800"}}>Your Selected Tutor </Text>
                        <UserPreview user={{
                            avatarImage:selectedTutor.avatarImage,
                            givenName:selectedTutor.givenName,
                            active:selectedTutor.active,
                            org: selectedTutor.UserRole.org,
                            partnerCentre: selectedTutor.UserRole.partnerCentre,
                            }}
                            showButton={true} 
                            buttonTitle="Change" onPress={()=>{
                                setShowActionModal(true)
                            }}/>
                    </View>}
                    {touched.askSelectedTutor && errors.askSelectedTutor && 
                        <Text style={styles.errorText}>{errors.askSelectedTutor}</Text>}
                </View>

                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='3' keyword='What' title=' do you want to ask?'
                        ModalContent={<WhatToAsk/>}
                        headerTitle='What to ask?'
                        onPress={()=>{
                            setShowInfoModal(true)}}/>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width: '40%'}}>
                            <Text style={{fontSize:20, fontWeight: "800"}}>Year </Text>
                            <DialPicker pickerData={yearAskOptions}
                                selectedOption={selectYear} setSelectedOption={selectedYear}
                                fontSize={12}/>
                        </View>

                        <View style={{width: '60%'}}>
                            <Text style={{fontSize:20, fontWeight: "800"}}>Subject </Text>
                            <DialPicker pickerData={subjectOptions} filterCategory={selectYear}
                                selectedOption={selectSubject} setSelectedOption={selectedSubject}
                                fontSize={12}/>


                        </View>

                    </View>
                    {touched.askWhatSubject && errors.askWhatSubject && 
                        <Text style={styles.errorText}>{errors.askWhatSubject}</Text>}
                    <View>
                        <TextInputBasic
                            label={'Brief Description of Ask'}                        
                            value={values.askWhatDesc}
                            autoCorrect={false}
                            onChangeText={handleChange('askWhatDesc')}
                            onBlur={handleBlur('askWhatDesc')}
                            error={errors.askWhatDesc}
                            touched={touched.askWhatDesc}
                        />
                        {touched.askWhatDesc && errors.askWhatDesc && 
                            <Text style={styles.errorText}>{errors.askWhatDesc}</Text>}
                    </View>
                </View>

                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='4' title='Your Summary'
                        ModalContent={<Summary/>}
                        headerTitle='What is a summary?'
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
                    <PrimaryActionButton title='Begin' onPress={handleSubmit}/>
                </View>

                <ActionModal 
                    showActionModal={showActionModal} 
                    setShowActionModal={setShowActionModal} 
                    headerTitle={'Find A Tutor'}
                    ModalContent={SelectTutorScreen}
                    selectTutorAction={setSelectedTutor}
                />
                <TutorialModal 
                    showTutorialModal={showTutorialModal} 
                    setShowTutorialModal={setShowTutorialModal} 
                    headerTitle={'How It Works'}
                    ModalContent={<Text>INSERT TUTORIAL VIDEO HERE</Text>}
                    modalWidth={'90%'}
                />
            </ScrollView>
            </View>
        </View>
    </Modal>
    </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
    timerText: {
        fontSize: 14,
        fontWeight: '600'
    },
    buttonStyle: {
        height: 90,
        width: 90,
        backgroundColor: colors.startup_purple,
        borderWidth:2,
        borderRadius: 100,
        position:'relative',
        bottom:30,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius:4,
        shadowOffset : { width: 0, height: 4},
        zIndex:9999
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
    },
    imageBG: {
        justifyContent:'center',
    },
    errorText: {
        color: 'red',
        paddingTop: 5
    },
    modalView: {
        //margin: 20,
        // backgroundColor: "white",
        // borderRadius: 20,
        // maxHeight:'60%',
        // paddingBottom: 20,
        // flex:1,
        // top: 300,

        width: '100%',
        flex:1,
        paddingBottom: 300,
        backgroundColor: 'white',
        //elevation: 20,
        borderRadius: 25,
        top:300
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%'
      },
})
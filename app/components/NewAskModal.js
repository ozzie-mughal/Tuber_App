import React, { useRef, useState, Fragment, useEffect } from 'react';
import { ScrollView, ImageBackground, TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
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
import TextInputBasic from './TextInputBasic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DropdownPicker from './Picker';

export default function BumpModal({children, onPress}) {

    const timer_icon = <Ionicons name={"ios-timer-outline"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
    const person = <Ionicons name={"person"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
    const store = <FontAwesome5 name={"coins"} color={'black'} size={20}/>;
    const randomAvatar = 'https://i.pravatar.cc/300';
    //const askBackgroundImagetest = {uri: Image.resolveAssetSource(askBackgroundImage).uri};
    //const askBackgroundImage = {uri: 'https://reactjs.org/logo-og.png'};

    const refRBSheet = useRef();
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
    const [topic, setTopic] = useState();

    const selectedYear = (value) => {
        setSelectYear(value);
        values.askWhatYear = value;
    }
    const selectedSubject = (value) => {
        setSelectSubject(value);
        values.askWhatSubject = value;
    }

    const yearPicker = useRef();
    const subjectPicker = useRef();

    function open() {
        yearPicker.current.focus();
    }

    function close() {
        yearPicker.current.blur();
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

        refRBSheet.current.close();
        
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

    const yearOptions = [
        {label: 'K-6', value: 'K-6'},
        {label: '7-10', value: '7-10'}
    ]
    const subjectOptions = [
        {label: 'Maths', value: 'Maths'},
        {label: 'Science', value: 'Science'}
    ]


  return (
    <Fragment>
    <TouchableOpacity 
    onPress={()=>{refRBSheet.current.open()}} 
    style={{
        top: -20,
        justifyContent:'center',
        alignItems:'center',
        }}>  
        <View>
            {children}
        </View> 
    </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        animationType= "slide"
        closeOnDragDown={false}
        onClose={closeModal}
        customStyles={{
          container: {
              height: 650,
              backgroundColor: "white",
              borderRadius: 30,
              top: 0,
              
          },
        }}
      >
        <View>
            <ImageBackground source={require('../../app/assets/AskBackground.png')} resizeMode='cover' 
                style={[styles.imageBG,{padding: 10}]}
                imageStyle={{opacity:0.5}}>
                    <TouchableOpacity 
                        onPress={()=> {refRBSheet.current.close()}}
                        style={{flexDirection:'row', justifyContent:'flex-end', padding: 0}}
                        >
                        {icons.close}
                    </TouchableOpacity>

                <Text style={{marginVertical: 15, fontSize:24, fontWeight: "700"}}>Stumped on something? Let's sort you out.</Text>
                <ShowMore title='See how it works >'/>
            </ImageBackground>

            <ScrollView style={{
                marginVertical:20,
                paddingHorizontal: 20,
                height: 350}}>
                <View style={elements.stackedModalInputContainer}>

                    {/* HOW */}
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='1' keyword='How' title=' do you want to ask?'
                            onPress={()=>{
                                setShowInfoModal(true)}}/>
                        <RadioButtonCard data={askOptions} selectedValue={selectedAskOption}/>
                        {touched.askType && errors.askType && <Text style={styles.errorText}>{errors.askType}</Text>}
                    </View>

                    {/* WHO */}
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='2' keyword='Who' title=' do you want to ask?'
                            onPress={()=>{
                                setShowInfoModal(true)}}/>
                        <ToggleCard data={whoOptions} selectedValue={selectedWhoOption}/>
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
                        {touched.askSelectedTutor && errors.askSelectedTutor && 
                            <Text style={styles.errorText}>{errors.askSelectedTutor}</Text>}
                    </View>

                    {/* WHAT */}
                    <View style={elements.stackedGreyContainer}>
                        <NumberHeading number='3' keyword='What' title=' do you want to ask?'
                            onPress={()=>{
                                setShowInfoModal(true)}}/>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width: '40%'}}>
                                <Text style={{fontSize:20, fontWeight: "800"}}>Year </Text>
                                <DropdownPicker pickerData={yearOptions}
                                    selectedOption={selectYear} setSelectedOption={selectedYear}/>
                            </View>

                            <View style={{width: '60%'}}>
                                <Text style={{fontSize:20, fontWeight: "800"}}>Subject </Text>
                                <DropdownPicker pickerData={subjectOptions}
                                    selectedOption={selectSubject} setSelectedOption={selectedSubject}/>


                            </View>

                        </View>
                        {touched.askWhatSubject && errors.askWhatSubject && 
                            <Text style={styles.errorText}>{errors.askWhatSubject}</Text>}
                        <View>
                            <TextInputBasic
                                label={'Brief Description of Ask'}                        
                                value={values.askWhatDesc}
                                onChangeText={handleChange('askWhatDesc')}
                                onBlur={handleBlur('askWhatDesc')}
                                error={errors.askWhatDesc}
                                touched={touched.askWhatDesc}
                            />
                            {touched.askWhatDesc && errors.askWhatDesc && 
                                <Text style={styles.errorText}>{errors.askWhatDesc}</Text>}
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
                    <PrimaryActionButton title='Begin' onPress={handleSubmit}/>
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
    
    </Fragment>
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
        },
        imageBG: {
            justifyContent:'center'
        },
        errorText: {
            color: 'red',
            paddingTop: 5
        }
})
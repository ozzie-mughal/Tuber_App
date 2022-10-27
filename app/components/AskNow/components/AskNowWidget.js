import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, Fragment, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../../styles/colors';
import AskNowPicker from './AskNowPicker';
import AskWhatTextInput from './AskWhatTextInput';
import { askWhat_subjectOptions,askWhat_yearOptions, yesOrNo } from '../../../assets/content-info/ReferenceData';
import AskNowToggleCard from './AskNowToggleCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AskNowPrimaryButton from './AskNowPrimaryButton';
import AskNowSecondaryButton from './AskNowSecondaryButton';
import AskNowIconButton from './AskNowIconButton';
import clearAskNow from '../functions/clearAskNow';
import submitAskNow from '../functions/submitAskNow';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InfoModal from '../../InfoModal';
import AskNowHelp from '../../../assets/content-info/AskNowHelp';
import { useNavigation } from '@react-navigation/core'

const AskNowWidget = (props) => {

    const navigation = useNavigation()


    const AskNowSchema = Yup.object().shape({
        //Ask Now values
        askHow: Yup.string()
            .required('Select how to Ask.'),
        askWhat: Yup.string()
            .required('Please describe what to Ask.'),
        askWhat_Subject: Yup.string()
            .required('Select what subject the Ask is on.'),
        askWhat_Year: Yup.string()
            .required('Select what year the Ask is on.'),
        askWho: Yup.string()
            .required('Select who to Ask.'),

    });

    const { handleChange, setFieldValue, handleSubmit, handleBlur, isValid, submitCount,
        values, errors, touched } = useFormik({
            validationSchema: AskNowSchema,
            initialValues: {
                //Ask Now values
                askHow: 'Text', 
                askWhat: '',
                askWhat_Subject: '',
                askWhat_Year: '',
                askWho: '',
            },
            onSubmit: values => {
                try {
                    submitAskNow(values)
                }
                finally {
                    navigation.navigate('Quick Ask');
                }
                }
    
    });

    //Ask Help
    const [showInfoModal, setShowInfoModal] = useState(false);

    //Ask How Picker
    const [open_askHow, setOpen_askHow] = useState(false);
    const [value_askHow, setValue_askHow] = useState('Text');
    const [items_askHow, setItems_askHow] = useState([
      {label: 'Text', value: 'Text'},
      {label: 'Book 1:1 Class', value: 'Book 1:1 Class'},
      {label: 'Video', value: 'Video'},
      {label: 'Join Group', value: 'Join Group'},
    ]);
    //Ask What Year Picker
    const [open_askWhat_Year, setOpen_askWhat_Year] = useState(false);
    const [value_askWhat_Year, setValue_askWhat_Year] = useState(null);
    const [items_askWhat_Year, setItems_askWhat_Year] = useState(askWhat_yearOptions);
    //Ask What Subject Picker
    const [open_askWhat_Subject, setOpen_askWhat_Subject] = useState(false);
    const [value_askWhat_Subject, setValue_askWhat_Subject] = useState(null);
    const [items_askWhat_Subject, setItems_askWhat_Subject] = useState(askWhat_subjectOptions);

    //Ask Who Picker

    const askWhoOptions = [
        {key: 'My Tutors', order: 'left', value: 'My Tutors', 
            icon:<FontAwesome name={"heart"} color={colors.turquoise_green} size={20}/>,
            icon_selected:<FontAwesome name={"heart"} color={colors.startup_purple} size={20}/>},
        {key: 'Best for me', order: 'right', value: 'Best for me',
            icon:<FontAwesome5 name={"robot"} color={colors.turquoise_green} size={20}/>,
            icon_selected:<FontAwesome5 name={"robot"} color={colors.startup_purple} size={20}/>},
      ]

    const [askWhoToggle, setAskWhoToggle] = useState(null);

    const selectedAskWhoToggle = (value) => {
        setAskWhoToggle(value);
        values.askWho = value;
    }

    useEffect(()=> {
        values.askHow = value_askHow;
    },[value_askHow])
    useEffect(()=> {
        values.askWhat_Year = value_askWhat_Year;
    },[value_askWhat_Year])
    useEffect(()=> {
        values.askWhat_Subject = value_askWhat_Subject;
    },[value_askWhat_Subject])

  return (
    <Fragment>
        <View style={[styles.askHowContent]}>
            <Text style={[styles.askNowText, {color:'white'}]}>I want to </Text>
            <AskNowPicker open={open_askHow} 
                value={value_askHow} 
                items={items_askHow} 
                setOpen={setOpen_askHow} 
                setValue={setValue_askHow} 
                setItems={setItems_askHow} 
                containerWidth={200}
                placeholder='Select ...'
                size={24}
                error={errors.askHow}
                onBlur={handleBlur('askHow')}
                touched={touched.askHow}/>
        </View>

        <View style={[styles.askWhatContentText,{zIndex:-1}]}>
            <Text style={[styles.askNowText, {color:'white', zIndex:-1}]}>an Ask about </Text>
            <AskWhatTextInput placeholder='Brief description of the Ask ...' color='white' autoCorrect={false}
                value={values.askWhat}
                onChangeText={handleChange('askWhat')}
                error={errors.askWhat}
                onBlur={handleBlur('askWhat')}
                touched={touched.askWhat}/>
        </View>
        <View style={[styles.askWhatContent]}>
            <AskNowPicker open={open_askWhat_Year} 
                value={value_askWhat_Year} 
                items={items_askWhat_Year}
                setOpen={setOpen_askWhat_Year} 
                setValue={setValue_askWhat_Year} 
                setItems={setItems_askWhat_Year} 
                containerWidth={150}
                size={24}
                placeholder='Year'
                maxHeight={150}
                error={errors.askWhat_Year}
                onBlur={handleBlur('askWhat_Year')}
                touched={touched.askWhat_Year}/>
            <AskNowPicker open={open_askWhat_Subject} 
                value={value_askWhat_Subject} 
                items={items_askWhat_Subject} 
                setOpen={setOpen_askWhat_Subject} 
                setValue={setValue_askWhat_Subject}
                setItems={setItems_askWhat_Subject} 
                containerWidth={200}
                size={24}
                placeholder='Subject'
                searchable={true}
                maxHeight={150}
                error={errors.askWhat_Subject}
                onBlur={handleBlur('askWhat_Subject')}
                touched={touched.askWhat_Subject}/>
        </View>
        <View style={[styles.askWhoContentText,{zIndex:-1}]}>
            <Text style={[styles.askNowText, {color:'white', zIndex:-1}]}>from</Text>
            <View style={{justifyContent:'center', alignItems:'flex-end', flex:1, zIndex:-1}}>
                <AskNowToggleCard data={askWhoOptions} selectedValue={selectedAskWhoToggle}
                    error={errors.askWho}
                    onBlur={handleBlur('askWho')}
                    touched={touched.askWho}/>
            </View>
        </View>

        {/*Ask Now Action Buttons*/}
        <View style={[styles.askNowActionButtonContainer,{zIndex:-1}]}>
            <View style={styles.askNowActionButton_Cancel}>
                <AskNowSecondaryButton title="Clear" onPress={()=>{clearAskNow(
                    setValue_askHow, setValue_askWhat_Year, 
                    setValue_askWhat_Subject, selectedAskWhoToggle
                )}}/>
                <AskNowIconButton icon={<Ionicons name={"ios-help"} color={'white'} size={20}/>}
                    onPress={()=>{setShowInfoModal(true)}}/>
            </View>
            <View style={styles.askNowActionButton_Submit}>
                <AskNowPrimaryButton title="Ask Now" onPress={()=>{
                    handleSubmit()}}/>
            </View>
        </View>

        {/*Help*/}
        <InfoModal 
            showInfoModal={showInfoModal}
            setShowInfoModal={setShowInfoModal}
            headerTitle='Ask Now Help'
            ModalContent={<AskNowHelp/>}/>
    </Fragment>
  )
}

export default AskNowWidget

const styles = StyleSheet.create({

    container: {
        margin: 10,
        justifyContent:'space-between'
    },
 
    askHowContent: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        flexWrap:'wrap'
    },
    askWhatContent: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        flexWrap:'wrap'
    },
    askWhatContentText: {
        marginHorizontal: 10,
    },
    askWhoContentText: {
        margin: 10,
        flexDirection:'row',
    },
    askNowText: {
        fontSize: 34,
        fontFamily: 'Nunito-SemiBold'
    },
    askNowActionButtonContainer: {
        margin: 10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    askNowActionButton_Submit: {
        flexDirection:'row',
        width: '40%'
    },
    askNowActionButton_Cancel: {
        flexDirection:'row',
        width: '30%',
        justifyContent:'space-between'
    },
})
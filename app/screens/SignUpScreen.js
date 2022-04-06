import React, { Fragment, useEffect, useState} from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView,
    KeyboardAvoidingView } from 'react-native';
import WavyHeader from '../components/WavyHeader';
import { useNavigation } from '@react-navigation/core'
import TextInputBasic from '../components/TextInputBasic';
import TextInputWithIcon from '../components/TextInputWithIcon';
import Auth from '@aws-amplify/auth';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryActionButton from '../components/PrimaryActionButton';
import SecondaryActionButton from '../components/SecondaryActionButton';
import elements from '../styles/elements';
import colors from '../styles/colors'; 
import icons from '../styles/icons';
import RadioButtonPanel from '../components/RadioButtonPanel';
import RadioButtonGrid from '../components/RadioButtonGrid';
import NumberHeading from '../components/NumberHeading';
import ShowMore from '../components/ShowMore';
import InfoModal from '../components/InfoModal';
import information from '../assets//content-info/information'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerBasic from '../components/DateTimePickerBasic';
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUpScreen(props) {

const navigation = useNavigation()

//Validation
const newBirthDate = new Date();

Moment.locale('en-au'); //for formatting birthDate to dd/MM/YYYY format for AWS Auth validation

const RegisterSchema = Yup.object().shape({
    username: Yup.string().email('Invalid username. Must be an email.').required('Required'),
    password: Yup.string()
        .required('Required')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, 1 uppercase, 1 lowercase, 1 Number and 1 special case character"),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match.'),
    phone_number: Yup.string().min(12,'Mobile number is too short').max(13,'Mobile number must be AU-based '),
    birthdate: Yup.date().required('Required').max(newBirthDate,'Must be a valid date of birth'),
    given_name: Yup.string().required('Required').matches(/^[A-Za-z]+$/, 'Must only contain letters'),
    family_name: Yup.string().required('Required').matches(/^[A-Za-z]+$/, 'Must only contain letters'),
    gender: Yup.string().required('Required'),
});

async function signUp(values) {
    try {
        //Map Yup values to AWS Auth attributes
        const username = values.username;
        const password = values.password;
        const phone_number = values.phone_number;
        const email = values.username;
        const birthdate = Moment(values.birthdate).format('L');
        const gender = values.gender;
        const given_name = values.given_name;
        const family_name = values.family_name;
        const picture = values.picture;
        
        await Auth.signUp({
            username,
            password,
            attributes: {
                phone_number,
                email,
                birthdate,
                gender,
                given_name,
                family_name,
                picture
            }
        });
        console.log('Sign Up Successful for ',username);
        navigation.navigate('ConfirmSignUp');

        //console.log(birthdate)
    }
    catch (error) {
        console.log('Sign Up Error',error)
    }
}

const { handleChange, setFieldValue, handleSubmit, handleBlur, values, errors, touched } = useFormik({
    validationSchema: RegisterSchema,
    initialValues: {
        username: '', 
        password: '',
        confirmPassword: '',
        phone_number: '+61',
        birthdate: newBirthDate,
        given_name: '',
        family_name: '',
        gender: null,
        picture: ''},
    onSubmit: values => signUp(values)

});

//Some dummy images
const tutorCardHeaderImage = <Image style={{width:100, height:100}} source={require('../assets/tutor_card_header.png')}/>
const studentCardHeaderImage = <Image style={{width:100, height:100, resizeMode:'contain'}} source={require('../assets/student_card_header.png')}/>
const parentCardHeaderImage = <Image style={{width:90, height:90, resizeMode:'contain'}} source={require('../assets/parent_card_header.png')}/>

//Define options for selecting role type
const roleTypeOptions = [
    {key: 0, value: 'Student', icon: studentCardHeaderImage, desc: "I want to ask questions in my time, in my own way, at an affordable cost."},
    {key: 1, value: 'Tutor', icon: tutorCardHeaderImage, desc: "I want to answer questions in my time, in my area of expertise, and make extra cash - fast."},
    {key: 2, value: 'Parent', icon: parentCardHeaderImage, desc: "Coming soon!"},
  ];

//Define options for selecting gender
const genderOptions = [
    {key: 0, value: 'Male'},
    {key: 1, value: 'Female'},
    {key: 2, value: 'Indeterminate'},
    {key: 3, value: 'Unknown'},
  ];

//Pass function to Role Type component to grab role type option selected value
const [roleTypeOptionData, setRoleTypeOptionData] = useState('');
//Pass function to Gender Type component to grab gender type option selected value
const [genderOptionData, setGenderOptionData] = useState('');

//Modal toggle
const [showInfoModal, setShowInfoModal] = useState(false);

const selectedRoleTypeOption = (value) => {
    setRoleTypeOptionData(value);
}
const selectedGenderOption = (value) => {
    setGenderOptionData(value);
    values.gender = value;
}


return (
<Fragment>
            <SafeAreaView style={elements.topSafeAreaContainer}/>
            <KeyboardAvoidingView 
                            style={elements.generalContainer}
                            behavior='padding'>
            <SafeAreaView style={elements.generalContainer}>
                {/* Header Components */}
                <View style={elements.screenHeaderContainer}>                
                    <LinearGradient
                        // Background Linear Gradient
                        colors={[colors.orange,colors.sky_pink,colors.skyblue_crayola]}
                        //start={{x:0.2,y:0.1}}
                        //end={{x:0.3,y:0.9}}
                        locations={[0.1,0.6, 1]}
                        style={[styles.background]}
                    />

                    <Image 
                        source={require('../assets/nemo-bannerlogo.png')}
                        style={{resizeMode: 'contain', flex:1, width: 500, height: 500}}
                    />
                </View>
                <View style={{
                    height: 30,
                }}>
                    <WavyHeader
                        customHeight={450}
                        customFill={colors.skyblue_crayola}
                        customBgColor="white"
                        customWavePattern="m0 0 48 26.7C96 53 192 107 288 144s192 59 288 48 192-53 288-80 192-37 288-26.7c96 10.7 192 42.7 240 58.7l48 16V0H0Z"
                    />
                </View>

        {/* Register Components */}
        <ScrollView keyboardShouldPersistTaps="handled">
            
        <View style={elements.pageContentContainer}>
        
            <View style={elements.stackedInputContainer}>
                <Text style={elements.contentHeading_text}>Register</Text>
                <Text style={elements.contentSubheading_text}>Join as a student, tutor or parent.</Text>
                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='1' title='I am a ...'/>
                    <RadioButtonPanel 
                        data={roleTypeOptions}
                        selectedOption={selectedRoleTypeOption}
                    />
                    {roleTypeOptionData.value && roleTypeOptionData.value!=='Parent'
                    && <ShowMore title='Learn More' onPress={() => {
                        setShowInfoModal(true);
                    }}
                    />}
                </View>
                
                <View style={elements.stackedGreyContainer}>
                    <View style={{marginVertical:10}}>
                        <NumberHeading number='2' title='My account details'/>

                        <TextInputBasic
                            label={'Email*'}                        
                            autoCorrect={false}
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            value={values.username}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            error={errors.username}
                            touched={touched.username}
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                        <TextInputBasic
                            label={'Password*'}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            textContentType="password"
                            isPassword={true}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={errors.password}
                            touched={touched.password}
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                        <TextInputBasic
                            label={'Confirm Password*'}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            textContentType="password"
                            isPassword={true}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                        <TextInputBasic
                            label={'Mobile Number'}
                            textContentType="telephoneNumber"
                            keyboardType="phone-pad"
                            value={values.phone_number}
                            onChangeText={handleChange('phone_number')}
                            onBlur={handleBlur('phone_number')}
                            error={errors.phone_number}
                            touched={touched.phone_number}
                        />
                    </View>
                </View>

                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='3' title='Some more about me'/>

                    <View style={{marginVertical:10}}>
                        <DateTimePickerBasic 
                            label={'Date of Birth*'}
                            value={values.birthdate}
                            mode={'date'}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate;
                                setFieldValue('birthdate',currentDate,true)
                            }}
                            onBlur={handleBlur('birthdate')}
                            error={errors.birthdate}
                            touched={touched.birthdate}/>
                    </View>
                    <View style={{marginVertical:10}}>
                        <TextInputBasic
                            label={'Given name*'}
                            textContentType="givenName"
                            autoCorrect={false}
                            value={values.given_name}
                            onChangeText={handleChange('given_name')}
                            onBlur={handleBlur('given_name')}
                            error={errors.given_name}
                            touched={touched.given_name}
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                        <TextInputBasic
                            label={'Family name*'}
                            textContentType="familyName"
                            autoCorrect={false}
                            value={values.family_name}
                            onChangeText={handleChange('family_name')}
                            onBlur={handleBlur('family_name')}
                            error={errors.family_name}
                            touched={touched.family_name}
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                    <Text style={{
                        fontWeight:'500',
                        paddingBottom: 5,
                        }}>
                        Gender*
                    </Text>
                    <View style={{
                        borderWidth: 1,
                        borderRadius: 10,
                    }}>
                        <RadioButtonGrid 
                            data={genderOptions}
                            selectedValue={selectedGenderOption}
                            onBlur={handleBlur('gender')}
                            error={errors.gender}
                            touched={touched.gender}
                        />
                    </View>
                    </View>
                    <View style={{marginVertical:10}}>
                        <TextInputBasic
                            label={'Avatar Image URL'}
                            textContentType="URL"
                            keyboardType="url"
                            onChangeText={handleChange('picture')}
                            onBlur={handleBlur('picture')}
                            error={errors.picture}
                            touched={touched.picture}
                        />
                    </View>
                </View>
            </View>

            <View style={elements.inlineButtonContainer}>
                <SecondaryActionButton title="Return to Login" onPress={() => navigation.navigate('SignIn')}/>
                <PrimaryActionButton title="Register" onPress={handleSubmit} />
            </View>
        </View>
        </ScrollView>

        {/* Modal component */}
        <InfoModal 
            showInfoModal={showInfoModal} 
            setShowInfoModal={setShowInfoModal} 
            headerTitle={roleTypeOptionData.value}
            modalContent={roleTypeOptionData.desc}/>

      </SafeAreaView>
      </KeyboardAvoidingView>
    </Fragment>
);
}


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    paddingBottom: 150,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    //backgroundColor: "#FFFFFF"
},
});

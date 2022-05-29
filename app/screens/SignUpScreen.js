import React, { Fragment, useEffect, useRef, useState} from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView,
    KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import TextInputBasic from '../components/TextInputBasic';
import { Auth, DataStore, Storage } from 'aws-amplify';
import PrimaryActionButton from '../components/PrimaryActionButton';
import SecondaryActionButton from '../components/SecondaryActionButton';
import elements from '../styles/elements';
import colors from '../styles/colors'; 
import icons from '../styles/icons';
import RadioButtonPanel from '../components/RadioButtonPanel';
import RadioButtonGrid from '../components/RadioButtonGrid';
import NumberHeading from '../components/NumberHeading';
import { signUp_RoleType, signUp_AboutMe, roleTypeOptions, genderOptions,
    subjectOptions, yesOrNo, tutorSubjectOptions, yearOptions, 
    PartnerCentreOptions}  from '../assets/content-info/ReferenceData'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerBasic from '../components/DateTimePickerBasic';
import Moment from 'moment';
import MultiPicker from '../components/MultiPicker'; 
import {Picker} from '@react-native-picker/picker';
import DialPicker from '../components/DialPicker';
import FrontDoorBanner from '../components/FrontDoorBanner';
import SecondaryButtonInline from '../components/SecondaryButtonInline';
import ConfirmationText from '../components/ConfirmationText';
import ToggleCard from '../components/ToggleCard';
import ErrorModal from '../components/ErrorModal';
import ActionModal from '../components/ActionModal';
import ImageUpload from '../components/ImageUpload';
import getBlob from '../functions/getBlob';
import { Voucher, UserRole } from '../../src/models';
import storeAsyncData from '../functions/AsyncStorage/storeAsyncData';
import { v4 as uuidv4 } from 'uuid';
import PrimaryActionButtonWide from '../components/PrimaryActionButtonWide';
import SelectAvailabilitiesScreen from './SelectAvailabilitiesScreen';
import AvailabilityPicker from '../components/AvailabilityPicker';


export default function SignUpScreen(props) {

const navigation = useNavigation()

//Validation
const newBirthDate = new Date();


Moment.locale('en-au'); //for formatting birthDate to dd/MM/YYYY format for AWS Auth validation

const RegisterSchema = Yup.object().shape({
    //User values
    username: Yup.string().email('Invalid username. Must be an email.')
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, 1 uppercase, 1 lowercase, 1 Number and 1 special case character"),
    confirmPassword: Yup.string()
        .required('Password confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords must match.'),
    phone_number: Yup.string()
        .min(12,'Mobile number is too short/missing').max(13,'Mobile number must be AU-based '),
    birthdate: Yup.date()
        .required('Date of birth is required').max(newBirthDate,'Must be a valid date of birth'),
    given_name: Yup.string()
        .required('Given name is required').matches(/^[A-Za-z]+$/, 'Must only contain letters'),
    family_name: Yup.string()
        .required('Family name is required').matches(/^[A-Za-z]+$/, 'Must only contain letters'),
    gender: Yup.string()
        .required('Gender is required'),
    //Account values
    roleType: Yup.string()
        .required('Role type must be selected'),
    //Account values - Student
    student_institution: Yup.string().when('roleType', {
        is: 'Student',
        then: Yup.string()
            .required('Student school/institution is required')
    }),
    student_year: Yup.string().when('roleType', {
        is: 'Student',
        then: Yup.string()
            .required('Student year is required')
    }),
    //Account values - Tutor
    tutor_institution: Yup.string().when('roleType', {
        is: 'Tutor',
        then: Yup.string()
            .required('Tutor school/institution is required')
    }),

    tutor_partnercentretoggle: Yup.string().when('roleType', {
        is: 'Tutor',
        then: Yup.string()
            .required('Partner Centre association must be selected')
    }),
    tutor_partnercentre: Yup.string().when('roleType', {
        is: 'Tutor',
        then: Yup.string().when('tutor_partnercentretoggle', {
            is: 'Yes',
            then: Yup.string()
                .required('Partner centre must be selected')
        }),
    }),
});

async function signUp(values) {
    try {
        //Map Yup values to AWS Auth attributes
        await uploadProfilePicture();

        const username = values.username;
        const password = values.password;
        const phone_number = values.phone_number;
        const email = values.username;
        const birthdate = Moment(values.birthdate).format('L');
        const gender = values.gender;
        const given_name = values.given_name;
        const family_name = values.family_name;
        const picture = values.picture ? 
            values.picture : 
            'avatar-student.png';

        //AWS Auth - Registration        
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

        
    }
    catch (error) {
        console.log('Sign Up Error',error);
    }
    finally {
        //Save User Role Info to DynamoDB
        await saveUserInfo(values);
    
        //console.log('Sign Up Successful for ',username);
        navigation.navigate('ConfirmSignUp');
    }
}

const saveUserInfo = async (values) => {
    if (values.roleType === 'Student') {
        try {
        //Save to StudentRole DB table
        await DataStore.save(new UserRole({
            username: values.username,
            roleType: values.roleType,
            org: values.student_institution,
            year: values.student_year,
            subjects: [JSON.stringify(values.student_subjects)],
            voucherApplied: codeCheck === 'Valid' ? values.voucher_code : null,
        }))
        }
        catch (e) {
            console.log('Error saving student user info: ',e)
        }
    } else if (values.roleType === 'Tutor') {
        //Save to UserRole DB table
        try {
        //Save to UserRole DB table
        await DataStore.save(new UserRole({
            username: values.username,
            roleType: values.roleType,
            org: values.tutor_institution,
            partnerCentre: selectedPartnerCentre !== null ?  values.tutor_partnercentre : null,
            subjects: selectedTutorSubjects !== null ? [JSON.stringify(values.tutor_subjects)] : null,
            tutor_availableDays: selectedAvailableDays !== null ? [JSON.stringify(values.tutor_availableDays)] : null,
        }))
        }
        catch (e) {
            console.log('Error saving tutor user info: ',e)
        }
    }

    storeAsyncData([['username',values.username]]);
}

const { handleChange, setFieldValue, handleSubmit, handleBlur, isValid, submitCount,
    values, errors, touched } = useFormik({
        validationSchema: RegisterSchema,
        initialValues: {
            //User values
            username: '', 
            password: '',
            confirmPassword: '',
            phone_number: '+61',
            birthdate: newBirthDate,
            given_name: '',
            family_name: '',
            gender: '',
            picture: '',
            //Account values
            roleType: '',
            //Account values - Student
            student_institution: '',
            student_year: '',
            student_subjects: [],
            voucher_code: '',
            //Account values - Tutor
            tutor_institution: '',
            tutor_partnercentretoggle: '',
            tutor_partnercentre: '',
            tutor_subjects: [],
            tutor_availableDays: [],

        },
        onSubmit: values => signUp(values)

});

//Pass function to Role Type component to grab role type option selected value
const [roleTypeOptionData, setRoleTypeOptionData] = useState('');
//Pass function to Gender Type component to grab gender type option selected value
const [genderOptionData, setGenderOptionData] = useState('');

const selectedRoleTypeOption = (value) => {
    setRoleTypeOptionData(value);
    values.roleType = value.value;
}
const selectedGenderOption = (value) => {
    setGenderOptionData(value);
    values.gender = value;
}

//Profile Picture
const [profilePicture, setProfilePicture] = useState(null);

const uploadProfilePicture = async () => {
    if (!profilePicture) {
        return  '';
    }
    const blob = await getBlob(profilePicture);
    //UUID is used to create unique image ID
    const { key } = await Storage.put(uuidv4()+'.png',blob); 
    values.picture = key;
}


//Year & Subject Picker
const [selectedYear, setSelectedYear] = useState(null);
const [selectedSubjects, setSelectedSubjects] = useState(null);
const [selectedTutorSubjects, setSelectedTutorSubjects] = useState(null);

const selectedYearOption = (value) => {
    setSelectedYear(value);
    values.student_year = value;
}
const selectedSubjectsOption = (value) => {
    setSelectedSubjects(value);
    values.student_subjects = value;
}
const selectedTutorSubjectsOption = (value) => {
    setSelectedTutorSubjects(value);
    values.tutor_subjects = value;
}

const pickerRef = useRef();

//Voucher Code
const [codeCheckToggle, setCodeCheckToggle] = useState(false);
const [codeResult, setCodeResult] = useState();
const [codeCheck, setCodeCheck] = useState('');

useEffect(() => {
    const verifyCode = async (code) => {
        const result = await DataStore.query(Voucher, res => res.code("eq",code));
        setCodeResult(result)
        }
    if (codeCheckToggle) {
        verifyCode(values.voucher_code)
    }
},[codeCheckToggle])

useEffect(() => {
    if (codeResult) {
    if (codeResult.length > 0) {
        setCodeCheck(codeResult[0].code === values.voucher_code ? 'Valid' : 'Invalid'); 
    } else {
        setCodeCheck('Invalid');
    }
    setCodeCheckToggle(false)
    }
},[codeResult])



//Partner Centre
const [partnerCentreToggle, setPartnerCentreToggle] = useState();

const [selectedPartnerCentre, setSelectedPartnerCentre] = useState(null);

const selectedPartnerCentreToggle = (value) => {
    setPartnerCentreToggle(value);
    values.tutor_partnercentretoggle = value;
}
const selectedPartnerCentreOption = (value) => {
    setSelectedPartnerCentre(value);
    values.tutor_partnercentre = value;
}

//Availability Picker
const [selectedAvailableDays, setSelectedAvailableDays] = useState(null);

const selectedAvailableDaysOption = (value) => {
    setSelectedAvailableDays(value);
    values.tutor_availableDays = value;
}

//Error modal
const [showErrorModal, setShowErrorModal] = useState(false);
const [submitToggle, setSubmitToggle] = useState(false);

useEffect(() => {
        if (Object.keys(errors).length>0 && submitToggle) {
            setShowErrorModal(!showErrorModal);
            setSubmitToggle(false);
        }
},[isValid])

const errorInfo = 
        <View>
            <Text style={{marginVertical: 5}}>The following fields are required:</Text>
            {errors.username && <Text>- {errors.username}</Text>}
            {errors.password && <Text>- {errors.password}</Text>}
            {errors.confirmPassword && <Text>- {errors.confirmPassword}</Text>}
            {errors.phone_number && <Text>- {errors.phone_number}</Text>}
            {errors.birthdate && <Text>- {errors.birthdate}</Text>}
            {errors.given_name && <Text>- {errors.given_name}</Text>}
            {errors.family_name && <Text>- {errors.family_name}</Text>}
            {errors.gender && <Text>- {errors.gender}</Text>}
            {errors.roleType && <Text>- {errors.roleType}</Text>}
            {roleTypeOptionData.value==='Student' ? 
            <Text>- {errors.student_institution}</Text>
            : null }
            {roleTypeOptionData.value==='Student' ? 
            <Text>- {errors.student_year}</Text>
            : null }
            {roleTypeOptionData.value==='Tutor' ? 
            <Text>- {errors.tutor_institution}</Text>
            : null }
            {roleTypeOptionData.value==='Tutor' ? 
            <Text>- {errors.tutor_partnercentretoggle}</Text>
            : null }
            {roleTypeOptionData.value==='Tutor' ? 
            <Text>- {errors.tutor_partnercentre}</Text>
            : null }
        </View>

return (
<Fragment>
            <SafeAreaView style={elements.topSafeAreaContainer}/>
            <KeyboardAvoidingView 
                            style={elements.generalContainer}
                            behavior='padding'>
            <SafeAreaView style={elements.generalContainer}>
                {/* Header Components */}
                <FrontDoorBanner/>

        {/* Register Components */}
        <ScrollView keyboardShouldPersistTaps="handled">
            
        <View style={elements.pageContentContainer}>
        
            <View style={elements.stackedInputContainer}>
                <Text style={elements.contentHeading_text}>Register</Text>
                <Text style={elements.contentSubheading_text}>Join as a student, tutor or parent.</Text>
                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='1' title='I am a ...'
                        headerTitle='How will you use Nemo?'
                        ModalContent={
                            <View>
                            {signUp_RoleType.map((item) => {
                                return (
                                    <View >
                                    <Text style={elements.modalSubHeadingText}>{item.value}</Text>
                                    <Text>{item.desc}</Text>
                                    </View>
                                )
                            })}
                            </View>
                        }
                    />
                    <RadioButtonPanel 
                        data={roleTypeOptions}
                        selectedOption={selectedRoleTypeOption}
                        error={errors.roleType}
                        touched={touched.roleType}/>

                </View>
                
                <View style={elements.stackedGreyContainer}>
                    <View style={{marginVertical:10}}>
                        <NumberHeading number='2' title='My account details' hideHelp={true}/>

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
                    <NumberHeading number='3' title='Some more about me'
                        headerTitle='How will this help you?'
                        ModalContent={
                            <View>
                            {signUp_AboutMe.map((item) => {
                                return (
                                    <View >
                                    <Text>{item.desc}</Text>
                                    </View>
                                )
                            })}
                            </View>
                        }
                    />

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
                    <Text style={[elements.formLabelText,styles.otherInputLabel]}>
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
                        <Text style={[elements.formLabelText,styles.otherInputLabel]}>
                            Profile Picture
                        </Text>
                        <View style={{borderWidth: 1, borderRadius: 10,}}>
                            <ImageUpload imageUpload={profilePicture} setImageUpload={setProfilePicture}/>
                        </View>
                    </View>
                </View>
                
                {/*Toggled for role type - Student*/}
                {roleTypeOptionData.value==='Student' ? 
                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='4' title='Student Information' hideHelp={true}/>
                    <View style={{marginVertical:10}}>
                        <TextInputBasic
                            label={'What is the name of your school/institution?*'}
                            textContentType="organizationName"
                            autoCorrect={false}
                            value={values.student_institution}
                            onChangeText={handleChange('student_institution')}
                            onBlur={handleBlur('student_institution')}
                            error={errors.student_institution}
                            touched={touched.student_institution}
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                        <View>
                            <Text style={[elements.formLabelText,styles.otherInputLabel]}>What year are you in?* </Text>
                            <DialPicker pickerRef={pickerRef} pickerData={yearOptions}
                                selectedOption={selectedYear} setSelectedOption={selectedYearOption}/>
                        </View>

                        {selectedYear && <View style={styles.otherInputContainer}>
                            <Text style={[elements.formLabelText,styles.otherInputLabel]}>Which subjects do you need help in? </Text>
                            <MultiPicker setSelectedOptions={selectedSubjectsOption} 
                                filter={selectedYear} data={subjectOptions}/>
                        </View>}

                        <View style={styles.otherInputContainer}>
                            <Text style={[elements.formLabelText,styles.otherInputLabel]}>Voucher Code </Text>
                            <Text style={{fontStyle:'italic'}}>
                                Have you been given a voucher code by your school/learning centre to earn a number of free asks?
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                <TextInputBasic
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    value={values.voucher_code}
                                    onBlur={handleBlur('voucher_code')}
                                    onChangeText={handleChange('voucher_code')}
                                    InputWidth={'75%'}
                                />
                                <View style={{justifyContent:'center', alignItems:'center', paddingTop: 5}}>
                                    <SecondaryButtonInline title='Verify' onPress={() => {
                                        setCodeCheckToggle(!codeCheckToggle);
                                        }
                                        }/>
                                </View>
                            </View>
                                {codeCheck==='' ? null : <ConfirmationText toggleProp={codeCheck} 
                                    validText='Code valid!'
                                    invalidText='Code is invalid. Please try again.'/>}

                        </View>
                    </View>

                </View>
                : null}

                {/*Toggled for role type - Tutor*/}
                {roleTypeOptionData.value==='Tutor' ? 
                <View style={elements.stackedGreyContainer}>
                    <NumberHeading number='4' title='Tutor Information' hideHelp={true}/>
                    <View style={{marginVertical:10}}>
                        <TextInputBasic
                            label={'What is the name of your school/institution? *'}
                            textContentType="organizationName"
                            autoCorrect={false}
                            value={values.tutor_institution}
                            onChangeText={handleChange('tutor_institution')}
                            onBlur={handleBlur('tutor_institution')}
                            error={errors.tutor_institution}
                            touched={touched.tutor_institution}
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                        <ToggleCard title='Are you a tutor from one of our partner centres? *' 
                            data={yesOrNo} selectedValue={selectedPartnerCentreToggle}/>
                    </View>
                    {partnerCentreToggle==='Yes' ? 
                    <View style={{marginVertical:10}}>
                        <Text style={[elements.formLabelText,styles.otherInputLabel]}>Please select partner centre * </Text>
                        <DialPicker pickerRef={pickerRef} pickerData={PartnerCentreOptions}
                                selectedOption={selectedPartnerCentre} setSelectedOption={selectedPartnerCentreOption}/>
                    </View>
                    : null}
                    <View style={styles.otherInputContainer}>
                        <Text style={[elements.formLabelText,styles.otherInputLabel]}>Which subjects would you like to tutor in? *</Text>
                        <ScrollView
                            horizontal={true}
                            style={{width:'100%'}}>
                        <MultiPicker setSelectedOptions={selectedTutorSubjectsOption} 
                            data={tutorSubjectOptions} width={1000}/>
                        </ScrollView>
                    </View>
                    <View style={styles.otherInputContainer}>
                        <Text style={[elements.formLabelText,styles.otherInputLabel]}>
                            Which days/hours of the week would you like to be available? *
                        </Text>
                        <AvailabilityPicker setSelectedOptions={selectedAvailableDaysOption}/>
                    </View>

                </View>
                : null}
            </View>

            <View style={elements.inlineButtonContainer}>
                <SecondaryActionButton title="Return to Login" onPress={() => navigation.navigate('SignIn')}/>
                <PrimaryActionButton title="Register" onPress={() => {
                    handleSubmit();
                    setSubmitToggle(!submitToggle);
                }}/>
            </View>

        </View>
        </ScrollView>
      </SafeAreaView>
      </KeyboardAvoidingView>
        <ErrorModal 
            showErrorModal={showErrorModal}
            setShowErrorModal={setShowErrorModal}
            headerTitle='Missing Information'
            ModalContent={errorInfo}
        />

    </Fragment>
);
}

const styles = StyleSheet.create({
    otherInputContainer: {
        //paddingHorizontal: 10,
        //paddingVertical: 10,
        marginTop: 15,
    },
    otherInputLabel: {
        marginBottom: 5
    }
});

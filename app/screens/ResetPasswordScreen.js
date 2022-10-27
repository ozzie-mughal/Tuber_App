import React, { Fragment, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView, TextInput,
    KeyboardAvoidingView } from 'react-native';
import WavyHeader from '../components/WavyHeader';
import { useNavigation } from '@react-navigation/core'
import Auth from '@aws-amplify/auth';
import PrimaryActionButton from '../components/PrimaryActionButton';
import TextInputBasic from '../components/TextInputBasic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import elements from '../styles/elements';
import colors from '../styles/colors';
import SecondaryActionButton from '../components/SecondaryActionButton';
import { LinearGradient } from 'expo-linear-gradient';
import TextInputWithIcon from '../components/TextInputWithIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FrontDoorBanner from '../components/FrontDoorBanner';


export default function ResetPasswordScreen({ navigation }) {

    const email = <MaterialIcons name={"email"} color={colors.grey_light} size={20}/>;
    const lock = <MaterialIcons name={"lock"} color={colors.grey_light} size={20}/>;
    const security = <MaterialIcons name={"security"} color={colors.grey_light} size={20}/>;

    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [new_password, setNew_Password] = useState('');

    //Validation

    const ForgotPasswordSchema = Yup.object().shape({
        username: Yup.string().email('Invalid username. Must be an email.').required('Required'),
        code: Yup.number('Code must be a number').required('Required'),
        password: Yup.string()
            .required('Required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, 1 uppercase, 1 lowercase, 1 Number and 1 special case character"),
        confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match.'),
    });

    async function forgotPassword(values) {
            //Map Yup values to AWS Auth attributes
            const username = values.username;
            const code = values.code;
            const new_password = values.password;
            
            await Auth.forgotPasswordSubmit(username, code, new_password)
            .then((data) => {
                console.log(data)
                navigation.navigate('SignIn');
            })
            .catch(err => console.log(err));
    }

    const { handleChange, setFieldValue, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        validationSchema: ForgotPasswordSchema,
        initialValues: {
            username: '', 
            code: '', 
            password: '',
            confirmPassword: ''},
        onSubmit: values => forgotPassword(values)

    });

    return (
    <Fragment>
            <SafeAreaView style={elements.topSafeAreaContainer}/>
            <KeyboardAvoidingView 
                            style={elements.generalContainer}
                            behavior='padding'>
            <SafeAreaView style={elements.generalContainer}>
                {/* Header Components */}
                <FrontDoorBanner 
                    heading='Reset Password'
                    subHeading='Enter your code and new password.'/>


            {/* Forgot Password Components */}
            <ScrollView keyboardShouldPersistTaps="handled">
                
            <View style={elements.pageSectionContainer}>
            
                <View style={elements.stackedInputContainer}>
                    <View style={{marginVertical:10}}>
                        <TextInputWithIcon
                            icon={email}
                            placeholder={'Username'}
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
                        <TextInputWithIcon
                            icon={security}
                            placeholder={'Verification Code'}
                            textContentType="oneTimeCode"
                            keyboardType="number-pad"
                            value={values.code}
                            onChangeText={handleChange('code')}
                            onBlur={handleBlur('code')}
                            error={errors.code}
                            touched={touched.code}
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                            <TextInputWithIcon
                                icon={lock}
                                placeholder={'New Password'}
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
                            <TextInputWithIcon
                                icon={lock}
                                placeholder={'Confirm New Password'}
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
            

                </View>
                <View style={elements.submitButtonContainer}>
                    <PrimaryActionButton title="Submit" onPress={handleSubmit} />
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
        </KeyboardAvoidingView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center", //sets all objects in bg container to start
        //alignItems: "center",
        backgroundColor: 'white'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        //backgroundColor: "#FFFFFF"
    },
    header_container: {
        paddingHorizontal: 15,
        backgroundColor: '#0AFFC2',
        width: "100%",
        height: "15%",

    },
    heading_text: {
        fontSize: 48,
        fontWeight: "800"
    },
    subheading_text: {
        fontSize: 24,
        fontWeight: "800",
    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        backgroundColor: 'white'
    },
    content_container: {
        flex: 1,
        marginTop: 100,
        alignItems: "center",
        backgroundColor: "white"
    },
    input_container: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    inputField: {
        marginVertical: 10
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 20
    },
    roleType_container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    roleType_card: {
        borderWidth: 2,
        borderRadius: 10,
        height: 150,
        width: 100,
        backgroundColor: '#fcf57e',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    }
    
})

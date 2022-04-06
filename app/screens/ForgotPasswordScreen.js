import React, { Fragment, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView,
    KeyboardAvoidingView } from 'react-native';
import WavyHeader from '../components/WavyHeader';
import { useNavigation } from '@react-navigation/core'
import { Auth } from 'aws-amplify';
import PrimaryActionButton from '../components/PrimaryActionButton';
import SecondaryActionButton from '../components/SecondaryActionButton';
import elements from '../styles/elements';
import colors from '../styles/colors';
import TextInputWithIcon from '../components/TextInputWithIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';


export default function ForgotPasswordScreen({ navigation, updateAuthState}) {

    const email = <MaterialIcons name={"email"} color={colors.grey} size={20}/>;

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {email: ''},
        onSubmit: values => {
            try {
                forgotPassword(values)
            }
            catch(error) {
                console.log('Forgot Password error',error)
            }
        }

    });

    async function forgotPassword(values) {        
        const username = values.email;

        await Auth.forgotPassword(username)
        .then((data) => {
            console.log(data);
            navigation.navigate('ResetPassword');
        })
        .catch(err => console.log(err));
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

            {/* Login/Register Components */}
            <View style={elements.splashContentContainer}>
                <View style={elements.stackedInputContainer}>
                    <Text style={elements.contentHeading_text}>Forgot Password</Text>
                    <Text style={elements.contentSubheading_text}>We will send a verification code to your email to 
                    reset your password.</Text>
                    <TextInputWithIcon
                        icon={email}
                        placeholder="Enter email"
                        onChangeText={
                            handleChange('email')}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect={false}
                        textContentType="emailAddress"
                        onBlur={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                        value={values.email}
                    />

                </View>
                <View style={elements.inlineButtonContainer}>
                    <SecondaryActionButton title="Return to Login" onPress={() => navigation.navigate('SignIn')}/>
                    <PrimaryActionButton title="Send Code" onPress={handleSubmit}/>
                </View>
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
})
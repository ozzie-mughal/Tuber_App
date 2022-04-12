import React, { Fragment, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView,
    KeyboardAvoidingView } from 'react-native';
import WavyHeader from '../components/WavyHeader';
import Line_X from '../components/Line_X';
import { useNavigation } from '@react-navigation/core'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Auth } from 'aws-amplify';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import elements from '../styles/elements';
import colors from '../styles/colors';
import TextInputWithIcon from '../components/TextInputWithIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';


export default function LoginScreen({ navigation, updateAuthState, isUserLoggedIn}) {

    const email = <MaterialIcons name={"email"} color={colors.grey} size={20}/>;
    const lock = <MaterialIcons name={"lock"} color={colors.grey} size={20}/>;

    useEffect(()=>{
        console.log(isUserLoggedIn);
    },[]);


    //Form Field states
    //const [username, setUsername] = useState('')
    //const [password, setPassword] = useState('Bumpy123!')

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .required('Required')
    });

    async function signIn(values) {
        try {
            await Auth.signIn(values.email, values.password);
            console.log('Sign-In success');
            updateAuthState('loggedIn');
        }
        catch(error) {
            console.log('Sign-In error',error)
        }
    }

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {email: '', password: ''},
        onSubmit: values => {
            try {
                signIn(values)
            }
            catch(error) {
                console.log('Sign-In error',error)
            }
        }

    });

    
    return (
        <Fragment>
        <SafeAreaView style={elements.topSafeAreaContainer}/>
        <KeyboardAvoidingView 
                        style={elements.generalContainer}
                        behavior='padding'>
        <SafeAreaView style={elements.generalContainer}>
            {/* Header Components */}
            <View style={elements.splashHeaderContainer}>                
                {/* <LinearGradient
                    // Background Linear Gradient
                    colors={[colors.skyblue_crayola, colors.dark_turquoise
                        , colors.turquoise, colors.turquoise_green
                        , colors.aquamarine, colors.light_green
                        , colors.mint_green]}
                    start={{x:0.2,y:0.1}}
                    end={{x:0.3,y:0.9}}
                    locations={[0.1, 0.3, 0.4, 0.7, 0.8, 0.9, 0.98]}
                    style={[styles.background]}
                /> */}
                <LinearGradient
                    // Background Linear Gradient
                    //colors={[colors.orange,colors.sky_pink,colors.skyblue_crayola]}
                    colors={[colors.lavender_blue,colors.sky_pink,colors.turquoise]}
                    //start={{x:0.2,y:0.1}}
                    //end={{x:0.3,y:0.9}}
                    locations={[0.1,0.6, 1]}
                    style={[styles.background]}
                />

                <Image 
                    source={require('../assets/nemo-logo.png')}
                    style={{resizeMode: 'contain', flex:1, width: 450, height: 450}}
                />
            </View>
            <View style={{
                height: 30,
            }}>
                <WavyHeader
                    customHeight={450}
                    customFill={colors.turquoise}
                    customBgColor="white"
                    customWavePattern="m0 0 48 26.7C96 53 192 107 288 144s192 59 288 48 192-53 288-80 192-37 288-26.7c96 10.7 192 42.7 240 58.7l48 16V0H0Z"
                />
            </View>

            {/* Login/Register Components */}
            <View style={elements.splashContentContainer}>
                <View style={elements.stackedInputContainer}>
                    <TextInputWithIcon
                        icon={email}
                        placeholder="Username or Email"
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
                    <TextInputWithIcon
                        icon={lock}
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        onBlur={handleBlur('password')}
                        error={errors.password}
                        touched={touched.password}
                    />
                    <View style={{alignItems:"flex-end", marginTop: 5}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={{textDecorationLine:"underline"}}>
                                Forgot your password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={elements.stackedButtonContainer}>
                    <PrimaryButton title="Login" onPress={handleSubmit}/>
                    <View style={{
                        flexDirection:'row',
                        paddingVertical: 10}
                        }>
                    <Line_X
                        customColor="grey"
                        customWidth={130}
                        customHeight={5}
                        customX1={0}
                        customY1={0}
                        customX2={130}
                        customY2={0}/>
                    <Text style={{
                            marginHorizontal:10,
                            color: 'grey',
                            fontSize: 14}}>
                        or
                    </Text>
                    <Line_X
                        customColor="grey"
                        customWidth={130}
                        customHeight={5}
                        customX1={0}
                        customY1={0}
                        customX2={130}
                        customY2={0}/>
                    </View>
                    {/* Alternative Login options */}
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity style={{marginHorizontal: 5, width:40, height:40, 
                            borderRadius: 50, backgroundColor:"black", justifyContent:'center',alignItems:'center'}}>
                                <Ionicons name={"logo-apple"} size={20} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 5, width:40, height:40, 
                            borderRadius: 50, backgroundColor:"red", justifyContent:'center',alignItems:'center'}}>
                                <Ionicons name={"logo-google"} size={20} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 5, width:40, height:40, 
                            borderRadius: 50, backgroundColor:"blue", justifyContent:'center',alignItems:'center'}}>
                                <Ionicons name={"logo-facebook"} size={20} color='white'/>
                        </TouchableOpacity>

                    </View>
                    <SecondaryButton title="Register" onPress={() => navigation.navigate('SignUp')}/>
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
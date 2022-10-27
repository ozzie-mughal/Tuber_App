import React, { Fragment, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, 
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
import { color } from 'react-native-reanimated';
import getCurrentUserInfo from '../functions/getCurrentUserInfo';
import currentBrand from '../assets/brand/currentBrand';


export default function LoginScreen({ navigation, updateAuthState, isUserLoggedIn}) {

    const email = <MaterialIcons name={"email"} color={colors.secondary} size={20}/>;
    const lock = <MaterialIcons name={"lock"} color={colors.secondary} size={20}/>;

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
        finally {
            //Grab details on User Role, based on sub ID, and store in AsyncStorage
            await getCurrentUserInfo(values.email);
        }
    }

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {email: 'o.mughal@hotmail.com', password: 'Bumpy12345!'},
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
                <Image 
                    source={require('../assets/brand/uplift-education/UpliftEd_Logo.png')}
                    style={{resizeMode: 'contain', width: 275, height: 275}}
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
                        value={values.password}
                    />
                    <View style={{alignItems:"flex-end", marginTop: 10}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={{textDecorationLine:"underline", color:colors.secondary, fontFamily: 'Nunito-Medium',fontSize:17}}>
                                Forgot your password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={elements.stackedButtonContainer}>
                    <PrimaryButton title="Login" onPress={handleSubmit}/>
                    <View style={{alignItems:'center', paddingVertical: 15}}>
                        <View style={{
                            flexDirection:'row',
                            paddingVertical: 10}
                            }>
                        <Line_X
                            customColor={colors.secondary}
                            customWidth={130}
                            customHeight={5}
                            customX1={0}
                            customY1={0}
                            customX2={130}
                            customY2={0}/>
                        <Text style={{marginHorizontal:10,color: colors.secondary,fontSize: 17,fontFamily: 'Nunito-Medium',}}>
                            or
                        </Text>
                        <Line_X
                            customColor={colors.secondary}
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
                        <TouchableOpacity style={{marginHorizontal: 5, width:45, height:45, 
                            borderRadius: 50, backgroundColor:"black", justifyContent:'center',alignItems:'center', borderColor:colors.secondary, borderWidth:1}}>
                                <Ionicons name={"logo-apple"} size={20} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 5, width:45, height:45, 
                            borderRadius: 50, backgroundColor:"red", justifyContent:'center',alignItems:'center', borderColor:colors.secondary, borderWidth:1}}>
                                <Ionicons name={"logo-google"} size={20} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 5, width:45, height:45, 
                            borderRadius: 50, backgroundColor:"blue", justifyContent:'center',alignItems:'center', borderColor:colors.secondary, borderWidth:1}}>
                                <Ionicons name={"logo-facebook"} size={20} color='white'/>
                        </TouchableOpacity>

                    </View>
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
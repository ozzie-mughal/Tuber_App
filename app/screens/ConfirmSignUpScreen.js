import React, { Fragment, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView, TextInput,
    KeyboardAvoidingView } from 'react-native';
import WavyHeader from '../components/WavyHeader';
import { useNavigation } from '@react-navigation/core'
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Auth from '@aws-amplify/auth';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryActionButton from '../components/PrimaryActionButton';
import SecondaryActionButton from '../components/SecondaryActionButton';
import elements from '../styles/elements';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/colors';


export default function ConfirmSignUpScreen({ navigation }) {

const [username, setUsername] = useState('');
const [authCode, setAuthCode] = useState('');

async function confirmSignUp() {
    try {
        await Auth.confirmSignUp(username, authCode);
        console.log('Verification Code Confirmed');
        navigation.navigate('SignIn');
    }
    catch (error) {
        console.log('Verification Code Error',error)
    }
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

        <View style={elements.splashContentContainer}>
                <View style={elements.stackedInputContainer}>
                    <Text style={elements.contentHeading_text}>Email Confirmation</Text>
                    <Text style={elements.contentSubheading_text}>Please verify your identity.</Text>
                    <View style={{marginVertical:10}}>
                        <FloatingLabelInput
                            label={'Username'}
                            value={username}
                            onChangeText={value => setUsername(value)}
                            autoCorrect={false}
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={{marginVertical:10}}>
                        <FloatingLabelInput
                            label={'Verification Code'}
                            value={authCode}
                            onChangeText={value => setAuthCode(value)}
                            textContentType="oneTimeCode"
                            keyboardType="number-pad"
                        />
                    </View>
            </View>
                <View style={elements.inlineButtonContainer}>
                    <SecondaryActionButton title="Return to Register" onPress={() => navigation.navigate('SignUp')}/>
                    <PrimaryActionButton title="Verify Code" onPress={confirmSignUp} />
                </View>
        </View>
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

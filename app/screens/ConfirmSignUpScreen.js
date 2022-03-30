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
    <SafeAreaView style={{flex:0, backgroundColor:"#0AFFC2"}}/>
    <SafeAreaView style={styles.container}>
        {/* Header Components */}
        <View style={styles.header_container}>                
            <Text style={styles.heading_text}>Register</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:5}}>
                <Text style={[styles.subheading_text, {textAlign:'right'}]}>
                    Please verify your identity.
                </Text>
            </View>
        </View>
        <View style={{
            height: 50,
        }}>
            <WavyHeader
                customHeight={450}
                customBgColor="white"
                customFill="#0affc2"
                customFillOpacity="0"
                customWavePattern="m0 0 48 26.7C96 53 192 107 288 144s192 59 288 48 192-53 288-80 192-37 288-26.7c96 10.7 192 42.7 240 58.7l48 16V0H0Z"
            />
        </View>

        {/* Register Components */}
        <ScrollView keyboardShouldPersistTaps="handled">
            
        <View style={styles.content_container}>

            <View style={styles.input_container}>
               
                <View style={styles.inputField}>
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
                <View style={styles.inputField}>
                    <FloatingLabelInput
                        label={'Verification Code'}
                        value={authCode}
                        onChangeText={value => setAuthCode(value)}
                        textContentType="oneTimeCode"
                        keyboardType="number-pad"
                    />
                </View>

            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton title="Verify Code" onPress={confirmSignUp} />
                <SecondaryButton title="Return to Registration" onPress={() => navigation.navigate('SignUp')}/>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
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

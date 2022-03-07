import React, { Component, Fragment, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView, TextInput,
    KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import WavyHeader from '../components/WavyHeader';
import Line_X from '../components/Line_X';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/core'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingLabelInput } from 'react-native-floating-label-input';


function RegisterScreen(props) {

const navigation = useNavigation()

const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [dob, setDOB] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [avatarURL, setAvatarURL] = useState('')

const handleRegister = () => {
    auth
       .createUserWithEmailAndPassword(email,password)
       .then(userCredentials => {
            const user = userCredentials.user;

            user.updateProfile({
                displayName: firstName,
                photoURL: avatarURL?avatarURL:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
              }).then(() => {
                // Update successful
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
              }); 
            console.log('Registered user with email',user.email);
            
    })
    .catch(error => alert(error.message))
}

 useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(user => {
         if (user) {
             navigation.replace("Home")
         }
     })

     return unsubscribe
 }, [])

// const handleSignUp = () => {
//      auth
//         .createUserWithEmailAndPassword(email,password)
//         .then(userCredentials => {
//              const user = userCredentials.user;
//              console.log('Registered user with email',user.email);
//      })
//      .catch(error => alert(error.message))
//  }

//  const handleLogin = () => {
//      auth
//         .signInWithEmailAndPassword(email,password)
//         .then(userCredentials => {
//             const user = userCredentials.user;
//             console.log('Logged in with',user.email);
//         })
//         .catch(error => alert(error.message))
//  }


return (
    <Fragment>
    <SafeAreaView style={{flex:0, backgroundColor:"#0AFFC2"}}/>
    <SafeAreaView style={styles.container}>
        {/* Header Components */}
        <View style={styles.header_container}>                
            <Text style={styles.heading_text}>Register</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:5}}>
                <Text style={[styles.subheading_text, {textAlign:'right'}]}>
                    Join as a student, tutor, or parent!
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
            <TouchableOpacity 
                style={{backgroundColor:'grey', borderRadius:10}}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.openbutton_text}>Log Out</Text>
            </TouchableOpacity>
            <View style={styles.input_container}>
                <View style={{marginBottom: 10}}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: '600'
                        }}>
                            I am a...
                    </Text>
                </View>
                <View style={styles.roleType_container}>
                    <TouchableOpacity style={styles.roleType_card}>
                        <Text>Student</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[
                        styles.roleType_card,
                        {backgroundColor: '#1992FC'}
                        ]}>
                        <Text>Tutor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[
                        styles.roleType_card,
                        {backgroundColor: '#9D5DE5'}
                        ]}>
                        <Text>Parent</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputField}>
                    <FloatingLabelInput
                        label={'First Name'}
                        value={firstName}
                        onChangeText={value => setFirstName(value)}
                    />
                </View>
                <View style={styles.inputField}>
                    <FloatingLabelInput
                        label={'Last Name'}
                        value={lastName}
                        onChangeText={value => setLastName(value)}
                    />
                </View>
                <View style={styles.inputField}>
                    <FloatingLabelInput
                        label={'Date of Birth'}
                        value={dob}
                        onChangeText={value => setDOB(value)}
                        maskType={'date'}
                        mask="99/99/9999"
                    />
                </View>
                <View style={styles.inputField}>
                    <FloatingLabelInput
                        label={'Email'}
                        value={email}
                        onChangeText={value => setEmail(value)}
                    />
                </View>
                <View style={styles.inputField}>
                    <FloatingLabelInput
                        label={'Password'}
                        value={password}
                        onChangeText={value => setPassword(value)}
                    />
                </View>
                <View style={styles.inputField}>
                    <FloatingLabelInput
                        label={'Confirm Password'}
                        value={confirmPassword}
                        onChangeText={value => setConfirmPassword(value)}
                    />
                </View>
                <View style={styles.inputField}>
                    <FloatingLabelInput
                        label={'Choose Avatar URL'}
                        value={avatarURL}
                        onChangeText={value => setAvatarURL(value)}
                    />
                </View>
                

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleRegister}
                    //onPress={navigation.replace("Register")}
                    style={styles.button_secondary}
                >
                    <Text style={styles.button_secondaryText}>Register</Text>
                </TouchableOpacity>
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
    button_primary: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#FFF000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 3
    },
    button_secondary: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#0AFFC2',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 3
    },
    button_primaryText: {
        fontSize: 16,
        fontWeight: "600"
    },
    button_secondaryText: {
        fontSize: 16,
        fontWeight: "600"
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

export default RegisterScreen;
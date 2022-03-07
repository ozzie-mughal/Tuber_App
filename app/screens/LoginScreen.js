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


auth.createUserWithEmailAndPassword

function LoginScreen(props) {

const navigation = useNavigation()

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

 useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(user => {
         if (user) {
             navigation.navigate("Home")
         }
     })

     return unsubscribe
 }, [])

const handleSignUp = () => {
     auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredentials => {
             const user = userCredentials.user;
             console.log('Registered user with email',user.email);
     })
     .catch(error => alert(error.message))
 }

 const handleLogin = () => {
     auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with',user.email);
        })
        .catch(error => alert(error.message))
 }


return (
    <Fragment>
    <SafeAreaView style={{flex:0, backgroundColor:"#0AFFC2"}}/>
    <KeyboardAvoidingView 
                    style={styles.container}
                    behavior='padding'>
    <SafeAreaView style={styles.container}>
        {/* Header Components */}
        <View style={styles.logo_container}>                
            <Image 
                source={require('../assets/bump_logo_tag.png')}
                style={{resizeMode: 'contain', flex:1, width: '100%', height: '100%'}}
            />
        </View>
        <View style={{
            height: 30,
        }}>
            <WavyHeader
                customHeight={450}
                customFill="#0AFFC2"
                customBgColor="white"
                customWavePattern="m0 0 48 26.7C96 53 192 107 288 144s192 59 288 48 192-53 288-80 192-37 288-26.7c96 10.7 192 42.7 240 58.7l48 16V0H0Z"
            />
        </View>

        {/* Login/Register Components */}
        <View style={styles.login_container}>
            <View style={styles.input_container}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <View style={{alignItems:"flex-end", marginTop: 5}}>
                    <TouchableOpacity>
                        <Text style={{textDecorationLine:"underline"}}>
                            Forgot your password?
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button_primary}
                >
                    <Text style={styles.button_primaryText}>Login</Text>
                </TouchableOpacity>
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
                    <TouchableOpacity style={{marginHorizontal: 5, width:50, height:50, 
                        borderRadius: 50, backgroundColor:"black", justifyContent:'center',alignItems:'center'}}>
                            <Ionicons name={"logo-apple"} size={30} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 5, width:50, height:50, 
                        borderRadius: 50, backgroundColor:"red", justifyContent:'center',alignItems:'center'}}>
                            <Ionicons name={"logo-google"} size={30} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 5, width:50, height:50, 
                        borderRadius: 50, backgroundColor:"blue", justifyContent:'center',alignItems:'center'}}>
                            <Ionicons name={"logo-facebook"} size={30} color='white'/>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity
                    onPress={() => navigation.replace("Register")}
                    style={styles.button_secondary}
                >
                    <Text style={styles.button_secondaryText}>Register</Text>
                </TouchableOpacity>
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
    logo_container: {
        justifyContent: "center", //sets all objects in bg container to start
        alignItems: "center",
        backgroundColor: '#0AFFC2',
        width: "100%",
        height: "35%",

    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        backgroundColor: 'white'
    },
    login_container: {
        flex: 1,
        alignItems: "center",
        position: "relative",
        top: 70,
        backgroundColor: "white"
    },
    input_container: {
        width: "80%"
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
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
    }
    
})

export default LoginScreen;
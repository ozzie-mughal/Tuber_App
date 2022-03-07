import React, { Fragment, useState } from 'react';
import { View, SafeAreaView, Image, ImageBackground, 
    StyleSheet, Button, Text, TouchableOpacity,
    ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FloatingAction } from "react-native-floating-action";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/core'
import WavyHeader from '../components/WavyHeader';



function WelcomeScreen(props) {

    const navigation = useNavigation()

    const [coincount, setCoinCount] = useState(0);


    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }


    const paperplane_icon = <FontAwesome 
                                name={"paper-plane"} 
                                color={"black"} 
                                size={50}
                            />;
    const close_icon = <FontAwesome 
                                name={"close"} 
                                color={"black"} 
                                size={50}
                            />;
    

    return (
        <Fragment>
        <SafeAreaView style={{flex:0, backgroundColor:"#0AFFC2"}}/>

        <SafeAreaView style={styles.container}>

        <ScrollView style={styles.container}>
            <View style={styles.header_container}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#0AFFC2','#B0FFEB']}
                    locations={[0.1, 0.6]}
                    style={[styles.background]}
                />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-end"}}>
                    <TouchableOpacity onPress={handleSignOut}>
                    <Image 
                        source={require('../assets/avatar-student.png')}
                        style={styles.viewImage_medium}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.header_title}>
                    
                    <Text style={styles.header_titletext}>
                        Hello,{"\n"}{auth.currentUser?.displayName}!
                    </Text>
                    
                </View>
                <View style={styles.content_headercards}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: 0}}>
                            <View style={[
                                styles.content_card_half,
                                {backgroundColor: "#9D5DE5"}]}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 5}}>
                                <Image
                                    source={
                                        require('../assets/coins-fill.png')}/>
                                    <Text style={{
                                        paddingLeft: 7,
                                        paddingRight: 14,
                                        fontWeight: "600",
                                        color: "#FFFFFF"}}>
                                        {coincount}</Text>
                                </View>
                            </View>
                            <View style={[
                                styles.content_card_half,
                                {backgroundColor: "#fcf57e"}]}>
                                <TouchableOpacity 
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 7}}
                                onPress={() => setCoinCount(coincount+5)}>
                                    <Text style={{
                                        fontWeight: "600",
                                        color: "black"}}>
                                        Get 5 coins</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[
                                styles.content_card_half,
                                {backgroundColor: "#DEE2E6"}]}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 5}}>
                                <Image
                                    source={
                                        require('../assets/flashlight-fill.png')}/>
                                    <Text style={{
                                        paddingLeft: 7,
                                        paddingRight: 14,
                                        fontWeight: "600",
                                        color: "#000000"}}>
                                        8</Text>
                                </View>
                            </View>
                    </View>

                </View>
                <View style={{
                    height: 50,
                }}>
                    <WavyHeader
                        customHeight={450}
                        customBgColor="white"
                        customFill="#B0FFEB"
                        customWavePattern="m0 0 48 26.7C96 53 192 107 288 144s192 59 288 48 192-53 288-80 192-37 288-26.7c96 10.7 192 42.7 240 58.7l48 16V0H0Z"
                    />
                </View>

            </View>

            <View style={styles.content_container}>

                <View style={styles.content_cards}>
                    <View>
                        <View style={styles.content_card_live}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"}}>
                                <Text style={styles.content_card_title}>
                                    Live Nudges
                                </Text>
                                <TouchableOpacity>
                                    <Text style={{
                                        textDecorationLine:"underline"}}>
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.content_card_live_msgbox}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "row"}}>
                                        <Image 
                                            source={require('../assets/avatar_icon.png')}
                                            style={styles.viewImage}/>
                                        <View style={{paddingLeft:3}}>
                                            <View style={{flexDirection:"row"}}>
                                                <Text style={{
                                                    fontWeight:"600",
                                                    paddingRight:3}}>
                                                    Alesha
                                                </Text>
                                                <Image 
                                                    source={require('../assets/focus-fill.png')}
                                                    style={styles.viewImage_small}/>
                                            </View>
                                            <Text>I think the answer might be 5.</Text>
                                        </View>
                                    </View>
                                <TouchableOpacity style={styles.openbutton}>
                                        <Text style={styles.openbutton_text}>
                                            Open
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.content_card}>
                            <Text style={styles.content_card_title}>
                                Favourite Tutors
                            </Text>
                            <Image 
                            source={require('../assets/icon.png')}
                            style={styles.viewImage}/>
                        </View>
                        <View style={styles.content_card}>
                            <Text style={styles.content_card_title}>
                                Recent Nudges
                            </Text>
                            <Image 
                            source={require('../assets/icon.png')}
                            style={styles.viewImage}/>
                        </View>
                        <View style={styles.content_card}>
                            <Text style={styles.content_card_title}>
                                Resources / How-To
                            </Text>
                            <Image 
                            source={require('../assets/icon.png')}
                            style={styles.viewImage}/>
                        </View>
                    </View>
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
        //backgroundColor: '#0AFFC2' 
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    header_container: {
        flex: 1,
        //justifyContent: "flex-start", //sets all objects in bg container to start
        //alignItems: "center",
        backgroundColor: '#7AFFDE', 
        height: 400
    },
    content_container: {
        //justifyContent: "flex-start", //sets all objects in bg container to start
        //alignItems: "center",
        backgroundColor: 'white' 
    },
    viewImage: {
        resizeMode: "contain",
        width: 30,
        height: 30,
        justifyContent: "flex-end"
    },
    viewImage_small: {
        resizeMode: "contain",
        width: 16,
        height: 16,
        justifyContent: "flex-end"
    },
    viewImage_medium: {
        resizeMode: "contain",
        width: 64,
        height: 64,
        justifyContent: "flex-end"
    },
    header_title: {
        width: "100%",
        flexDirection:"row",
        paddingHorizontal: 30,
        justifyContent:"flex-start",
    },
    header_titletext: {
        fontSize: 48,
        fontWeight: "800"
    },
    openbutton: {
        backgroundColor: "#0AFFC2",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#000000"
    },
    openbutton_text: {
        fontWeight: "600",
        fontSize: 16,
        padding: 4
    },
    content_headercards: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingHorizontal: 30,
    },
    content_cards: {
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
    },
    content_card: {
        backgroundColor: "#DEE2E6",
        borderRadius: 20,
        padding: 10,
        margin: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.7,
        shadowRadius: 7,
        shadowOffset : { width: 2, height: 2}

    },
    content_card_half: {
        borderRadius: 20,
        marginBottom: 30,
        marginRight: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.7,
        shadowRadius: 7,
        shadowOffset : { width: 2, height: 2}
    },
    content_card_title: {
        fontSize: 24,
        fontWeight: "600"
    },
    content_card_live: {
        backgroundColor: "#FCF57E",
        borderRadius: 20,
        padding: 10,
        margin: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.7,
        shadowRadius: 7,
        shadowOffset : { width: 2, height: 2}
    },
    content_card_live_msgbox: {
        backgroundColor: "#b0ab58",
        borderRadius: 20,
        padding: 5,
        marginTop: 5,
    },
})

export default WelcomeScreen;
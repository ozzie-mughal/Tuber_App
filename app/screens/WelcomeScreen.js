import React, { Fragment, useState, useEffect } from 'react';
import { View, SafeAreaView, Image, ImageBackground, 
    StyleSheet, Button, Text, TouchableOpacity,
    ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Auth } from 'aws-amplify';
import elements from '../styles/elements';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/core'
import WavyHeader from '../components/WavyHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import DashboardCardFull from '../components/DashboardCardFull';
import DashboardCard_25 from '../components/DashboardCard_25';
import DashboardPill from '../components/DashboardPill';
import ActiveAsksWidget from '../components/ActiveAsksWidget';
import TopTutorsWidget from '../components/TopTutorsWidget';
import MetricWidget from '../components/MetricWidget';
import AnnouncementCard from '../components/AnnouncementCard';
import GradientText from '../components/GradientText';
import { MenuProvider } from 'react-native-popup-menu';
import AccountMenu from '../components/AccountMenu';


const store = <FontAwesome5 name={"coins"} color={'black'} size={20}/>;
const hamburger_menu = <Entypo name={"menu"} color={colors.turquoise} size={40}/>;
const lightning = <MaterialCommunityIcons name={"lightning-bolt"} color={'gold'} size={20}/>;


export default function WelcomeScreen({ navigation, updateAuthState }) {

    //const navigation = useNavigation()

    const [coincount, setCoinCount] = useState(0);
    const [givenName, setGivenName] = useState('');
    const [picture, setAvatarImage] = useState('placedholder')

    async function signOut() {
        try {
            await Auth.signOut();
            //console.log(isUserLoggedIn);
            updateAuthState('loggedOut');
        } 
        catch(error) {
            console.log('Error signing out: ', error)
        }
        }

    async function getUserInfo() {
        try {
            let user = await Auth.currentAuthenticatedUser();
            const { attributes } = user;
            setGivenName(attributes.given_name);
            setAvatarImage(attributes.picture);
            //console.log(attributes)
        } catch(error) {
            console.log('Error in getting user info:',error)
        }
    }
    
    useEffect(() => {
        getUserInfo()
    },[])

    const avatar = <Image source={{uri:picture}} style={styles.viewImage_medium}/>;

    

    return (
        <MenuProvider>
        <Fragment>
        <SafeAreaView style={elements.topSafeAreaContainer_light}/>

        <SafeAreaView style={elements.generalContainer}>

        <ScrollView style={elements.generalContainer}>
            <View style={styles.header_container}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={[colors.grey_lightest, colors.grey_light]}
                    locations={[0.1, 0.6]}
                    style={[styles.background]}
                />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",}}>
                    <View style={{marginTop: 10,marginLeft: 10,}}>
                        {hamburger_menu}
                    </View>
                    <AccountMenu avatar={avatar} signOut={signOut}/>
                </View>
                <View style={styles.header_title}>
                    <GradientText style={styles.header_titletext}>Hello,{"\n"}{givenName}!</GradientText>
                    
                </View>
                <View style={styles.content_headercards}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: 0}}>
                            <DashboardPill icon={store} title={coincount} backgroundColor={colors.turquoise_light}/>
                            <DashboardPill icon={lightning} title='8' backgroundColor={colors.sky_pink_light}/>
                            <DashboardPill title='Get a tour >' titleStyle={{color: 'white'}} backgroundColor={colors.lavender_blue}/>
                    </View>

                </View>
                <View style={{
                    height: 50,
                }}>
                    <WavyHeader
                        customHeight={450}
                        customBgColor="white"
                        customFill={colors.grey_light}
                        customWavePattern="m0 0 48 26.7C96 53 192 107 288 144s192 59 288 48 192-53 288-80 192-37 288-26.7c96 10.7 192 42.7 240 58.7l48 16V0H0Z"
                    />
                </View>

            </View>

            {/* Dashboard Content */}

            <View style={elements.dashboardContentContainer}>
                <AnnouncementCard announcementText='Refer a friend and get 20 free coins*' seeAllTitle='Learn More >' seeAllVisible={true}/>

                <DashboardCardFull headerTitle='Live Sessions' seeAllTitle='See All Asks' 
                    Widget={ActiveAsksWidget} seeAllVisible={true} seeAllOnPress={()=>{navigation.navigate('My Asks')}} 
                    color_1={'white'} color_2={colors.grey_lightest}/>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                    <DashboardCard_25 
                        Widget={<MetricWidget headingText='11' subHeadingText='Asks' 
                            subSubHeadingText='until Level 3.' seeMoreText='More >'/>} seeAllVisible={false} 
                        color_1={colors.slate_blue_light} color_2={colors.lavender_blue}
                        left={true} />       
                    <DashboardCard_25 
                        Widget={<MetricWidget headingText='4' subHeadingText='Days' 
                            subSubHeadingText='until top-up.' seeMoreText='More >'/>} seeAllVisible={false} 
                        color_1={colors.sky_pink_light} color_2={colors.french_pink_lightest}
                        middle={true}/>       
                    <DashboardCard_25 
                        Widget={<MetricWidget headingText='34' subHeadingText='Tutors' 
                            subSubHeadingText='online now.' seeMoreText='More >'/>} seeAllVisible={false} 
                        color_1={colors.skyblue_crayola_light} color_2={colors.baby_blue}
                        right={true}/>       
                </View>
                <DashboardCardFull headerTitle='Top-Rated' seeAllTitle='See All' 
                    Widget={TopTutorsWidget} seeAllVisible={true} 
                    color_1={'white'} color_2={colors.grey_lightest}/>                       
                <DashboardCardFull headerTitle='Recent Asks' seeAllVisible={true}/>
                <DashboardCardFull headerTitle='Resources / How-To' seeAllVisible={true}/>
                
            </View>
        </ScrollView>
        </SafeAreaView>
        </Fragment>
        </MenuProvider>
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
        justifyContent: "flex-end",
        marginTop: 10,
        marginRight: 10,
        borderRadius: 32
    },
    header_title: {
        width: "100%",
        flexDirection:"row",
        paddingHorizontal: 30,
        justifyContent:"flex-start",
    },
    header_titletext: {
        fontSize: 48,
        fontWeight: "800",
        
    },
    content_headercards: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingHorizontal: 30,
    },
})
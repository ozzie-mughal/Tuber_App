import React, { Fragment, useState, useEffect } from 'react';
import { View, SafeAreaView, Image, ImageBackground, 
    StyleSheet, Button, Text, TouchableOpacity,
    ScrollView, Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';
import elements from '../styles/elements';
import colors from '../styles/colors';
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
import readAsyncData from '../functions/AsyncStorage/readAsyncData';
import AskNowWidget from '../components/AskNowWidget';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import NewsWidget from '../components/carousel'; 
import ScheduledAsksWidget from '../components/ScheduledAsksWidget';

const store = <FontAwesome5 name={"coins"} color={'black'} size={20}/>;
const hamburger_menu = <Entypo name={"menu"} color={colors.turquoise_blue} size={40}/>;
const lightning = <MaterialCommunityIcons name={"lightning-bolt"} color={'black'} size={20}/>;


export default function WelcomeScreen({ navigation, updateAuthState }) {

    const [coincount, setCoinCount] = useState(0);
    const [givenName, setGivenName] = useState('');
    const [picture, setAvatarImage] = useState(null);
    const [userAsyncData, setUserAsyncData] = useState([]);
    const width = Dimensions.get('window').width;
    const tabBarHeight = useBottomTabBarHeight();

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

    async function readAsyncUserData() {
        try {
            const roleKeys = [
                'avatarImage'
            ]
            const asyncValues = readAsyncData(roleKeys)
                .then((res) => {
                    res.map((array,key) => {
                        array.map((obj) => {
                            [key] = obj;
                        })
                })
                });

            if (!asyncValues) {
                console.log('No role information found');  
                return;          
            }

            const avatarImage = asyncValues[0];

            return avatarImage;
        } catch (e) {
            console.log('Error in fetching async user data: ',e);
        }
    }

    async function getUserInfo() {
        try {
            let user = await Auth.currentAuthenticatedUser();
            const { attributes } = user;
            setGivenName(attributes.given_name);
            //setAvatarImage(attributes.picture);
            // const avatarImage = await readAsyncUserData();
            // setAvatarImage(avatarImage);
        } catch(error) {
            console.log('Error in getting user info:',error)
        }
    }
    
    useEffect(() => {
        getUserInfo()
    },[])

    useEffect(() => {
        readAsyncData(['avatarImage']).then((res) => {
            setAvatarImage(res[0][1]);
        })
    },[])

    const defaultAvatarImage = <Image source={require('../assets/'+'avatar_icon.png')} style={styles.viewImage_medium}/>;

    return (
        <MenuProvider>
        <Fragment>
        <ImageBackground
            source={require('../assets/stacked-waves-haikei.png')}
            style={{height: '32%',
                    width: '100%',
                    resizeMode: "cover",
                    overflow: "hidden",
                    flex: 1}}>
            <SafeAreaView style={{opacity: 0}} />

                    <View>                
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",}}>
                            <View style={{marginTop: 10,marginLeft: 10,}}>
                                {hamburger_menu}
                            </View>
                            <AccountMenu avatar={picture ? 
                                <Image source={require('../assets/'+'avatar-student.png')} style={styles.viewImage_medium}/> : 
                                defaultAvatarImage} signOut={signOut}/>
                        </View>
                        <View style={{flexDirection:'row', marginBottom: 20}}>
                        <View style={styles.header_title}>
                            <GradientText style={styles.header_titletext}>Hello,{"\n"}{givenName}!</GradientText>
                        </View>
                        <View style={styles.content_headercards}>
                            <View style={{
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                marginHorizontal: 10}}>
                                    <DashboardPill icon={store} title={coincount} backgroundColor={colors.turquoise_green}/>
                                    <DashboardPill icon={lightning} title='8' backgroundColor={colors.yellow_sun}/>
                            </View>
                        </View>
                        </View>
                    </View>

                    {/* Dashboard Content */}

                    <View style={[elements.generalDashboardContainer]}>
                        <View style={{position:'absolute',top:-10, left:0.12*width,
                            justifyContent:'center',alignItems:'center', 
                            zIndex: 999}}>
                            <AskNowWidget navigation={navigation}/>
                        </View>
                    <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center',paddingBottom:tabBarHeight+20}}
                        style={elements.dashboardContentContainer}>
                        <NewsWidget/>
                        
                        <DashboardCardFull headerTitle='Live Asks' seeAllTitle='See All Asks' 
                            Widget={ActiveAsksWidget} seeAllVisible={true} seeAllOnPress={()=>{navigation.navigate('My Asks')}} 
                            color_1={'white'} color_2={colors.grey_lightest}/>
                        <DashboardCardFull headerTitle='Scheduled Asks' seeAllTitle='See All Asks' 
                            Widget={ScheduledAsksWidget} seeAllVisible={true} seeAllOnPress={()=>{navigation.navigate('My Asks')}} 
                            color_1={'white'} color_2={colors.grey_lightest}/>
                        {/* <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                            <DashboardCard_25 
                                Widget={<MetricWidget headingText='11' subHeadingText='Asks' 
                                    subSubHeadingText='until Level 3.' seeMoreText='More >'/>} seeAllVisible={false} 
                                color_1={colors.lavender_blue} color_2={colors.lavender_blue_light}
                                left={true} />       
                            <DashboardCard_25 
                                Widget={<MetricWidget headingText='4' subHeadingText='Days' 
                                    subSubHeadingText='until top-up.' seeMoreText='More >'/>} seeAllVisible={false} 
                                color_1={colors.yellow_sun} color_2={colors.yellow_crayola_light}
                                middle={true}/>       
                            <DashboardCard_25 
                                Widget={<MetricWidget headingText='34' subHeadingText='Tutors' 
                                    subSubHeadingText='online now.' seeMoreText='More >'/>} seeAllVisible={false} 
                                color_1={colors.turquoise_blue_light} color_2={colors.turquoise_blue_lightest}
                                right={true}/>       
                        </View> */}
                        <DashboardCardFull headerTitle='Top-Rated Tutors' seeAllTitle='See All' 
                            Widget={TopTutorsWidget} seeAllVisible={true} 
                            color_1={'white'} color_2={colors.grey_lightest}/>                       
                        
                    </ScrollView>
                </View>
            <SafeAreaView style={{opacity: 0}} />
        </ImageBackground>        
        </Fragment>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: '#7AFFDE', 
        height: 320
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
        width: "70%",
        flexDirection:"row",
        paddingHorizontal: 30,
        justifyContent:"flex-start",
        alignItems:'flex-start'
    },
    header_titletext: {
        fontSize: 48,
        fontWeight: "800", 
     
    },
    content_headercards: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingHorizontal: 15,
    },
})
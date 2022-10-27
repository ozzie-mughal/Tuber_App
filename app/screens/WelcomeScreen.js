import React, { Fragment, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, SafeAreaView, Image, ImageBackground, 
    StyleSheet, Button, Text, TouchableOpacity,
    ScrollView, Dimensions, ActivityIndicator } from 'react-native';
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
import AskNowWidget from '../components/AskNow/components/AskNowWidget';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import NewsWidget from '../components/carousel'; 
import ScheduledAsksWidget from '../components/ScheduledAsksWidget';
import { S3Image } from 'aws-amplify-react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNavSheet from '../navigation/BottomSheet';

const store = <FontAwesome5 name={"coins"} color={colors.money_yellow} size={20}/>;
const hamburger_menu = <Entypo name={"menu"} color={colors.yellow_sun} size={40}/>;
const lightning = <MaterialCommunityIcons name={"lightning-bolt"} color={colors.turquoise_green} size={20}/>;


export default function WelcomeScreen({ navigation, updateAuthState }) {

    const [coincount, setCoinCount] = useState(0);
    const [givenName, setGivenName] = useState('');
    const [picture, setAvatarImage] = useState(null);
    const [userAsyncData, setUserAsyncData] = useState([]);
    const width = Dimensions.get('window').width;
    const tabBarHeight = useBottomTabBarHeight();

    const [isLoading, setIsLoading] = useState(true)


    const renderLoading = () =>  {
        if (isLoading) {
            return (         
            <SafeAreaView style = {{flex:1,justifyContent: 'center', backgroundColor: 'white', textAlign: 'center',}}>
            <ActivityIndicator
            color = {colors.turquoise_blue}
            size = 'large'
            animated = {false}
          />
          <Text style = {[{fontWeight:'600',textAlign: 'center'}]}>Loading Dashboard</Text>
          </SafeAreaView>

            );
        }else {
            return null;
        }
    }

    const dashboardContent = () => {
        return (
            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center',paddingBottom:tabBarHeight+20}}
                        style={elements.dashboardContentContainer}>
                        
                        <DashboardCardFull headerTitle='Asks In Progress' seeAllTitle='See All Asks' 
                            Widget={ActiveAsksWidget} seeAllVisible={true} seeAllOnPress={()=>{navigation.navigate('My Asks')}} 
                            color_1={'white'} color_2={'white'}/>
                        <NewsWidget/>
                        <DashboardCardFull headerTitle='Scheduled Asks' seeAllTitle='See All Asks' 
                            Widget={ScheduledAsksWidget} seeAllVisible={true} seeAllOnPress={()=>{navigation.navigate('My Asks')}} 
                            color_1={'white'} color_2={'white'}/>
                        <DashboardCardFull headerTitle='Top-Rated Tutors' seeAllTitle='See All' 
                            Widget={TopTutorsWidget} seeAllVisible={true} 
                            color_1={'white'} color_2={'white'}/>                       
                        
                    </ScrollView>
        )
    }

    useEffect(() => {
        if (isLoading){
            setIsLoading(!isLoading);
        }
    })


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

        <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaView style={{backgroundColor:colors.startup_purple}} />
                
                {/* Header Content */}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: colors.startup_purple,
                    padding: 10}}>
                    <TouchableOpacity style={{marginTop: 10,marginLeft: 10,}}
                        onPress={()=>navigation.toggleDrawer()}>
                        {hamburger_menu}
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"}}>
                        <DashboardPill icon={store} title={coincount}/>
                        <DashboardPill icon={lightning} title='8'/>
                        <AccountMenu 
                            avatar={picture ? 
                                <S3Image imgKey={picture} 
                                style={styles.viewImage_medium}
                                resizeMode='contain'/> : 
                            defaultAvatarImage} 
                            signOut={signOut}/>
                    </View>
                </View>

                {/* Ask now Content */}

                <View style={[elements.askNowContainer]}>
                    <AskNowWidget/>
                </View>
            <SafeAreaView/>
            <BottomNavSheet Content={dashboardContent}/>
            </GestureHandlerRootView>
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
        width: 55,
        height: 55,
        borderRadius: 30,
        borderWidth:1,
        borderColor: colors.yellow_sun
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
        flexDirection: "row",
        //justifyContent: "space-between",
        //paddingTop: 15,
        //paddingHorizontal: 15,
    },
})
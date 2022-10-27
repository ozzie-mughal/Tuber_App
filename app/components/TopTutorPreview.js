import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopTutorPreview = ({rank, username, school, rating, answers, badges, certified, badgeVisible, badgeTitle}) => {

    const arrow_right = <MaterialIcons name={"keyboard-arrow-right"} color={colors.secondary} size={30}/>;
    const star = <MaterialIcons name={"star"} color={'gold'} size={25}/>;
    const certified_tick = <MaterialIcons name={"verified"} color={'black'} size={15}/>;
    const asks = <Ionicons name={"chatbubble"} color={colors.primary} size={20}/>;
    const trophy = <Ionicons name={"ios-trophy-sharp"} color={colors.startup_purple} size={20}/>;
    const randomAvatar = 'https://i.pravatar.cc/300';

    const [periodOption, setPeriodOption] = useState(null);

    const periodToggle = (value) => {
        setPeriodOption(value)
    }

    const periodOptions = [
        {key: 0, value: 'Weekly'},
        {key: 1, value: 'Monthly'},
        {key: 2, value: 'All-Time'},
      ];

    return (
        <TouchableOpacity style={styles.cellContainer}>
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",}}>
            <View style={{flexDirection: "row"}}>
                <View style={styles.ratingSummary}>
                    <View style={styles.rankContainer}>
                        <Text style={styles.rankText}>
                            {rank}
                        </Text>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={{uri:randomAvatar}}
                            style={[styles.viewImage, certified ? {borderWidth:1, borderColor:colors.yellow_sun} : null]}/>
                    </View>
                    <View style={{paddingLeft:5}}>
                        <View style={[styles.usernameContainer, 
                            certified ? {backgroundColor:colors.primary} : {backgroundColor:'transparent'}]}>
                            <Text style={styles.usernameText}>
                                {username}
                            </Text>
                            <View style={{paddingLeft:5}}>
                                {certified ? certified_tick : null}
                            </View>
                        </View>
                        <Text style={styles.schoolContainer}>
                            {school}
                        </Text>
                    </View>
                </View>
                <View style={styles.ratingBadges}>
                    <View style={styles.specialsContainer}>
                        {star}
                        <Text style={styles.specialsText}>{rating}</Text>
                    </View>
                    <View style={styles.specialsContainer}>
                        {asks}
                        <Text style={styles.specialsText}>{answers}</Text>
                    </View>
                    {badgeVisible && 
                    <View style={styles.specialsContainer}>
                        {trophy}
                        <Text style={styles.specialsText}>{badges}</Text>
                    </View>}
                </View>
            </View>
        <TouchableOpacity style={styles.openbutton}>
            {arrow_right}
        </TouchableOpacity>
        </View>
        </TouchableOpacity>
  )
}

export default TopTutorPreview

const styles = StyleSheet.create({
    periodToggleContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'flex-start',
    },
    periodToggleButton_unselected: {
        width: 70,
        borderRadius: 25,
        backgroundColor: colors.grey_light,
        marginHorizontal: 2,
        padding:2,
        justifyContent:'center',
        alignItems:'center'
    },
    periodToggleButton_selected: {
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.purple,
        marginHorizontal: 2,
        padding:2,
        justifyContent:'center',
        alignItems:'center'
    },
    periodToggleButtonText_unselected: {
        fontSize: 14,
        fontWeight: '400'
    },
    periodToggleButtonText_selected: {
        fontSize: 14,
        fontWeight: '600',
        color:'white'
    },
    gridContainer: {
        height: 200
    },
    cellContainer: {
        padding: 5,
        marginHorizontal: 5,
        borderBottomColor: colors.grey_light,
        borderBottomWidth: 1
    },
    usernameContainer: {
        flexDirection:"row", 
        borderRadius:15, 
        paddingHorizontal:5
    },
    usernameText: {
        fontFamily: 'Nunito-Bold'
    },
    schoolContainer: {
        flexDirection:"row", 
        borderRadius:15, 
        padding:5,
        fontSize:12,
        fontFamily:'Nunito-Medium'
    },
    ratingSummary: {
        flexDirection:'row',
        width: 175,
    },
    ratingBadges: {
        flexDirection:'row',
        width:'40%'
    },
    openbutton: {
        justifyContent:'center',
        alignItems:'center',
    },
    openbutton_text: {
        fontWeight: "600",
        fontSize: 16,
        padding: 4
    },
    rankContainer: {
        justifyContent:'center',
        alignItems:'center',
        marginRight:10
        //width:'5%'
    },
    rankText: {
        fontSize: 16,
        fontWeight: '500',

    },
    avatarContainer: {
        justifyContent: "center",
        alignItems:'center',
        marginHorizontal: 5,
        //width:'20%'
    },
    viewImage: {
        resizeMode: "contain",
        width: 35,
        height: 35,
        borderRadius: 18
    },
    viewImage_small: {
        resizeMode: "contain",
        width: 12,
        height: 12,
        justifyContent: "flex-end"
    },
    viewImage_medium: {
        resizeMode: "contain",
        width: 64,
        height: 64,
        justifyContent: "flex-end",
        margin: 10,
        borderRadius: 32
    },
    specialsContainer: {
        marginRight: 5,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row'
    },
    specialsText: {
        fontSize:16,
        fontWeight:'600',
        marginLeft: 5
    }
})
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TopTutorPreview = ({rank, username, school, rating, answers, badgeVisible, badgeTitle}) => {

    const arrow_right = <MaterialIcons name={"keyboard-arrow-right"} color={colors.turquoise} size={30}/>;
    const star = <MaterialIcons name={"star"} color={'gold'} size={25}/>;
    const paper_plane = <FontAwesome name={"paper-plane"} color={colors.turquoise} size={20}/>;
    const medal = <FontAwesome5 name={"medal"} color={colors.slate_blue} size={22}/>;
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
                        <Text style={styles.rankText}>{rank}</Text>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={{uri:randomAvatar}}
                            style={styles.viewImage}/>
                    </View>
                    <View style={{paddingLeft:3}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{
                                fontWeight:"600",
                                paddingRight:3}}>
                                {username}
                            </Text>
                        </View>
                        <Text style={{fontSize:12}}>
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
                        {paper_plane}
                        <Text style={styles.specialsText}>{answers}</Text>
                        </View>
                    {badgeVisible && <View style={styles.specialsContainer}>
                    {medal}
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
    ratingSummary: {
        flexDirection:'row',
        width: 150,
    },
    ratingBadges: {
        flexDirection:'row'

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
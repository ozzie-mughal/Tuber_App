import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TopTutorPreview from './TopTutorPreview';

const TopTutorsWidget = ({selectedOption}) => {

    const arrow_right = <MaterialIcons name={"keyboard-arrow-right"} color={colors.aquamarine} size={30}/>;
    const star = <MaterialIcons name={"star"} color={'yellow'} size={22}/>;
    const paper_plane = <FontAwesome name={"paper-plane"} color={colors.aquamarine} size={17}/>;
    const medal = <FontAwesome5 name={"medal"} color={colors.purple} size={20}/>;

    const [periodOption, setPeriodOption] = useState('Weekly');

    const periodOptions = [
        {key: 0, value: 'Weekly'},
        {key: 1, value: 'Monthly'},
        {key: 2, value: 'All-Time'},
      ];

    return (
        <View>
            <View style={styles.periodToggleContainer}>
                {periodOptions.map((item) => {
                    return (
                        <Pressable 
                        key={item.key}
                        onPress={() => {
                            setPeriodOption(item.value);
                        }}
                        style={item.value === periodOption ? styles.periodToggleButton_selected : styles.periodToggleButton_unselected}>
                        <View>
                            <Text style={item.value === periodOption ? styles.periodToggleButtonText_selected : styles.periodToggleButtonText_unselected}>
                                {item.value}
                            </Text>
                        </View>
                    </Pressable>
                    )
                    })
                }
            </View>
            <ScrollView style={styles.gridContainer}>
                <TopTutorPreview key={0} rank={1} username='Bumpy' school='UNSW' rating={4.4} answers={21} badgeVisible={true} badgeTitle='SuperProf'/>
                <TopTutorPreview key={1} rank={2} username='SmartPants' school='UWS' rating={4.2} answers={16} badgeVisible={false}/>
                <TopTutorPreview key={2} rank={3} username='MegaNerd' school='Uplift Ed' rating={4.5} answers={4} badgeVisible={false}/>
                <TopTutorPreview key={3} rank={4} username='MegaNerd' school='Uplift Ed' rating={4.5} answers={4} badgeVisible={false}/>
                <TopTutorPreview key={4} rank={5} username='MegaNerd' school='Uplift Ed' rating={4.5} answers={4} badgeVisible={false}/>

            </ScrollView>
        </View>
  )
}

export default TopTutorsWidget

const styles = StyleSheet.create({
    periodToggleContainer: {
        flexDirection: 'row',
        padding: 5,
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
        width: 70,
        borderRadius: 25,
        backgroundColor: colors.turquoise,
        marginHorizontal: 2,
        padding:2,
        justifyContent:'center',
        alignItems:'center'
    },
    periodToggleButtonText_unselected: {
        //fontSize: 12,
        fontWeight: '400'
    },
    periodToggleButtonText_selected: {
        //fontSize: 12,
        fontWeight: '600',
        color:'white'
    },
    gridContainer: {
        height: 200
    },
    cellContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        margin: 5,
    },
    openbutton: {
        justifyContent:'center',
        alignItems:'center'
    },
    openbutton_text: {
        fontWeight: "600",
        fontSize: 16,
        padding: 4
    },
    viewImage: {
        resizeMode: "contain",
        width: 25,
        height: 25,
        justifyContent: "flex-end"
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
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row'
    }
})
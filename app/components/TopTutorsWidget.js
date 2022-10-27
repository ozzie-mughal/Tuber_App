import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TopTutorPreview from './TopTutorPreview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';


const TopTutorsWidget = ({selectedOption}) => {

    return (
        <View>
            <SegmentedControl
            tintColor={colors.primary}
            fontStyle={{fontFamily:'Nunito-Bold', color:'black'}}
            activeFontStyle={{color:'black'}}
            values={['Weekly', 'Monthly', 'All-Time']}
            selectedIndex={0}
            // onValueChange={(value) => {
            //   fetchChatRooms(value);
            // }}
            //style={{width:'90%'}}
          />
            <ScrollView style={styles.gridContainer}>
                <TopTutorPreview key={0} rank={1} username='Bumpy' school='UNSW' rating={4.4} answers={21} badges={3} badgeVisible={true}/>
                <TopTutorPreview key={1} rank={2} username='SmartPants' school='UWS' rating={4.2} answers={16} certified={true} badgeVisible={false}/>
                <TopTutorPreview key={2} rank={3} username='MegaNerd' school='Uplift Ed' rating={4.5} answers={4} badgeVisible={false}/>
                <TopTutorPreview key={3} rank={4} username='MegaNerd' school='Uplift Ed' rating={4.5} answers={4} badgeVisible={false}/>
                <TopTutorPreview key={4} rank={5} username='MegaNerd' school='Uplift Ed' rating={4.5} answers={4} badgeVisible={false}/>

            </ScrollView>
        </View>
  )
}

export default TopTutorsWidget

const styles = StyleSheet.create({
    gridContainer: {
        marginTop: 10,
        height: 200
    },
})
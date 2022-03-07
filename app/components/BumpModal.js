import React, { useRef, useState } from 'react';
import { ScrollView, Image, TouchableOpacity, SafeAreaView, Modal, StyleSheet, View, Button, Text, Dimensions } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core'
import RBSheet from "react-native-raw-bottom-sheet";
import Svg, { Path } from 'react-native-svg';
import RadioButtonCard from './RadioButtonCard';
import ToggleCard from './ToggleCard';

export default function BumpModal({children, onPress}) {
  const refRBSheet = useRef();
  const navigation = useNavigation()

  const beginBump = () => {
    refRBSheet.current.close();
    navigation.navigate('Chat');
    console.log('Pressed ask option');
  };

  
  //Define Icons
  const chalkboard = <FontAwesome5 name={"chalkboard-teacher"} color={"black"} size={40}/>;
  const group = <MaterialCommunityIcons name={"account-group"} color={"black"} size={40}/>;
  const video = <FontAwesome5 name={"video"} color={"black"} size={40}/>;
  const text = <MaterialCommunityIcons name={"message-text"} color={"black"} size={40}/>;
  
  const askOptions = [
    {value: 'Book 1:1 Class', icon: chalkboard, desc: "Schedule an interactive lesson with a tutor of your choice."},
    {value: 'Join Group', icon: group, desc: "Enter a virtual, interactive classroom with other students."},
    {value: 'Video', icon: video, desc: "Get your questions answered on a short video call."},
    {value: 'Text', icon: text, desc: "Get your questions answered in a chat - as quick as 60 seconds."},
  ];

  const whoOptions = [
    {value: 'Suggest best for me', icon: chalkboard, desc: "Let Bump AI predict the most effective tutor for me, based on my preferences, ask history, and availability."},
    {value: 'Select own tutor', icon: group, desc: "Choose from your list of favourited tutors (NOTE: Tutor availability may differ)."},
  ];

  return (
    <TouchableOpacity 
    onPress={()=>{refRBSheet.current.open()}} 
    style={{
        top: -20,
        justifyContent:'center',
        alignItems:'center'}}>  
        <View>
            {children}
        </View> 
      <RBSheet
        ref={refRBSheet}
        animationType= "slide"
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          container: {
              height: 750,
              backgroundColor: "white",
              borderRadius: 50,
              top: 150,
              paddingHorizontal: 20
          },
          draggableIcon: {
            backgroundColor: "#0AFFC2",
            width: 60
          }
        }}
      >
        <View>
            <View style={{marginTop: 15}}>
                <View style={{alignItems:'center'}}>
                    <View style={{width:70, height: 5, backgroundColor:"#0AFFC2", borderRadius:15}}/>
                </View>
                <Text style={{marginTop: 15, fontSize:24, fontWeight: "700", color:"#9D5DE5"}}>Stumped on something? Let's sort you out.</Text>
            </View>
            <ScrollView style={{
                marginVertical:20,
                height: 450}}>
                <View style={styles.subContainer}>
                    <View style={{
                    marginVertical:10}}>
                        <Text style={{fontSize:21, fontWeight: "600"}}>How do you want to ask?</Text>
                    </View>
                    <RadioButtonCard data={askOptions}/>
                </View>

                <View style={styles.subContainer}>
                    <View style={{
                    marginVertical:10}}>
                        <Text style={{fontSize:21, fontWeight: "600"}}>Who do you want to ask?</Text>
                    </View>
                    <ToggleCard data={whoOptions}/>
                </View>

                <View style={styles.subContainer}>
                    <View style={{
                    marginVertical:10}}>
                        <Text style={{fontSize:20, fontWeight: "800"}}>Approx. Response Time: 1 min</Text>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{
                    marginVertical:10}}>
                        <Text style={{fontSize:20, fontWeight: "800"}}>Minimum Fee: 3 coins (A$5.20)</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', width:'100%', marginBottom: 35, justifyContent:'center'}}>
                    <TouchableOpacity
                        style={styles.button_secondary}
                    >
                        <Text style={styles.button_secondaryText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button_primary}
                        onPress={beginBump}
                    >
                        <Text style={styles.button_primaryText}>Begin</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
      </RBSheet>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
    buttonShadow: {
        shadowColor: '#000000',
        shadowOpacity: 0.7,
        shadowRadius: 7,
        shadowOffset : { width: 2, height: 2}
    },
    subContainer: {
        backgroundColor:"#F0F5FA",
        borderRadius: 15,
        flex: 1,
        padding: 10,
        marginVertical: 10
    },
    button_primary: {
        width: '40%',
        paddingVertical: 10,
        backgroundColor: '#FFF000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 3,
        marginHorizontal: 5
    },
    button_secondary: {
        width: '40%',
        paddingVertical: 10,
        backgroundColor: 'grey',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 3,
        marginHorizontal: 5
    },
    button_primaryText: {
        fontSize: 16,
        fontWeight: "600"
    },
    button_secondaryText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white"
    }
})
import { FlatList, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Users from '../../../assets/dummy-data/Users';
import colors from '../../../styles/colors';
import elements from '../../../styles/elements';
import UserPreview from '../../../components/UserPreview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { DataStore } from '@aws-amplify/datastore';
import { User, UserRole } from '../../../../src/models';
import PageHeader from '../../PageHeader';
import SearchBar from '../../../components/SearchBar';
import PageFooter from '../../PageFooter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function NewAsk_Summary( { ...props } ) {

const [selectedTutor, setSelectedTutor] = useState({
  givenName: 'Ossama',
})

const timer_icon = <Ionicons name={"ios-timer-outline"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
const person = <Ionicons name={"person"} color={"black"} size={15} style={{marginHorizontal: 5}}/>;
const newAsk = <Ionicons name={"ios-chatbubble-ellipses-sharp"} color={colors.turquoise_green} size={60}/>;
const store = <FontAwesome5 name={"coins"} color={'black'} size={20}/>;

  return (
    <View style={styles.page}>
    {/* Header Components */}
      <PageHeader headerTitle='Your Summary' subHeadingTitle='Tap Begin to request the Ask to a Tutor.'/>

      {/*Content */}
      <View style={elements.pageContentContainer}>
      {selectedTutor && 
        <View style={{flexDirection:'row', alignItems:'center', 
          justifyContent:'space-between', marginVertical:5}}>
          <Text style={{fontSize:16, fontWeight: "800"}}>Selected Tutor </Text>
          <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
              <View style={styles.headerTimer}>
                  {person}
                  <Text style={styles.timerText}>{selectedTutor.givenName}</Text>
              </View>
          </View>
        </View>}
        <View style={{flexDirection:'row', alignItems:'center', 
        justifyContent:'space-between', marginVertical:5}}>
            <Text style={{fontSize:16, fontWeight: "800"}}>Estimated Total Time </Text>
            <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                <View style={styles.headerTimer}>
                    {timer_icon}
                    <Text style={styles.timerText}>03:20</Text>
                </View>
            </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', 
            justifyContent:'space-between', marginVertical:5}}>
            <Text style={{fontSize:16, fontWeight: "800"}}>Minimum Fee </Text>
            <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                <View style={styles.headerTimer}>
                    {store}
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.timerText}>3 </Text>
                        <Text style={[styles.timerText,{color:colors.grey}]}>
                            (A$7.20)
                        </Text>
                    </View>
                </View>
            </View>
        </View>
      </View>
      {/*Footer */}
      <PageFooter primaryButtonTitle='Begin' secondaryButtonTitle='Previous'
        primaryOnPress={()=>{props.navigation.navigate('NewAsk_Summary')}}
        secondaryOnPress={()=>{props.navigation.navigate('NewAsk_SelectWho')}}/>
    </View>
  )
}


const styles = StyleSheet.create({
  page: {
    //flex: 1,
    backgroundColor: 'white'
  },
  header_container: {
    marginVertical: 30
  },
  segControl_container: {
    paddingHorizontal: 15,
    //width: "100%",
    //height: "10%",

  },
  timerText: {
    fontSize: 14,
    fontWeight: '600'
  },
  headerTimer: {
    padding: 5,
    backgroundColor: colors.grey_light,
    width: 120,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
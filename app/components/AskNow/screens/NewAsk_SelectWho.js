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

export default function NewAsk_SelectWho( { ...props } ) {

  const [users, setUsers] = useState([]);
  const [tutors, setTutors] = useState([]);

  props.test = 'testprop';

  useEffect(()=> {
    try {
      DataStore.query(User,user => user.UserRole("ne",null))
      .then(setUsers);
    }
    catch (e) {
      console.log("Datastory query error: ",e)
    }
    finally {

    }
    },[])

  useEffect(()=>{
    if (users.length > 0) {
      const tutors = users.map(user => {return user.UserRole.roleType === 'Tutor' ? user : null});
      setTutors(tutors);
    }
  },[users])


  return (
    <View style={styles.page}>
    {/* Header Components */}
      <PageHeader headerTitle='Select A Tutor' subHeadingTitle='Choose from your favourites, top-rated, or all.'/>

      {/*Content */}
      <View style={elements.pageContentContainer}>
        <SegmentedControl
          tintColor={colors.turquoise_green}
          fontStyle={{fontFamily:'Nunito-Bold', color:'black'}}
          activeFontStyle={{color:'black'}}
          values={['Favourites', 'Top-Rated', 'All']}
          selectedIndex={0}/>
          <View style={{marginVertical:20, alignItems:'center',}}>
            <SearchBar/>
          </View>
        <FlatList
            data={tutors}
            renderItem={({ item }) => <UserPreview user={item} 
            showButton={false} showArrow={true} showBadges={true}
              onPress={()=>{
                try {
                  //props.selectTutorAction(item)
                }
                finally {
                  //console.log('the tutor selected is ',selectedTutor)
                  //props.setShowActionModal(false);
                  props.navigation.navigate('NewAsk_Summary');

              }}}/> }
            style={styles.messagepreviews_container}
        />
      </View>
      {/*Footer */}
      <PageFooter primaryButtonTitle='Next' secondaryButtonTitle='Previous'
        primaryOnPress={()=>{props.navigation.navigate('NewAsk_Summary')}}
        primaryDisabled={true} secondaryDisabled={true}/>
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

  messagepreviews_container: {
    padding: 10,
    //borderRadius: 30,
    backgroundColor:'white',
    height: '80%'

  },
})
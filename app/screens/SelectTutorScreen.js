import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Users from '../assets/dummy-data/Users';
import colors from '../styles/colors';
import elements from '../styles/elements';
import UserPreview from '../components/UserPreview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { DataStore } from '@aws-amplify/datastore';
import { User, UserRole } from '../../src/models';

export default function SelectTutorScreen( { ...props } ) {

  const [users, setUsers] = useState([]);
  const [tutors, setTutors] = useState([]);

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
      <View style={styles.header_container}>   
        <SegmentedControl
          tintColor={colors.turquoise_green}
          fontStyle={{color: 'black'}}
          values={['Favourites', 'Top-Rated', 'All']}
          selectedIndex={0}
        />
      </View>
      {/*User Previews */}
      <FlatList
          data={tutors}
          renderItem={({ item }) => <UserPreview user={item} 
          showButton={false} showArrow={true} showBadges={true}
            onPress={()=>{
              try {
                props.selectTutorAction(item)
              }
              finally {
                //console.log('the tutor selected is ',selectedTutor)
                props.setShowActionModal(false)

            }}}/> }
          style={styles.messagepreviews_container}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  page: {
    //flex: 1,
    backgroundColor: colors.grey_light
  },
  header_container: {
    paddingHorizontal: 15,
    backgroundColor: colors.grey_lightest,
    width: "100%",
    height: "10%",

  },
  messagepreviews_container: {
    padding: 10,
    //borderRadius: 30,
    backgroundColor:'white',
    height: '80%'

  }
})
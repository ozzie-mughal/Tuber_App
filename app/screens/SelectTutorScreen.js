import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Users from '../assets/dummy-data/Users';
import colors from '../styles/colors';
import elements from '../styles/elements';
import UserPreview from '../components/UserPreview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../src/models';

export default function SelectTutorScreen( { ...props } ) {

  const [users, setUsers] = useState([]);

  useEffect(()=> {
    try {DataStore.query(User).then(setUsers);
    console.log(users)
    }
    catch (e) {
      console.log("Datastory query error: ",e)
    }
    },[])

  return (
    <View style={styles.page}>
    {/* Header Components */}
      <View style={styles.header_container}>   
        <SegmentedControl
          tintColor={colors.skyblue_crayola}
          fontStyle={{color: 'black'}}
          values={['Favourites', 'Top-Rated', 'All']}
          selectedIndex={0}
        />
      </View>
      {/*User Previews */}
      <FlatList
          data={users}
          renderItem={({ item }) => <UserPreview user={item} showButton={true} 
            buttonTitle="Select" onPress={()=>{
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
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import readAsyncData from './AsyncStorage/readAsyncData';
import storeAsyncData from './AsyncStorage/storeAsyncData';
import { Auth, DataStore } from 'aws-amplify';
import { UserRole } from '../../src/models';

const getCurrentUserInfo = async (username) => {

  let userRole = null;
  
  try {
  //Query for user role based on username

    const user = (await DataStore.query(UserRole))
      .filter(
        (userRole) => userRole.username === username);

      userRole = user[0];
        //console.log(userRole)
      
    }
    catch (e) {
      console.log('Error fetching user role data: ',e)
    }
    finally {
    //Store user role info to AsyncStorage
    //console.log(userRole);
    if (userRole) {
    if (userRole.roleType === 'Student') {
      //Persist student role info locally for save post-confirmation
      const studentData = [
          ['username',userRole.username],
          ['avatarImage',userRole.User.avatarImage],
          ['roleType',userRole.roleType],
          ['org',userRole.org],
          ['year',userRole.year],
          ... userRole.subjects ? [['subjects',JSON.stringify(userRole.subjects)]] : [],
          ... userRole.voucherApplied ? [['voucherApplied',userRole.voucherApplied]] : [],
      ];
      storeAsyncData(studentData);
      //console.log('User was student. Details are: ',studentData)
  } else if (userRole.roleType === 'Tutor') {
      //Persist tutor role info locally for save post-confirmation
      const tutorData = [
        ['username',userRole.username],
        ['avatarImage',userRole.User.avatarImage],
        ['roleType',userRole.roleType],
        ['org',userRole.org],
        ['subjects',JSON.stringify(userRole.subjects)],
        ... userRole.partnerCentre ? [['partnerCentre',userRole.partnerCentre]] : [],
        ... userRole.availabilities ? [['availabilities',JSON.stringify(userRole.availabilities)]] : [],
    ];
    storeAsyncData(tutorData);
    //console.log('User was tutor. Details are: ',tutorData)

  } else {
    console.log('Error: User Role type not found')
  }
}

  }

  // //Fetch role information from Asyncstorage - to map to Role table
  // const roleType = readAsyncData(['roleType']).then((res) => {
  //   return Object.values(res[0])[1];
  // });

  // const roleKeys = [
  //   'org',
  //   'year',
  //   'subjects',
  //   'voucherApplied',
  // ]
  // readAsyncData(roleKeys)
  //     .then((res) => {
  //         res.map((array,key) => {
  //             array.map((obj) => {
  //                 roleValues[key] = obj;
  //             })
  //     })
  //     });

  // if (!roleValues) {
  //     console.log('No role information found');  
  //     return;          
  // }

  // const org = roleValues[0];
  // const year = roleValues[1];
  // const subjects = roleValues[2];
  // const subjectsJSON = JSON.parse(subjects);
  // const voucherApplied = roleValues[3];
}

export default getCurrentUserInfo
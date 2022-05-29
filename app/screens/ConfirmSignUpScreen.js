import React, { Fragment, useState, useEffect } from 'react'
import { StyleSheet, Text, View, 
    SafeAreaView,
    KeyboardAvoidingView, 
    Alert} from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import PrimaryActionButton from '../components/PrimaryActionButton';
import SecondaryActionButton from '../components/SecondaryActionButton';
import elements from '../styles/elements';
import FrontDoorBanner from '../components/FrontDoorBanner';
import { Auth } from 'aws-amplify';
import readAsyncData from '../functions/AsyncStorage/readAsyncData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfirmSignUpScreen({ navigation }) {

const [authCode, setAuthCode] = useState('');

async function confirmSignUp() {
    try {
        const username_AsyncStored = await readAsyncData(['username'])
        const username = Object.values(username_AsyncStored[0])[1];        
        await Auth.confirmSignUp(username, authCode);
        console.log('Verification Code Confirmed');
        navigation.navigate('SignIn');
    }
    catch (error) {
        console.log('Verification Code Error',error)
        Alert.alert('Verification Code Error');
    }
}

// async function addUserItem() {
//     const aws = require('aws-sdk');
//     const ddb = new aws.DynamoDB();
//     const tableName = process.env.USERTABLE;

//     const now = new Date();
//     const timestamp = now.getTime();
//     const ISOtimestamp = now.toISOString()
//     const given_name = 'Test';
//     const family_name = 'mcTesty';
//     const picture = 'TestPic';

//     const username_AsyncStored = await readAsyncData(['username'])
//     const username = Object.values(username_AsyncStored[0])[1];  
//     const id = username;
  
//     const userItem = {
//       __typename:{ S: 'UserRole' },
//       _lastChangedAt: { N: timestamp.toString()},
//       _version: {N: "1" },
//       createdAt: { S: ISOtimestamp },
//       updatedAt: { S: ISOtimestamp },
//       id: { S: id },
//       givenName: { S: given_name },
//       familyName: { S: family_name },
//       avatarImage: { S: picture },
//     }
  
//     const params = {
//       Item: userItem,
//       TableName: tableName
//     };
  
//     // save a new user to dynamoDB
//     try {
//       await ddb.putItem(params).promise();
//       console.log("putItem success");
//     } catch (e) {
//       console.log(e)
//     }
// }


return (
    <Fragment>
    <SafeAreaView style={elements.topSafeAreaContainer}/>
    <KeyboardAvoidingView 
                    style={elements.generalContainer}
                    behavior='padding'>
    <SafeAreaView style={elements.generalContainer}>
        {/* Header Components */}
        <FrontDoorBanner/>

        {/* Register Components */}

        <View style={elements.splashContentContainer}>
                <View style={elements.stackedInputContainer}>
                    <Text style={elements.contentHeading_text}>Email Confirmation</Text>
                    <Text style={elements.contentSubheading_text}>Please verify your identity.</Text>
                    <View style={{marginVertical:10}}>
                        <FloatingLabelInput
                            label={'Verification Code'}
                            value={authCode}
                            onChangeText={value => setAuthCode(value)}
                            textContentType="oneTimeCode"
                            keyboardType="number-pad"
                        />
                    </View>
            </View>
                <View style={elements.inlineButtonContainer}>
                    <SecondaryActionButton title="Return to Register" onPress={() => navigation.navigate('SignUp')}/>
                    <PrimaryActionButton title="Verify Code" onPress={confirmSignUp} />
                </View>
                {/* <View style={elements.inlineButtonContainer}>
                    <SecondaryActionButton title="Put Item in userTable" onPress={addUserItem}/>
                </View> */}

        </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
    </Fragment>
);
}
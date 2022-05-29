import Moment from 'moment';
import { StyleSheet, Text, View, TextInput, Pressable, 
    TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../styles/colors';
import icons from '../styles/icons';

const getLastOnlineParser = (user) => {

    //Some constant timestamps
    const min_5 = (5*60*1000);
    const min_10 = (10*60*1000);

    if (!user?.lastOnlineAt) {
        return null;
    }
    const lastOnlineAtDiffMS = Moment().diff(user.lastOnlineAt);
    //If lastOnlineAt is less than 5 minutes ago, show as ONLINE
    if (lastOnlineAtDiffMS<min_5) {
        return 'Online';
    }
    else if (lastOnlineAtDiffMS<min_10) {
        return 'last seen 5 minutes ago'
    } else {
        return ('last seen '+ Moment(user.lastOnlineAt).fromNow())
    }
}

export default getLastOnlineParser

const styles = StyleSheet.create({
    
})
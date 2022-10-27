import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, ImageBackground, TouchableOpacity, StyleSheet, Modal, View, Text } from "react-native";
import icons from '../../styles/icons';


const askOptions = [
    {value: 'Book 1:1 Class', icon: icons.chalkboard_medium, desc: "Schedule an interactive lesson with a tutor of your choice."},
    {value: 'Join Group', icon: icons.group_medium, desc: "Enter a virtual, interactive classroom with other students."},
    {value: 'Video', icon: icons.video_medium, desc: "Get your questions answered on a short video call."},
    {value: 'Text', icon: icons.text_medium, desc: "Get your questions answered in a chat - as quick as 60 seconds."},
];

export default AskWho = ({ navigation, ...props }) => {

    return (
        <Text>Ask Who</Text>
    )
}
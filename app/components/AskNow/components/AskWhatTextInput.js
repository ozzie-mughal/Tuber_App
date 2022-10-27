import { StyleSheet, Text, View, 
    Alert, SafeAreaView, Button, ScrollView,
    KeyboardAvoidingView, TextInput } from 'react-native';
import React from 'react'
import elements from '../../../styles/elements';
import colors from '../../../styles/colors';

const AskWhatTextInput = ({icon, InputWidth, label, error, touched, ...otherProps}) => {

    const validationColor = !touched ? 'transparent' : error ? 'red' : 'limegreen';


  return (
    <View>
        <Text style={[{fontWeight:'500', fontSize:17, fontFamily:'Nunito-Medium'}, {color: validationColor},elements.formLabelText]}>
            {label}
        </Text>
        <View style={[{borderColor: validationColor}, styles.textInputContainer]}>
            {icon}
            <TextInput {...otherProps} style={[styles.input]}/>
        </View>
    </View>
  )
}

export default AskWhatTextInput

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection:'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 2,
        backgroundColor: colors.startup_purple_light,
        borderWidth:1
    },
    input: {
        paddingHorizontal: 15,
        fontSize: 17,
        fontFamily:'Nunito-SemiBold',
        color: colors.turquoise_green
    },
    errorText: {
        color: 'red',
        paddingTop: 5
    }
})
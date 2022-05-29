import { StyleSheet, Text, View, 
    Alert, SafeAreaView, Button, ScrollView,
    KeyboardAvoidingView, TextInput } from 'react-native';
import React from 'react'
import elements from '../styles/elements';
import colors from '../styles/colors';

const TextInputBasic = ({icon, InputWidth, label, error, touched, ...otherProps}) => {

    const validationColor = !touched ? 'black' : error ? 'red' : 'limegreen';


  return (
    <View>
        <Text style={[{fontWeight:'500'}, {color: validationColor},elements.formLabelText]}>
            {label}
        </Text>
        <View style={[{borderColor: validationColor}, styles.textInputContainer]}>
            {icon}
            <TextInput {...otherProps} style={[styles.input, {width: InputWidth ? InputWidth : '100%'}]}/>
        </View>
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default TextInputBasic

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection:'row',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 2,
        backgroundColor:'white'
    },
    input: {
        paddingHorizontal: 15,
        //width: {width} ? {width} : '100%'
    },
    errorText: {
        color: 'red',
        paddingTop: 5
    }
})
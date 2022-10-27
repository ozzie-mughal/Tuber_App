import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView, TextInput,
    KeyboardAvoidingView } from 'react-native';
import React from 'react'
import elements from '../styles/elements';
import colors from '../styles/colors';

const TextInputWithIcon = ({icon, error, touched, ...otherProps}) => {

    const validationColor = !touched ? 'white' : error ? 'red' : colors.UN_blue;


  return (
    <View>
        <View style={[{borderColor: validationColor}, styles.textInputWithIconContainer]}>
            {icon}
            <TextInput {...otherProps} style={styles.input} placeholderTextColor={colors.grey_light}/>
        </View>
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default TextInputWithIcon

const styles = StyleSheet.create({
    textInputWithIconContainer: {
        flexDirection:'row',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    input: {
        paddingHorizontal: 15,
        width:'100%',
        color:'white',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 17
    },
    errorText: {
        color: 'red',
        paddingTop: 5
    }
})
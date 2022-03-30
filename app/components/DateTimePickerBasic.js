import { StyleSheet, Text, View, 
    Alert, SafeAreaView, Button, ScrollView,
    KeyboardAvoidingView, TextInput } from 'react-native';
import React, { useState } from 'react'
import elements from '../styles/elements';
import colors from '../styles/colors';
import DateTimePicker from '@react-native-community/datetimepicker';


const DateTimePickerBasic = ({icon, label, error, touched, ...otherProps}) => {

    const validationColor = !touched ? 'black' : error ? 'red' : 'limegreen';

    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
     const currentDate = selectedDate;
     setShow(false);
     };

    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };

    const showDatepicker = () => {
    showMode('date');
    };

    const showTimepicker = () => {
    showMode('time');
    };

  return (
    <View>
        <Text style={[{fontWeight:'500'}, {color: validationColor}]}>
            {label}
        </Text>
        <View>
            {icon}
            <DateTimePicker
            {...otherProps}
            />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default DateTimePickerBasic

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection:'row',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 2,
    },
    input: {
        paddingHorizontal: 15,
        width:'100%'
    },
    errorText: {
        color: 'red',
        paddingTop: 5
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React, { useState} from 'react'
import {Picker} from '@react-native-picker/picker';

const DropdownPicker = ({ pickerData, selectedOption, setSelectedOption }) => {

    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue, itemIndex) =>
            setSelectedOption(itemValue)
        }>
            {pickerData.map((item)=> {
                return (
                    <Picker.Item label={item.label} value={item.value} />

                )
            })}
        </Picker>
    );
};

export default DropdownPicker


const styles = StyleSheet.create({})
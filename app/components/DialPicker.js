import { StyleSheet, Text, View } from 'react-native'
import React, { useState} from 'react'
import {Picker} from '@react-native-picker/picker';

const DialPicker = ({ pickerRef, pickerData, selectedOption, setSelectedOption }) => {

    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <Picker
        ref={pickerRef}
        selectedValue={selectedOption}
        itemStyle={{fontSize:18}}
        onValueChange={(itemValue, itemIndex) =>
            setSelectedOption(itemValue)
        }>
            <Picker.Item label='Select...' value='Select' />
            {pickerData.map((item)=> {
                return (
                    <Picker.Item label={item.name} value={item.value} />

                )
            })}
        </Picker>

        
    );
};

export default DialPicker


const styles = StyleSheet.create({})
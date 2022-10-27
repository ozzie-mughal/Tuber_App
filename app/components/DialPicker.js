import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker';

const DialPicker = ({ pickerRef, pickerData, selectedOption, 
    setSelectedOption, fontSize, hideSelectValue, filterCategory }) => {

    const [data, setData] = useState(pickerData)

    useEffect(() => {
        if (filterCategory) {
            setData(pickerData.filter(item => item.category === filterCategory));
        }
    },[filterCategory])

    return (
        <Picker
        ref={pickerRef}
        selectedValue={selectedOption}
        style={{marginVertical:5}}
        itemStyle={{fontSize:fontSize,}}
        onValueChange={(itemValue, itemIndex) =>
            setSelectedOption(itemValue)
        }>
            {hideSelectValue !== false ? <Picker.Item label='Select...' value='Select' /> : null}
            {data.map((item)=> {
                return (
                    <Picker.Item key={item.key} label={item.name} value={item.value} />

                )
            })}
        </Picker>

        
    );
};

export default DialPicker


const styles = StyleSheet.create({})
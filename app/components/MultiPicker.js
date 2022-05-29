import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import colors from '../styles/colors';
import icons from '../styles/icons';

const MultiPicker = ({ setSelectedOptions, filter, resetFieldsToggle,setResetFieldsToggle, 
    data, width, itemTextSize, selectedBackgroundColor }) => {

    const [MultiPickerData, setMultiPickerData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);

    useEffect(()=>{

        if (filter) {
            const filterData = data.filter((item)=>{
                return item.category===filter
                })
            const toggleData = filterData.map(v => (
                {...v, checked: false}
            ))
        
            setMultiPickerData(toggleData);
        } else {
            const toggleData = data.map(v => (
                {...v, checked: false}))
            setMultiPickerData(toggleData);            
        }

    },[filter])

    useEffect(()=> {
        if (resetFieldsToggle) {
            //Selection is no longer selected, hence reset fields is toggled
            const toggleData = data.map(v => (
                {...v, checked: false}))
            setMultiPickerData(toggleData); 

            setResetFieldsToggle(false);
        }
    },[resetFieldsToggle])

    useEffect(() => {
        setSelectedOptions(selectedData);
    },[selectedData])

    const toggleSelection = (item,index) => {

        if (item.checked) {
            //Selected item is already selected. Mark as deselected.
            MultiPickerData[index].checked = false;
        } else {
            //Selected item is not already selected. Mark as selected
            MultiPickerData[index].checked = true;
        }
        setMultiPickerData([...MultiPickerData]);
        setSelectedData(MultiPickerData.filter(item => {
            return (
                item.checked === true
            )
        }))
    }

  return (
    <View>
        <View style={{flexDirection:'row', flexWrap:'wrap',width: width ? width : null}}>
            {MultiPickerData.map((item,index) => {
                return (
                    <View>
                    <Pressable 
                        key={item.key}
                        onPress={() => toggleSelection(item,index)}
                        style={[
                            item.checked ? 
                                {backgroundColor: selectedBackgroundColor ? selectedBackgroundColor : colors.turquoise } : null,
                            item.checked ? 
                                styles.activeContainer : styles.inactiveContainer,
                            {justifyContent:'center', alignItems:'center', marginVertical: 5}]}>
                        <View style={{flexDirection:'row'}}>
                            <Text key={item.key} style={[{fontSize: itemTextSize ? itemTextSize : 15},
                                item.checked ? styles.activeTextStyle : styles.inactiveTextStyle,
                                ]}>
                                {item.value}
                            </Text>
                            {item.checked && 
                            <View key={item.key+'_tick'}>
                                {icons.selected_tick}
                            </View>
                            }
                        </View>
                    </Pressable>
                    </View>
                )
            })}
        </View>
    </View>
  )
}

export default MultiPicker

const styles = StyleSheet.create({
    activeContainer: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        alignSelf: 'flex-start',
        margin: 2
    },
    activeTextStyle: {
        fontWeight: "600",
        color: 'black'
    },
    inactiveContainer: {
        borderRadius: 25,
        backgroundColor: colors.grey_light,
        alignSelf: 'flex-start',
        padding: 5,
        margin: 2
    },
    inactiveTextStyle: {
        color: 'black'
    },
})
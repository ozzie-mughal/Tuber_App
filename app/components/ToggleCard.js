import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors';
import elements from '../styles/elements';

const ToggleCard = ({
    data,
    selectedValue,
    title,
    error, 
    touched,
}) => {

    const [toggleOption, setToggleOption] = useState(null);
    const [toggleOptionDesc, setToggleOptionDesc] = useState(null);
    const validationColor = !touched ? 'black' : error ? 'red' : 'limegreen';


  return (
    <View>
        {title && <Text style={[{fontWeight:'500',marginBottom: 5}, {color: validationColor}, elements.formLabelText]}>
            {title}
        </Text>}
        <View style={{flexDirection:'row', width: "100%", paddingHorizontal: 3, justifyContent: 'center'}}>
            {data.map((item) => {
                return (
                <Pressable key={item.key} onPress={() => {
                    try {
                        setToggleOption(item?.value);
                        setToggleOptionDesc(item?.desc);
                    }
                    finally {
                        selectedValue(item?.value);
                        }
                    }}
                    style={[styles.toggleCard, item.value === toggleOption ? styles.selected : styles.unselected]}>
                    <Text key={item.key} style={item.value === toggleOption ? styles.toggleCard_title_selected : styles.toggleCard_title_unselected}>
                        {item.value}
                    </Text>
                </Pressable>
                ); 
            })}
        </View>

    {toggleOptionDesc && <View style={{marginVertical: 15}}>
        <Text style={styles.toggleCard_title_selected}>{toggleOptionDesc}</Text>
    </View>}

    {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>

  )
}

export default ToggleCard

const styles = StyleSheet.create({
    toggleCard: {
        height: 50,
        width: "50%",
        borderRadius: 15,
        padding: 5,
        marginHorizontal: 3,
        justifyContent:'space-evenly',
        alignItems: 'center'
    },
    toggleCard_title_selected: {
        fontSize: 16,
        fontWeight: "600",
    },
    toggleCard_title_unselected: {
        fontSize: 16,
        fontWeight: "400",
    },
    selected: {
        backgroundColor: colors.turquoise,
        borderWidth: 2,
    },
    unselected: {
        backgroundColor: colors.grey_light
    },
    errorText: {
        color: 'red',
        paddingTop: 5
    }

})


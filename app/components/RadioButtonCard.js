import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../styles/colors';

const RadioButtonCard = ({
    data,
    selectedValue
}) => {

    const [askOption, setAskOption] = useState(null);
    const [askOptionDesc, setAskOptionDesc] = useState(null);

  return (
    <View>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        {data.map((item) => {
            return (
            <Pressable 
                key={item?.key}
                onPress={() => {
                    try {
                    if (!item.disabled) {
                        setAskOption(item?.value);
                    }
                    setAskOptionDesc(item?.desc);
                }
                finally {
                    if (!item.disabled) {
                        selectedValue(item?.value);
                    }
                    }
                }}
                style={[item?.icon !== undefined ? styles.radioButtonCard_withIcon : styles.radioButtonCard, 
                        (item?.disabled ? styles.disabled : styles.unselected), 
                        (item?.value === askOption ? styles.selected : styles.unselected),
                        ]}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    {item?.icon}
                </View>
                <Text style={item?.value === askOption ? styles.radioButtonCard_title_selected : styles.radioButtonCard_title_unselected}>
                    {item?.value}
                </Text>
            </Pressable>
            ); 
        })}
    </View>
    <View style={{marginVertical: 15}}>
        <Text style={styles.radioButtonCard_title_selected}>{askOptionDesc}</Text>
    </View>
    </View>

  )
}

export default RadioButtonCard

const styles = StyleSheet.create({
    radioButtonCard_withIcon: {
        height: 100,
        width: 80,
        borderRadius: 15,
        padding: 5,
        marginHorizontal: 3,
        justifyContent:'space-evenly'
    },
    radioButtonCard: {
        height: 50,
        borderRadius: 15,
        padding: 5,
        marginHorizontal: 3,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    radioButtonCard_title_selected: {
        fontSize: 15,
        fontWeight: "600",
    },
    radioButtonCard_title_unselected: {
        fontSize: 15,
        fontWeight: "400",
    },
    selected: {
        backgroundColor: colors.turquoise_blue,
        borderWidth: 2,
    },
    unselected: {
        backgroundColor: colors.grey_light
    },
    disabled: {
        backgroundColor: colors.grey_light,
        opacity:0.5
    }

})
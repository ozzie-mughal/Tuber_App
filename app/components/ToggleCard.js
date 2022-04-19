import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors';

const ToggleCard = ({
    data,
    selectedValue
}) => {

    const [toggleOption, setToggleOption] = useState(null);
    const [toggleOptionDesc, setToggleOptionDesc] = useState(null);

  return (
    <View>
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
    <View style={{marginVertical: 15}}>
        <Text style={styles.toggleCard_title_selected}>{toggleOptionDesc}</Text>
    </View>
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
    }

})
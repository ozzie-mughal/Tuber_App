import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'

const ToggleCard = ({
    data,
    onSelect
}) => {

    const [toggleOption, setToggleOption] = useState(null);
    const [toggleOptionDesc, setToggleOptionDesc] = useState(null);

  return (
    <View>
    <View style={{flexDirection:'row', width: "100%", paddingHorizontal: 3, justifyContent: 'center'}}>
        {data.map((item) => {
            return (
            <Pressable 
                onPress={() => {
                    setToggleOption(item.value);
                    setToggleOptionDesc(item.desc);
                }}
                style={[styles.toggleCard, item.value === toggleOption ? styles.selected : styles.unselected]}>
                <Text style={item.value === toggleOption ? styles.toggleCard_title_selected : styles.toggleCard_title_unselected}>
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
        backgroundColor: "#0AFFC2",
        borderWidth: 3,
    },
    unselected: {
        backgroundColor: "#DEE2E6"
    }

})
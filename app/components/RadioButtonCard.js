import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'

const RadioButtonCard = ({
    data,
    onSelect
}) => {

    const [askOption, setAskOption] = useState(null);
    const [askOptionDesc, setAskOptionDesc] = useState(null);

  return (
    <View>
    <View style={{flexDirection:'row', width: "100%"}}>
        {data.map((item) => {
            return (
            <Pressable 
                onPress={() => {
                    setAskOption(item.value);
                    setAskOptionDesc(item.desc);
                }}
                style={[styles.radioButtonCard, item.value === askOption ? styles.selected : styles.unselected]}>
                <View style={{justifyContent:'center', alignItems:'center', padding: 10}}>
                    {item.icon}
                </View>
                <Text style={item.value === askOption ? styles.radioButtonCard_title_selected : styles.radioButtonCard_title_unselected}>
                    {item.value}
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
    radioButtonCard: {
        height: 120,
        width: 80,
        borderRadius: 15,
        padding: 5,
        marginHorizontal: 3,
        justifyContent:'space-evenly'
    },
    radioButtonCard_title_selected: {
        fontSize: 16,
        fontWeight: "600",
    },
    radioButtonCard_title_unselected: {
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
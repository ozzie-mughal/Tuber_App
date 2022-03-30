import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'

const RadioButtonCard = ({
    data,
    selectedOption
}) => {

    const [askOption, setAskOption] = useState(null);
    const [askOptionDesc, setAskOptionDesc] = useState(null);

  return (
    <View>
    <View style={{flexDirection:'row', width: "100%", justifyContent:'space-evenly'}}>
        {data.map((item) => {
            return (
            <Pressable 
                onPress={() => {
                    try {
                        setAskOption(item.value);
                        setAskOptionDesc(item.desc);
                    }
                    finally {
                        selectedOption(item);
                    }
                }}
                style={[styles.radioButtonCard, item.value === askOption ? styles.selected : styles.unselected]}>
                <View style={item.value === askOption ? styles.radioButtonHeader_selected : styles.radioButtonHeader_unselected}>
                    {item.icon}
                </View>
                <View style={{flex:1, justifyContent:'flex-end', paddingBottom:10, paddingHorizontal: 10}}>
                    <Text style={item.value === askOption ? styles.radioButtonCard_title_selected : styles.radioButtonCard_title_unselected}>
                        {item.value}
                    </Text>
                </View>
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
        height: 150,
        width: 100,
        borderRadius: 15,
        //padding: 5,
        marginHorizontal: 3,
        //justifyContent:'space-evenly'
    },
    radioButtonHeader_selected: {
        alignItems:'center',
        backgroundColor: colors.aquamarine,
        width: '100%',
        height: '50%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    radioButtonHeader_unselected: {
        alignItems:'center',
        backgroundColor: colors.aquamarine_light,
        width: '100%',
        height: '50%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
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
        backgroundColor: colors.skyblue_crayola,
        borderWidth: 2,
    },
    unselected: {
        backgroundColor: colors.grey_light
    }

})
import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'

const RadioButtonPanel = ({
    data,
    selectedOption,
    error,
    touched
}) => {

    const [askOption, setAskOption] = useState(null);
    const [askOptionDesc, setAskOptionDesc] = useState(null);

  return (
    <View>
    <View style={{flexDirection:'row', width: "100%", justifyContent:'space-evenly'}}>
        {data.map((item) => {
            return (
            <Pressable 
                key={item.key}
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
                <View key={item.key+"1"} style={item.value === askOption ? styles.radioButtonHeader_selected : styles.radioButtonHeader_unselected}>
                    {item.icon}
                </View>
                <View key={item.key} style={{flex:1, justifyContent:'flex-end', paddingBottom:10, paddingHorizontal: 10}}>
                    <Text key={item.key} style={item.value === askOption ? styles.radioButtonCard_title_selected : styles.radioButtonCard_title_unselected}>
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
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>

  )
}

export default RadioButtonPanel

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
        backgroundColor: colors.turquoise_green,
        width: '100%',
        height: '50%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    radioButtonHeader_unselected: {
        alignItems:'center',
        backgroundColor: colors.turquoise_green_light,
        width: '100%',
        height: '50%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    radioButtonCard_title_selected: {
        fontSize: 17,
        fontWeight: "600",
    },
    radioButtonCard_title_unselected: {
        fontSize: 17,
        fontWeight: "400",
    },
    selected: {
        backgroundColor: colors.turquoise_green,
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
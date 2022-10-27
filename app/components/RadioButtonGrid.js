import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors';

const RadioButtonGrid = ({
    data,
    selectedValue,
    ...otherProps
}) => {

    const [askOption, setAskOption] = useState(null);
    const [askOptionDesc, setAskOptionDesc] = useState(null);

  return (
    <View>
        <View 
            style={{flexDirection:'row', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}
            {...otherProps}>
            {data.map((item) => {
                return (
                <View key={item.key}>
                    <Pressable 
                        key={item.key}
                        onPress={() => {
                            try {
                            setAskOption(item?.value);
                            setAskOptionDesc(item?.desc);
                        }
                        finally {
                            selectedValue(item?.value);
                            }
                        }}
                        style={[
                            item?.icon !== undefined ? styles.radioButtonCard_withIcon : styles.radioButtonCard, 
                            item?.value === askOption ? styles.selected : styles.unselected,
                            {width: 120, justifyContent:'center', alignItems:'center', marginVertical: 5}]}>
                        {item.icon && <View key={item.key} style={{justifyContent:'center', alignItems:'center', padding: 10}}>
                            {item?.icon}
                        </View>}
                        <Text key={item.key} style={[
                            item?.value === askOption ? styles.radioButtonCard_title_selected : styles.radioButtonCard_title_unselected,
                            ]}>
                            {item?.value}
                        </Text>
                    </Pressable>
                </View>
                ); 
            })}
        </View>

    </View>

  )
}

export default RadioButtonGrid

const styles = StyleSheet.create({
    radioButtonCard_withIcon: {
        height: 120,
        width: 80,
        borderRadius: 15,
        padding: 5,
        marginHorizontal: 3,
        justifyContent:'space-evenly'
    },
    radioButtonCard: {
        height: 30,
        borderRadius: 15,
        padding: 5,
        marginHorizontal: 3,
        justifyContent:'center',
        alignItems:'center',
    },
    radioButtonCard_title_selected: {
        fontSize: 15,
        fontFamily: 'Nunito-Bold',
    },
    radioButtonCard_title_unselected: {
        fontSize: 15,
        fontFamily: 'Nunito-Medium',

    },
    selected: {
        backgroundColor: colors.turquoise_green,
        borderWidth: 2,
    },
    unselected: {
        backgroundColor: colors.grey_light
    }

})
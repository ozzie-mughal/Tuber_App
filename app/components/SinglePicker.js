import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors';
import icons from '../styles/icons';

const SinglePicker = ({
    data,
    selectedValue,
    defaultOption,
    itemTextSize,
    selectedBackgroundColor,
    ...otherProps
}) => {

    const [option, setOption] = useState(defaultOption ? defaultOption : null);
    const [optionDesc, setOptionDesc] = useState(null);

  return (
    <View>
        <View 
            style={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}}
            {...otherProps}>
            {data.map((item) => {
                return (
                <View key={item.key}>
                    <Pressable 
                        key={item.key}
                        onPress={() => {
                            try {
                            setOption(item?.value);
                            setOptionDesc(item?.desc);
                            }
                            finally {
                            selectedValue(item?.value);
                            }
                        }}
                        style={[
                            item?.value === option ? 
                                styles.activeContainer : styles.inactiveContainer,
                            item?.value === option ?
                                {backgroundColor: selectedBackgroundColor ? selectedBackgroundColor : colors.turquoise } : null,
                            ]}>
                        <View style={{flexDirection:'row'}}>
                            <Text key={item.key} style={[
                                item?.value === option ? 
                                    {fontSize: itemTextSize ? itemTextSize : 15 } : null, 
                                item?.value === option ? 
                                    styles.radioButtonCard_title_selected : styles.radioButtonCard_title_unselected,
                                ]}>
                                {item?.value}
                            </Text>
                            {item?.value === option && 
                                <View>
                                    {icons.selected_tick}
                                </View>
                            }
                        </View>
                    </Pressable>
                </View>
                ); 
            })}
        </View>

    </View>

  )
}

export default SinglePicker

const styles = StyleSheet.create({
    radioButtonCard_title_selected: {
        fontWeight: "600",
    },
    radioButtonCard_title_unselected: {
        fontWeight: "400",

    },
    activeContainer: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        alignSelf: 'flex-start',
        margin: 5
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
        margin: 5
    },

})
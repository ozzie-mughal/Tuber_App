import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../styles/colors';
import elements from '../../../styles/elements';

const AskNowToggleCard = ({
    data,
    icon,
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
        <View style={{flexDirection:'row', width: "100%", paddingHorizontal: 3, justifyContent: 'center', zIndex:-1}}>
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
                    style={[item.order === 'left' ? styles.toggleCard_left : styles.toggleCard_right, 
                        item.value === toggleOption ? styles.selected : styles.unselected]}>
                    {item.icon && 
                    <View style={{marginHorizontal:10, justifyContent:'center', alignContent:'center'}}>
                        {item.value === toggleOption ? item.icon_selected : item.icon}
                    </View>}
                    <Text key={item.key} style={item.value === toggleOption ? 
                        styles.toggleCard_title_selected : styles.toggleCard_title_unselected}>
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

export default AskNowToggleCard

const styles = StyleSheet.create({
    toggleCard_left: {
        //height: 50,
        //width: "50%",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 2,
        justifyContent:'space-evenly',
        alignItems: 'center',
        borderWidth:2,
        borderColor:colors.secondary,
        flexDirection:'row',
        zIndex:-1
    },
    toggleCard_right: {
        //height: 50,
        //width: "50%",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 2,
        justifyContent:'space-evenly',
        alignItems: 'center',
        borderWidth:2,
        borderColor:colors.secondary,
        flexDirection:'row',
        zIndex:-1
    },
    toggleCard_title_selected: {
        fontSize: 15,
        fontFamily: 'Nunito-Bold',
        color:colors.primary
    },
    toggleCard_title_unselected: {
        fontSize: 15,
        fontFamily: 'Nunito-Bold',
        color:colors.secondary
    },
    selected: {
        backgroundColor: colors.secondary,
        borderWidth: 2,
    },
    unselected: {
        backgroundColor: 'transparent'
    },
    errorText: {
        color: 'red',
        paddingTop: 5,
        textAlign:'right'
    }

})


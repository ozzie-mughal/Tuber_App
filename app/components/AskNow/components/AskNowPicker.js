import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useState } from 'react'
import colors from '../../../styles/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const AskNowPicker = ({ navigation, open, value, items, setOpen, 
  setValue, setItems, containerWidth, size, placeholder, maxHeight,
  touched, error, searchable }) => {

  return (
    <Fragment>
    <DropDownPicker
        open={open}
        value={value}
        items={items}
        labelProps={{
            numberOfLines: 1
          }}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{width:containerWidth}}
        style={{backgroundColor:colors.selected, borderColor:'transparent'}}
        textStyle={[styles.askNowText, {color:colors.tertiary, fontSize:size}]}
        listItemLabelStyle={{color:'black', fontSize:17, fontFamily:'Nunito-Medium'}}
        ArrowDownIconComponent={() => {return (<MaterialIcons name={"keyboard-arrow-down"} color={colors.secondary} size={size}/>)}}
        ArrowUpIconComponent={() => {return (<MaterialIcons name={"keyboard-arrow-up"} color={colors.secondary} size={size}/>)}}
        zIndex={9999}
        placeholder={placeholder}
        maxHeight={maxHeight}
        searchable={searchable}
        searchTextInputStyle={{fontSize:12}}
        containerStyle={[touched && error ? {borderColor:'red', borderWidth:1, width:containerWidth} : {width:containerWidth}]}
        />
    {/* <View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View> */}
    </Fragment>
  )
}

export default AskNowPicker

const styles = StyleSheet.create({

    askNowText: {
        //fontSize: 34,
        fontFamily: 'Nunito-SemiBold'
    },
    errorText: {
      color: 'red',
      paddingTop: 5
  }
})
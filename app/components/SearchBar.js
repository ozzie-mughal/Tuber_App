import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import icons from '../styles/icons'
import TextInputBasic from './TextInputBasic'

const SearchBar = () => {
  return (
    <View style={styles.container}>
        <View>
            {icons.search_icon}
        </View>
        <TextInput
            clearButtonMode={'while-editing'}
            maxLength={15}
            placeholder={'Search for tutor...'}
            style={{color:'white'}}
            autoCorrect={false}
        />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        //justifyContent:'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 25,
        width: '100%'
    }
})
import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const ActiveIndicator = () => {
  return (
    <View>
        <Image 
            source={require('../assets/focus-fill.png')}
            style={styles.viewImage_small}/>    
    </View>
  )
}

export default ActiveIndicator

const styles = StyleSheet.create({
    viewImage_small: {
        resizeMode: "contain",
        width: 16,
        height: 16,
        justifyContent: "flex-end"
    },
})
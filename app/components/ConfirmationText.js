import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ConfirmationText = ({ toggleProp, validText, invalidText }) => {
  return (
    <View>
      { toggleProp === 'Valid' ? <Text style={styles.validText}>{validText}</Text> : null}
      { toggleProp === 'Invalid' ? <Text style={styles.invalidText}>{invalidText}</Text> : null}
    </View>
  )
}

export default ConfirmationText

const styles = StyleSheet.create({
  validText: {
        color: 'lime',
        paddingVertical: 5
    },
  invalidText: {
        color: 'red',
        paddingVertical: 5
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvailabilityPicker from '../components/AvailabilityPicker'

export default function SelectAvailabilitiesScreen( { ...props } ) {
  return (
    <View>
      <AvailabilityPicker/>
    </View>
  )
}


const styles = StyleSheet.create({})
import { View, Text } from 'react-native'
import React from 'react'

const clearAskNow = (setValue_askHow, setValue_askWhat_Year, 
    setValue_askWhat_Subject, selectedAskWhoToggle) => {
    
    setValue_askHow(null);
    setValue_askWhat_Year(null);
    setValue_askWhat_Subject(null);
    selectedAskWhoToggle('Best for me');

    console.log('cleared!')
  
}

export default clearAskNow
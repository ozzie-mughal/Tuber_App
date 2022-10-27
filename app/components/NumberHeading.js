import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InfoModal from './InfoModal';


const NumberHeading = ({keyword, title, number, headerTitle, hideHelp, ModalContent}) => {

    const help_icon = <MaterialCommunityIcons name={"help-circle"} color={colors.grey} size={25}/>;
    const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <View style={styles.container}>
        <View style={styles.numberContainer}>
            <Text style={styles.numberHeadingText}>{number}</Text>
        </View>
        <View style={styles.headingContainer}>
            <Text>
                <Text style={styles.headingKeywordText}>{keyword}</Text>
                <Text style={styles.headingText}>{title}</Text>
            </Text>
        </View>
        {!hideHelp && <TouchableOpacity style={styles.helpContainer} onPress={()=>{
            setShowInfoModal(true);
        }}>
            {help_icon}
        </TouchableOpacity>}


        <InfoModal 
            showInfoModal={showInfoModal}
            setShowInfoModal={setShowInfoModal}
            headerTitle={headerTitle}
            ModalContent={ModalContent}/>
    </View>
  )
}

export default NumberHeading

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection:'row',
        alignItems:'center',
    },
    numberContainer: {
        backgroundColor:colors.yellow_sun, 
        width: 40,
        height: 40,
        //padding: 20,
        borderRadius: 70,
        justifyContent:'center',
        alignItems:'center' ,
        marginRight: 10
    },
    headingContainer: {
        width: '70%'
    },
    helpContainer: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    headingText: {
        fontSize: 24, 
        fontFamily:'Nunito-Bold',
    },
    headingKeywordText: {
        fontSize: 28, 
        fontFamily:'Nunito-Bold',
        textDecorationLine:'underline'
    },
    numberHeadingText: {
        fontSize: 34, 
        fontFamily:'Nunito-Bold',
    }
})
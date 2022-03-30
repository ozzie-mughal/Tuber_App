import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/colors';

const AnnouncementCard = ({announcementText, seeAllTitle, seeAllVisible, seeAllOnPress}) => {
  return (
    <View style={styles.container}>
        <View style={styles.cardContainer}>
            <View style={styles.cardInnerContainer}>
                <Text style={styles.contentText}>{announcementText}</Text>
                    {seeAllVisible && <TouchableOpacity style={styles.openbutton} onPress={seeAllOnPress}>
                        <Text style={styles.openbutton_text}>
                            {seeAllTitle}
                        </Text>
                    </TouchableOpacity>}
            </View>
        </View>
    </View>
  )
}

export default AnnouncementCard

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        borderRadius: 10
    },
    container: {
        marginHorizontal: 15,
        marginVertical: 10,
        width: '100%',
    },
    cardContainer: {
        //borderRadius: 10,
        backgroundColor: colors.mint_green_light,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius:5,
        shadowOffset : { width: 2, height: 2},
    },
    cardInnerContainer: {
        backgroundColor: 'transparent',
        margin: 7,
        borderRadius: 10,
        flexDirection:'row',
        justifyContent:'space-between'
        //borderWidth: 1,
        //borderColor: colors.grey_light
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    },
    contentText: {
        fontSize: 14,
        fontWeight: '600',
        width:'70%'
    },
    openbutton: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 25,
        backgroundColor: colors.grey_lightest,
        //width:'30%',
        marginTop: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius:5,
        shadowOffset : { width: 2, height: 2},
    },
    openbutton_text: {
        fontWeight: "600",
        fontSize: 10,
        padding: 5,
        color: 'black'
    }
})
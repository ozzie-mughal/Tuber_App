import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/colors';

const DashboardCardFull = ({headerTitle, seeAllTitle, Widget, seeAllVisible, seeAllOnPress, color_1, color_2}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>{headerTitle}</Text>
            {seeAllVisible && <TouchableOpacity onPress={seeAllOnPress}>
                <Text style={{
                    textDecorationLine:"underline"}}>
                    {seeAllTitle}
                </Text>
            </TouchableOpacity>}
        </View>
        <View style={styles.cardContainer}>
            <LinearGradient
                // Background Linear Gradient
                colors={[color_1, color_2]}
                start={{x:0.2,y:0.1}}
                end={{x:0.3,y:0.9}}
                locations={[0.6,0.9]}
                style={[styles.background]}
            />
            <View style={styles.cardInnerContainer}>
                {Widget && <Widget/>}
            </View>
        </View>
    </View>
  )
}

export default DashboardCardFull

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
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius:3,
        shadowOffset : { width: 0, height: 0},
        //borderWidth: 1,
        //borderColor: colors.grey_light
    },
    cardInnerContainer: {
        backgroundColor: 'transparent',
        margin: 7,
        borderRadius: 10,
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
    }
})
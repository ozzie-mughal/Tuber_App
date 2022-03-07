import React from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';

function ViewImageScreen(props) {
    return (
        <SafeAreaView style={styles.viewBackground}>
            <View style={styles.imageButtons}>
                <View style={styles.closeButton} />
                <View style={styles.deleteButton}>
                    <Image 
                    style={styles.deleteIcon}
                    source={require('../assets/icon.png')}/>
                    </View>
            </View>
            <Image 
            source={require('../assets/chair.jpg')}
            style={styles.viewImage} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    viewBackground: {
        backgroundColor: "black",
        flex: 1
    },
    imageButtons: {
        flexDirection:"row",
        justifyContent: "space-between"
    },
    closeButton: {
        width: 40,
        height: 40,
        backgroundColor: "red",
        left: 20
    },
    deleteButton: {
        width: 40,
        height: 40,
        backgroundColor: "grey",
        right: 20
    },
    deleteIcon: {
        width: "100%",
        height: "100%",
        shadowColor: "red"
    },
    viewImage: {
        resizeMode: "contain",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
    }
})

export default ViewImageScreen;
import React, { useState } from 'react';
import { View, Pressable, Button, StyleSheet, Alert, Text, ScrollView, Modal } from 'react-native';
import colors from '../styles/colors'; 

const InfoModal = ({showInfoModal, setShowInfoModal, headerTitle, ModalContent, ...props}) => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showInfoModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShowInfoModal(!showInfoModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, 
          {width: props.modalWidth ? props.modalWidth : '75%'}]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>
              {headerTitle}
            </Text>
          </View>
          <ScrollView style={styles.modalContent}>
            {ModalContent}
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setShowInfoModal(!showInfoModal)}
          >
            <Text style={styles.textStyle}>Got it!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default InfoModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    //width: '100%'
  },
  modalHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.startup_purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%'
  },
  modalHeaderText: {
    fontSize: 20,
    fontFamily:'Nunito-Bold',
    paddingVertical: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    maxHeight:'60%',
    paddingBottom: 20,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 5,
    //width: '75%'
  },
  modalContent: {
    paddingBottom: 20,
    paddingHorizontal: 35,
    marginBottom: 10,

  },
  button: {
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: colors.startup_purple,
  },
  buttonClose: {
    backgroundColor: colors.startup_purple,
  },
  textStyle: {
    color: "white",
    fontFamily:'Nunito-Medium',
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16
  }
})
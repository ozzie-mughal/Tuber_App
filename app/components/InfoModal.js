import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Pressable, Button, StyleSheet, Alert, Text, ScrollView, Modal } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import HeaderHandle from './HeaderHandle';
import withModalProvider from './withModalProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import elements from '../styles/elements';
import colors from '../styles/colors'; 

const InfoModal = ({showInfoModal, setShowInfoModal, headerTitle, ModalContent}) => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showInfoModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShowInfoModal(!showInfoModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
  },
  modalHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.lavender_blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%'
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: '600',
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
    width: '75%'
  },
  modalContent: {
    paddingBottom: 20,
    paddingHorizontal: 35,
    marginBottom: 10
  },
  button: {
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: colors.slate_blue_light,
  },
  buttonClose: {
    backgroundColor: colors.slate_blue_light,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16
  }
})
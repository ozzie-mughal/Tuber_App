import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Pressable, Button, StyleSheet, SafeAreaView, Alert, Text, Modal, TouchableOpacity } from 'react-native';
import elements from '../styles/elements';
import colors from '../styles/colors'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import PrimaryActionButton from './PrimaryActionButton';
import SecondaryActionButton from './SecondaryActionButton';

const ActionModal = ( { ... props } ) => {

  //{showActionModal, setShowActionModal, headerTitle, ModalContent, showModalFooter}
  //Icons
  const close = <Ionicons name={"close-circle"} color={colors.grey} size={30} style={{marginHorizontal: 5}}/>; 

  return (
    <Modal
    animationType="slide"
    transparent={false}
    presentationStyle="formSheet"
    visible={props.showActionModal}
    onRequestClose={() => {
      props.setShowActionModal(!props.showActionModal);
      }}
      >
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <TouchableOpacity 
            style={{flexDirection:'row', justifyContent:'flex-end', padding: 10}}
            onPress={() => props.setShowActionModal(!props.showActionModal)}>
            {close}
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>
            {props.headerTitle}
          </Text>
        </View>
        <View style={styles.modalView}>
            {props.ModalContent({ ...props })}
        </View>

        {props.showModalFooter && <View style={{flex:1, justifyContent:'flex-end'}}>
        <SafeAreaView style={styles.modalFooter}>
            <SecondaryActionButton title='Cancel' onPress={() => props.setShowActionModal(!props.showActionModal)}/>
            <PrimaryActionButton title='Submit'/>
        </SafeAreaView>
        </View>}
      </View>
    </Modal>
  )
}

export default ActionModal

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: colors.grey_lightest
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 0
  },
  modalHeader: {
    backgroundColor: colors.grey_light,
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%'
  },
  modalHeaderText: {
    fontSize: 30,
    fontWeight: '600',
    margin: 10,
    color: 'black'
  },
  modalView: {
    //backgroundColor: "white",
  },
  modalFooter: {
    flexDirection:'row', 
    justifyContent:'space-evenly',
    backgroundColor: colors.grey_light,
    height: 100
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: colors.salmon,
  },
  buttonClose: {
    backgroundColor: colors.salmon,
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
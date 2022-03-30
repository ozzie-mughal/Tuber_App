import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

const AccountMenu = ({avatar, navigation, signOut}) => {

    const logout = <MaterialIcons name={"logout"} color={'red'} size={20}/>;
    const settings = <MaterialIcons name={"settings"} color={'black'} size={20}/>;
    const account = <MaterialCommunityIcons name={"account"} color={'black'} size={20}/>;

  return (
    <View>
    <Menu>
      <MenuTrigger children={avatar}/>
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Go to my account`)}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {account}
            <Text style={{paddingHorizontal:5}}>My Account</Text>
            </View>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Go to my settings`)}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {settings}
            <Text style={{paddingHorizontal:5}}>Settings</Text>
            </View>
        </MenuOption>
        <MenuOption onSelect={signOut}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {logout}
            <Text style={{color: 'red', paddingHorizontal:5}}>Log Out</Text>
            </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </View>
  )
}

export default AccountMenu

const styles = StyleSheet.create({})
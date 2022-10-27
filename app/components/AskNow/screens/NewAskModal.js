import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import NewAskMainNavigator from './NewAskMain';

const Root = createNativeStackNavigator();

const NewAskNavigator = props => {
  
    return (
        <Root.Navigator
        >
            <Root.Screen name = 'New Ask' component = {NewAskMainNavigator}
                options={{headerShown: false}}/>
        </Root.Navigator>
    );
  };

  export default NewAskNavigator;
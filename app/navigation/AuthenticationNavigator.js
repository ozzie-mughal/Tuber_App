import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import LoginScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmSignUpScreen from '../screens/ConfirmSignUpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import colors from '../styles/colors';

const AuthenticationStack = createNativeStackNavigator();


const AuthenticationNavigator = props => {
    return (
      <AuthenticationStack.Navigator headerMode="none">
        <AuthenticationStack.Screen name="SignIn" options={{headerShown:false}}>
          {screenProps => (
            <LoginScreen {...screenProps} updateAuthState={props.updateAuthState} isUserLoggedIn={props.isUserLoggedIn} />
          )}
        </AuthenticationStack.Screen>
        <AuthenticationStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:true,
          headerShadowVisible: false,
          headerTintColor: colors.yellow_sun,
          headerStyle: {backgroundColor:colors.grey_light},
          headerTitle:''}} />
        <AuthenticationStack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen} options={{headerShown:true,
          headerShadowVisible: false,
          headerTintColor: colors.yellow_sun,
          headerStyle: {backgroundColor:colors.grey_light},
          headerTitle:''}} />
        <AuthenticationStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:true,
          headerShadowVisible: false,
          headerTintColor: colors.yellow_sun,
          headerStyle: {backgroundColor:colors.grey_light},
          headerTitle:''}} />
        <AuthenticationStack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{headerShown:true,
          headerShadowVisible: false,
          headerTintColor: colors.yellow_sun,
          headerStyle: {backgroundColor:colors.grey_light},
          headerTitle:''}} />
      </AuthenticationStack.Navigator>
    );
  };

  export default AuthenticationNavigator;
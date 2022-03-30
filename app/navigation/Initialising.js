import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Initializing = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0AFFC2" />
      </View>
    );
  };

  export default Initializing;
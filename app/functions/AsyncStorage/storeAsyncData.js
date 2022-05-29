import AsyncStorage from '@react-native-async-storage/async-storage';

const storeAsyncData = async (data) => {
    try {
            // const jsonValue = JSON.stringify(value)
            // await AsyncStorage.setItem(key, jsonValue)
            await AsyncStorage.multiSet(data)
    } catch (e) {
      // saving error
      console.log('Error saving ',data,' to local DB :',e)
    }
  }

  export default storeAsyncData
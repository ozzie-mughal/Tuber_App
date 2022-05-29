import AsyncStorage from '@react-native-async-storage/async-storage';

const removeAsyncData = async (keys) => {
    try {
            // const jsonValue = JSON.stringify(value)
            // await AsyncStorage.setItem(key, jsonValue)
            await AsyncStorage.multiRemove(keys)
    } catch (e) {
      // saving error
      console.log('Error removing ',keys,' to local DB')
    }
  }

  export default removeAsyncData
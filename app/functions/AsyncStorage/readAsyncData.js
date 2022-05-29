import AsyncStorage from '@react-native-async-storage/async-storage';


async function readAsyncData(keys) {
    try {
            // return jsonValue != null ? JSON.parse(jsonValue) : null;
            const values = await AsyncStorage.multiGet(keys)
            if(values !== null) {
              return values;
            }

    } catch(e) {
      // error reading value
      console.log('Error reading for key ',keys)
    }
  }
  
  export default readAsyncData
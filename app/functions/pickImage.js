import * as ImagePicker from 'expo-image-picker';


const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    });

    if (!result.cancelled) {
        setImage(result.uri);
    }
};

export default pickImage
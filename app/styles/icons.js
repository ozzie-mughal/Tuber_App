import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from './colors';

const icons = {
    chalkboard_medium : <FontAwesome5 name={"chalkboard-teacher"} 
        color={"black"} size={40}/>,
    group_medium : <MaterialCommunityIcons name={"account-group"} 
        color={"black"} size={40}/>,
    video_medium : <FontAwesome5 name={"video"} 
        color={"black"} size={40}/>,
    text_medium : <MaterialCommunityIcons name={"message-text"} 
        color={"black"} size={40}/>,
    plus : <FontAwesome name={"plus-circle"} 
        color={colors.turquoise} size={40} style={{marginHorizontal: 5}}/>,
    image : <Ionicons name={"image-outline"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    camera : <Ionicons name={"camera-outline"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    microphone_selected : <Ionicons name={"mic"} 
        color={colors.turquoise } size={30} style={{marginHorizontal: 5}}/>,
    microphone : <Ionicons name={"mic-outline"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    smile_selected : <SimpleLineIcons name={"emotsmile"} 
        color={colors.turquoise} size={30} style={{marginHorizontal: 5}}/>,
    smile : <SimpleLineIcons name={"emotsmile"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    send : <Ionicons name={"send"} 
        color={colors.turquoise} size={30} style={{marginHorizontal: 5}}/>,
    close : <Ionicons name={"close-circle-outline"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    play : <Feather name={"play"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    pause : <Feather name={"pause"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
}

export default icons

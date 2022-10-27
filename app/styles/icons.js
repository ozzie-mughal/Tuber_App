import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from './colors';

const icons = {
    chalkboard_medium : <FontAwesome5 name={"chalkboard-teacher"} 
        color={"black"} size={35}/>,
    group_medium : <MaterialCommunityIcons name={"account-group"} 
        color={"black"} size={35}/>,
    video_medium : <FontAwesome5 name={"video"} 
        color={"black"} size={35}/>,
    text_medium : <MaterialCommunityIcons name={"message-text"} 
        color={"black"} size={35}/>,
    plus : <FontAwesome name={"plus-circle"} 
        color={colors.turquoise} size={40} style={{marginHorizontal: 5}}/>,
    image : <Ionicons name={"image-outline"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    camera : <Ionicons name={"camera-outline"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    microphone_selected : <Ionicons name={"mic"} 
        color={'white'} size={30}/>,
    microphone : <Ionicons name={"mic-outline"} 
        color={colors.startup_purple} size={30}/>,
    smile_selected : <SimpleLineIcons name={"emotsmile"} 
        color={colors.startup_purple} size={30} style={{marginHorizontal: 5}}/>,
    arrow_down : <SimpleLineIcons name={"arrow-down"} 
        color={colors.startup_purple} size={20} style={{marginHorizontal: 5}}/>,
    arrow_up : <SimpleLineIcons name={"arrow-up"} 
        color={'white'} size={20} style={{marginHorizontal: 5}}/>,
    smile : <SimpleLineIcons name={"emotsmile"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    send : <Ionicons name={"send"} 
        color={colors.startup_purple} size={30} style={{marginHorizontal: 5}}/>,
    close : <Ionicons name={"close-circle-outline"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    close_small : <Ionicons name={"close-circle-outline"} 
        color={colors.grey} size={20} style={{marginHorizontal: 5}}/>,
    play : <Feather name={"play"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    pause : <Feather name={"pause"} 
        color={colors.grey} size={30} style={{marginHorizontal: 5}}/>,
    sent_tick : <Ionicons name={"ios-checkmark-outline"} 
        color={colors.grey} size={15} style={{marginHorizontal: 5}}/>,
    delivered_tick : <Ionicons name={"ios-checkmark-done-outline"} 
        color={colors.grey} size={15} style={{marginHorizontal: 5}}/>,
    read_tick : <Ionicons name={"ios-checkmark-done-sharp"} 
        color={colors.turquoise} size={15} style={{marginHorizontal: 5}}/>,   
    selected_tick : <FontAwesome name={"check-circle"} 
        color={'lime'} size={15} style={{marginLeft: 5}}/>,   
    search_icon : <Ionicons name={"search"} color={'white'} size={30} style={{marginHorizontal: 5}}/>,

}

export default icons

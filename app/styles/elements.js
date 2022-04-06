import colors from './colors';

const elements = {
    primaryButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: colors.skyblue_crayola,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        //borderWidth: 3
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    primaryButtonText: {
        fontSize: 20,
        fontWeight: "600",
        color:'white'
    },
    secondaryButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.sky_pink,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        //borderWidth: 3
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    secondaryButtonText: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.sky_pink,
    },
    primaryActionButton: {
        width: '45%',
        height: 50,
        paddingVertical: 10,
        backgroundColor: colors.skyblue_crayola,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    primaryActionButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: 'white'
    },
    primaryActionListButton: {
        width: '25%',
        //height: 50,
        paddingVertical: 5,
        backgroundColor: colors.sky_pink_light,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    primaryActionListButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: 'white'
    },
    primaryActionButtonWide: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: colors.baby_blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    primaryActionButtonTextWide: {
        fontSize: 16,
        fontWeight: "600",
        color: 'white'
    },
    showMoreButton: {
        width: '40%',
        paddingVertical: 5,
        backgroundColor: colors.orange,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    showMoreButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: 'white'
    },
    secondaryActionButton: {
        width: '45%',
        height: 50,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderColor: colors.grey,
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        //borderWidth: 3
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    secondaryActionButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.grey
    },
    topSafeAreaContainer: {
        flex: 0,
        backgroundColor: '#FEAC5E'
    },
    topSafeAreaContainer_light: {
        flex: 0,
        backgroundColor: colors.grey_lightest
    },
    generalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    splashHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: colors.baby_blue,
        width: "100%",
        height: "35%",
    },
    screenHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: colors.baby_blue,
        width: "100%",
        height: "20%",
    },
    splashContentContainer: {
        flex: 1,
        alignItems: "center",
        position: "relative",
        top: '5%',
    },
    pageHeaderContainer: {
        paddingHorizontal: 15,
        backgroundColor: colors.skyblue_crayola,
        width: "100%",
        height: "15%",
    },
    pageHeading_text: {
        fontSize: 40,
        fontWeight: "800",
        color: 'white'
    },
    pageSubheading_text: {
        fontSize: 20,
        fontWeight: "800",
        color: 'white'
    },
    contentHeading_text: {
        fontSize: 35,
        fontWeight: '600',
        marginVertical: 5
    },
    contentSubheading_text: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.grey_light
    },
    pageContentContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center",
        backgroundColor: "white",
        posititon: 'absolute',
        bottom: 50
    },
    dashboardContentContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: "white",
        //posititon: 'absolute',
        bottom: 50,
        //left: 10,
        width: '100%'
    },
    stackedGreyContainer: {
        backgroundColor:colors.grey_lightest, 
        padding: 10, 
        borderRadius: 25,
        marginVertical: 20
    },
    stackedInputContainer: {
        width: "90%"
    },
    stackedModalInputContainer: {
        width: "100%"
    },
    stackedInput: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    stackedButtonContainer: {
        width: "60%",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: '5%'
    },
    inlineButtonContainer: {
        flexDirection:'row',
        width: "90%",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: '5%'
    },
    infoModalContainer:{
        backgroundColor:'white', 
        width:'100%', 
        flex:1, 
        padding:20
    },
    infoModalText:{
        fontSize:16,
        fontWeight:'400'
    },
    dashboardFullCardContainer: {

    }
}

export default elements
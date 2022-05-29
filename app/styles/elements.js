import colors from './colors';

const elements = {
    primaryButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#11F3E8',
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
        borderColor: colors.bubblegum_pink,
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
        color: colors.bubblegum_pink,
    },
    secondaryButtonInline: {
        //width: '20%',
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 25,
        //borderWidth: 1,
        //borderColor: colors.lavender,
        backgroundColor: colors.turquoise_green_light,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        //borderWidth: 3
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    secondaryButtonInlineText: {
        fontSize: 14,
        fontWeight: "500",
    },
    primaryActionButton: {
        width: '45%',
        height: 50,
        paddingVertical: 10,
        backgroundColor: colors.turquoise,
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
        backgroundColor: colors.lavender_blue,
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
        backgroundColor: colors.lavender_blue,
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
        color: 'black'
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
        backgroundColor: colors.turquoise_green
    },
    topSafeAreaContainer_light: {
        flex: 0,
        backgroundColor: 'transparent'
    },
    generalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    generalDashboardContainer: {
        flex: 1,
        backgroundColor: colors.grey_light,
    },
    splashHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: colors.baby_blue,
        width: "100%",
        height: "25%",
    },
    screenHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: colors.baby_blue,
        width: "100%",
        height: 150,
    },
    splashContentContainer: {
        flex: 1,
        alignItems: "center",
        position: "relative",
        top: '22%',
        backgroundColor:'white'
    },
    pageHeaderContainer: {
        paddingHorizontal: 15,
        backgroundColor: colors.skyblue_crayola,
        width: "100%",
        height: "15%",
    },
    pageHeading_text: {
        fontSize: 26,
        fontWeight: "600",
        color: 'white'
    },
    pageSubheading_text: {
        fontSize: 21,
        fontWeight: "600",
        color: 'white'
    },
    contentHeading_text: {
        fontSize: 35,
        fontWeight: '600',
        marginVertical: 5,
        color: 'black',
    },
    contentSubheading_text: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    pageContentContainer: {
        flex: 1,
        marginTop: 170,
        alignItems: "center",
        backgroundColor: "white",
        posititon: 'absolute',
        //bottom: -100
    },
    dashboardContentContainer: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "white",
        width: '100%',
        borderRadius: 30 ,
        paddingTop: 50,
        marginTop: 75
        
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
        marginBottom: 25
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

    },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: '600',
        paddingVertical: 5
    },
    modalSubHeadingText: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 5,
    marginTop: 10,
    textAlign:'left',
    },
    formLabelText: {
        fontSize: 16,
        fontWeight: '500'
    }
}

export default elements
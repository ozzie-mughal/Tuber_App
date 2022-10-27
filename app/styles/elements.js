import colors from './colors';

const elements = {
    primaryButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: colors.primary,
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
        fontSize: 17,
        fontWeight: "600",
        fontFamily: 'Nunito-Bold',
        color:colors.secondary
    },
    askNowPrimaryButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: colors.secondary,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        //borderWidth: 3
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    askNowPrimaryButtonText: {
        fontSize: 17,
        fontWeight: "600",
        fontFamily: 'Nunito-Bold',
        color: colors.primary
    },
    askNowSecondaryButton: {
        //width: '100%',
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'white',
        
    },
    askNowSecondaryButtonText: {
        fontSize: 17,
        fontWeight: "600",
        fontFamily: 'Nunito-Bold',
        color:'white'
    },
    secondaryButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.secondary,
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
        fontSize: 17,
        fontWeight: "600",
        fontFamily: 'Nunito-Bold',
        color: colors.secondary,
    },
    askNowIconContainer: {
        //width: '100%',
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    secondaryButtonInline: {
        //width: '20%',
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 25,
        //borderWidth: 1,
        //borderColor: colors.lavender,
        backgroundColor: colors.turquoise_green,
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
        fontSize: 15,
        fontFamily: 'Nunito-Medium',
    },
    primaryActionButton: {
        width: '45%',
        height: 50,
        paddingVertical: 10,
        backgroundColor: colors.turquoise_green,
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
        fontSize: 17,
        fontFamily:'Nunito-Bold'
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
        width: '50%',
        paddingVertical: 10,
        backgroundColor: colors.yellow_sun,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: 3}
    },
    primaryActionButtonTextWide: {
        fontSize: 16,
        fontWeight: "600",
    },
    showMoreButton: {
        width: '40%',
        paddingVertical: 5,
        backgroundColor: colors.yellow_sun,
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
        backgroundColor: colors.primary
    },
    bottomSafeAreaContainer: {
        flex: 0,
        backgroundColor: colors.startup_purple
    },
    topSafeAreaContainer_light: {
        flex: 0,
        backgroundColor: 'transparent'
    },
    generalContainer: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    askNowContainer: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    splashHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        height: "25%",
    },
    screenHeaderContainer: {
        justifyContent: "center",
        height: 250,
    },
    splashContentContainer: {
        flex: 1,
        alignItems: "center",
        position: "relative",
        top: '10%',
        paddingTop: 40,
        borderRadius: 30,
        backgroundColor:colors.tertiary,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset : { width: 0, height: -4}
    },
    pageHeaderContainer: {
        paddingHorizontal: 15,
        backgroundColor: colors.skyblue_crayola,
        width: "100%",
        height: "20%",
    },
    pageHeading_text: {
        fontSize: 34,
        fontWeight: "600",
        color: 'white',
        fontFamily: 'Nunito-Bold'
    },
    pageSubheading_text: {
        fontSize: 24,
        fontWeight: "600",
        color: 'white',
        fontFamily: 'Nunito-SemiBold'
    },
    contentHeading_text: {
        fontSize: 34,
        fontWeight: '600',
        fontFamily: 'Nunito-ExtraBold',
        marginVertical: 5,
        color: 'black',
    },
    contentSubheading_text: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Nunito-Bold',
        color: 'black',
    },
    pageSectionContainer: {
        flex: 1,      
        marginTop:25,  
        paddingTop: 30,
        backgroundColor: colors.startup_purple,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    pageContentContainer: {
        height: '55%',
        marginHorizontal: 15
    },
    dashboardContentContainer: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "white",
        width: '100%',

        
    },
    stackedGreyContainer: {
        backgroundColor:colors.grey_lightest, 
        padding: 10, 
        borderRadius: 25,
        marginVertical: 20,
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
    submitButtonContainer: {
        flexDirection:'row',
        width: "90%",
        justifyContent: "flex-end",
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
        fontFamily: 'Nunito-Medium',
    }
}

export default elements
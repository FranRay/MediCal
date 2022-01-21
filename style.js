import {StyleSheet} from 'react-native'
import colors from './assets/colors/colors';

export default StyleSheet.create({
    backgroundImage: {
      width: "100%",
      height: "100%",
    },
    
    titleWrapper: {
      marginTop: 25,
      paddingLeft: 35,
    },
  
    title: {
      color: colors.textLight,
      fontSize: 36,
      fontFamily: 'DMSans-Bold',
    },
  
    subtitle: {
      marginTop: -3,
      color: colors.textLight,
      fontSize: 14,
      fontFamily: 'DMSans-Medium',
    },
  
    //modal styles--------------------------------------------------------------------
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    modalView: {
      width: 350,
      height: 440,
      backgroundColor: colors.primary,
      borderRadius: 25,
      shadowColor: colors.secondary,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      alignItems: "center",
      justifyContent: "center",
    },

    modalButton: {
      width: 150,
      borderRadius: 10,
      padding: 10,
    },

    modalButtonClose: {
      backgroundColor: colors.secondary,
    },

    textStyle: {
      color: colors.textLight,
      textAlign: "center",
      fontSize: 18,
      fontFamily: 'DMSans-Bold'
    },

    modalTitle: {
      marginBottom: 10,
      color: colors.textDark,
      textAlign: "center",
      fontFamily: 'DMSans-Bold',
      fontSize: 26,
    },

    modalLine: {
      width: 280,
      borderTopColor: colors.secondary,
      borderTopWidth: 3,
      paddingBottom: 20,
      marginBottom: 15
    },

    modalText: {
      paddingBottom: 35,
      color: colors.textDark,
      textAlign: "justify",
      fontSize: 14,
      fontFamily: 'DMSans-Medium',
      marginLeft: 40,
      marginRight: 40,
    },

    //home page styles--------------------------------------------------------------------
    homeImageContainer: {
        marginTop: 30,
        width: 335,
        height: 146,
        alignSelf: "center",
        alignContent: "center",
        flexDirection: 'row',
    },
    
    homeWrapper: {
      marginTop: 0,
      width: 335,
      height: 146,
      alignSelf: "center",
      alignContent: "center",
      flexDirection: 'row',
    },

    homeWrapper2: {
        marginTop: 30,
        width: 335,
        height: 146,
        alignSelf: "center",
        alignContent: "center",
        flexDirection: 'row',
    },

    homeImageWrapper: {
        marginRight: 30,
        width: 335,
        height: 150,
        borderRadius: 20,
        alignSelf: 'center',
    },

    homeButtonWrapper: {
        marginTop: 30,
        marginRight: 30,
        borderRadius: 20,
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.tertiary,
    },

    homeButtonWrapperHelp: {
        marginTop: 30,
        marginRight: 30,
        borderRadius: 20,
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
    },

    homeButtonText: {
        color: colors.textDark,
        fontSize: 18,
        fontFamily: 'DMSans-Medium',
        alignSelf: "center",
    },

    //page text styles---------------------------------------------------------------
    pageSubheading: {
        marginTop: 55,
        marginLeft: -10,
        color: colors.textLight,
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        alignSelf: 'center',
    },

    //page styles--------------------------------------------------------------------
    parentWrapper: {
      marginTop: 20,
      width: 340,
      height: 120,
      backgroundColor: colors.primary,
      borderRadius: 20,
      alignSelf: "center"
    },
  
    parentTitle: {
      fontSize: 18,
      fontFamily: 'DMSans-Medium',
      color: colors.textDark,
      paddingTop: 20,
      paddingLeft: 20,
    },

    bloodTypeButtonWrapper: {
        marginTop: 7,
        marginLeft: 32,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        width: 45,
        height: 45,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: colors.secondary,
    },
    
    bloodTypeButtonText: {
        fontSize: 18,
        color: colors.textLight,
        fontFamily: 'DMSans-Medium',
    },

    bloodTypeTouchableOpacity: {
      marginTop: 7,
      marginLeft: 32,
      borderRadius: 10,
      backgroundColor: colors.secondary,
      width: 45,
      height: 45,
      alignSelf: "center",
      alignItems: "center",
    },

    resultsPercentageWrapper: {
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },

    childTypeListWrapper: {
      width: 340,
      height: 80,
      backgroundColor: colors.primary,
      alignSelf: "center"
    },

    childTypeWrapper: {
        marginTop: 12,
        marginBottom: 4,
        marginLeft: 32,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        width: 45,
        height: 45,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: colors.secondary,
    },

    childTypeText: {
      fontSize: 18,
      color: colors.secondary,
      fontFamily: 'DMSans-Medium',
  },

    calculateButton: {
      marginTop: 30,
      borderRadius: 12,
      backgroundColor: colors.secondary,
      width: 150,
      height: 45,
      alignSelf: "center",
      alignItems: "center",
    },
  
    calculateButtonText: {
      fontSize: 18,
      fontFamily: 'DMSans-Medium',
      color: colors.textLight,
      paddingTop: 10,
    },
  
    resultsWrapper: {
      paddingTop: 80,
      alignSelf: "center",
    },
  
    resultsText: {
      fontSize: 14,
      fontFamily: 'DMSans-Medium',
      color: colors.textDark,
      paddingTop: 8,
    },

    resultsPercentage: {
      fontSize: 12,
      fontFamily: 'DMSans-Medium',
      marginLeft: 32,
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
    },


    
});
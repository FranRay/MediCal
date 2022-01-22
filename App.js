import React, { useState } from "react";

//import style files
import styles from "./style";
import colors from './assets/colors/colors';

//import data files
import BMI from './src/BMI';
import motherData from "./assets/data/motherData";
import fatherData from "./assets/data/fatherData";
import childData from "./assets/data/childData";

import SplashScreen from 'react-native-splash-screen'
import { Text, View, Image, ImageBackground, TouchableOpacity, FlatList, SafeAreaView, Modal, Pressable, TextInput} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }) => {
  //user input - name
  const [text, setName] = useState('');


  const [modalVisible, setModalVisible] = useState(true);

  return (
    <ImageBackground
      source={require("./assets/bgHome.png")}
      style={styles.backgroundImage}>

      {/* Modal */}
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>What would you like us to call you?</Text>
              
              <SafeAreaView>
                <TextInput 
                  style = {styles.modalTextInput}
                  placeholder = "Enter your name"
                  onChangeText = {newName => setName(newName)}
                  defaultValue = {text}
                />
              </SafeAreaView>

              <Pressable
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Continue</Text>
              </Pressable>

            </View>
          </View>
        </Modal>
      </View>

      {/* Header */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Hello {text}!</Text>
        <Text style={styles.subtitle}>Let's calculate with MediCal.</Text>
      </View>

      {/* Display Image */}
      <View style={styles.homeImageContainer}>
        <Image
          source={require("./assets/displayImg.png")}
          style={styles.homeImageWrapper}/>
      </View>
      
      {/* Help & Blood Type buttons */}
      <View style={styles.homeWrapper}>
          <TouchableOpacity 
            style={[styles.homeButtonWrapperHelp]}
            onPress={() => navigation.navigate('Help')}>
            <Image 
                source = {require("./assets/help.png")}
                style={styles.backgroundImage}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.homeButtonWrapper]}
            onPress={() => navigation.navigate('BloodType')} >
            <Image 
                source = {require("./assets/bloodtype.png")}
                style={styles.backgroundImage}/>
          </TouchableOpacity>
      </View>
      
      {/* Eye color & Hair Color buttons */}
      <View style={styles.homeWrapper2}>
          <TouchableOpacity 
            style={[styles.homeButtonWrapper]}
            onPress={() => navigation.navigate('BMI')} >
              <Image 
                source = {require("./assets/bmi.png")}
                style={styles.backgroundImage}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.homeButtonWrapper]}
            onPress={() => setModalVisible(!modalVisible)} >
            <Image 
                source = {require("./assets/notuser.png")}
                style={styles.backgroundImage}/>
          </TouchableOpacity>
      </View>

    </ImageBackground>
    
  );
};

const Help = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("./assets/bgHome.png")}
      style={styles.backgroundImage}>

      <View style={styles.helpTitle}>
        <Text style={styles.title}>Help</Text>
      </View>

      <View style = {styles.helpWrapper}>
        <Text style = {styles.helpText}>
          MediCal is a pocket BMI and blood type calculator.
            {'\n\n'}
          To use it, simply click on what you want to calculate - blood type or BMI - and enter values into the fields.
        </Text>
        <Pressable
          style={[styles.helpButton, styles.modalButtonClose]}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textStyle}>Back</Text>
        </Pressable>
      </View>

      <View>
        
      </View>

      
    </ImageBackground>
    
  );
};

const BloodType = ({ navigation }) => {
   //percentage
   var O = 0
   var A = 0
   var B = 0
   var AB = 0
 
   const [userInputMother, setUserInputMother] = useState(' ');
   const [userInputFather, setUserInputFather] = useState(' ');
   const [forceRender, setForceRender] = useState(true);
 
   {/* Function: Display Results */}
   const displayResults = () => {
     //percentages
     childData[0].percentage = O
     childData[1].percentage = A
     childData[2].percentage = B
     childData[3].percentage = AB
 
     //if O percentage > 0, change wrap color
     if (O != "0%") {
       childData[0].selected = true
     }
     else {
       childData[0].selected = false
     }
     
     //if A percentage > 0, change wrap color
     if (A != "0%") {
       childData[1].selected = true
     }
     else {
       childData[1].selected = false
     }
 
     //if B percentage > 0, change wrap color
     if (B != "0%") {
       childData[2].selected = true
     }
     else {
       childData[2].selected = false
     }
 
     //if AB percentage > 0, change wrap color
     if (AB != "0%") {
       childData[3].selected = true
     }
     else {
       childData[3].selected = false
     }
   }
 
   {/* Function: Results Display */}
   const calculate = () => {
     setForceRender(!forceRender); // Changing this state forces the results to update
 
     if ((userInputMother == '') && (userInputFather == '')){
       alert("No Input has been selected.")
     }
 
     //same bloodtypes
     else if ((userInputMother == 'A') && (userInputFather == 'A')){
       O = "6.25%"
       A = "93.75%"
       B = "0%"
       AB = "0%"
       displayResults();
     }
 
     else if ((userInputMother == 'B') && (userInputFather == 'B')){
       O = "6.25%"
       A = "0%"
       B = "93.75%"
       AB = "0%"
       displayResults();
     }
 
     else if ((userInputMother == 'AB') && (userInputFather == 'AB')){
       O = "0%"
       A = "25%"
       B = "25%"
       AB = "50%"
       displayResults();
     }
 
     else if ((userInputMother == 'O') && (userInputFather == 'O')){
       O = "100%"
       A = "0%"
       B = "0%"
       AB = "0%"
       displayResults();
     }
 
     //different bloodtypes
     else if ((userInputMother == 'A') || (userInputFather == 'A')){
       if ((userInputMother == 'O') || (userInputFather == 'O')){
         O = "25%"
         A = "75%"
         B = "0%"
         AB = "0%"
         displayResults();
       }
 
       else if ((userInputMother == 'B') || (userInputFather == 'B')){
         O = "6.25%"
         A = "18.75%"
         B = "18.75%"
         AB = "56.25%"
         displayResults();
       }
 
       else if ((userInputMother == 'AB') || (userInputFather == 'AB')){
         O = "0%"
         A = "50%"
         B = "12.5%"
         AB = "37.5%"
         displayResults();
       }
     }
 
     else if ((userInputMother == 'B') || (userInputFather == 'B')){
       if ((userInputMother == 'O') || (userInputFather == 'O')){
         O = "25%"
         A = "0%"
         B = "75%"
         AB = "0%"
         displayResults();
       }
       else if ((userInputMother == 'AB') || (userInputFather == 'AB')){
         O = "0%"
         A = "12.5%"
         B = "50%"
         AB = "37.5%"
         displayResults();
       }
     }
 
     else if ((userInputMother == 'AB') || (userInputFather == 'AB')){
       if ((userInputMother == 'O') || (userInputFather == 'O')){
         O = "0%"
         A = "50%"
         B = "50%"
         AB = "0%"
         displayResults();
       }
     }
 
     return O, A, B, AB;
   } 
 
   {/* Buttons */}
   const ItemButton = ({ item, onPress, backgroundColor, textColor }) => (
     <TouchableOpacity onPress={onPress} style={[styles.bloodTypeButtonWrapper, backgroundColor]}>
       <Text style={[styles.bloodTypeButtonText, textColor]}>{item.title}</Text>
     </TouchableOpacity>
   );
 
   {/* Button useStates */}
   const [selectedMotherId, setSelectedMotherId] = useState(null);
   const [selectedFatherId, setSelectedFatherId] = useState(null);
 
   {/* Button: Mother's Blood Type */}
   const renderMotherData = ({ item }) => {
     const backgroundColor = item.id === selectedMotherId ? colors.secondary : colors.primary;
     const color = item.id === selectedMotherId ? colors.primary : colors.secondary;
     
     return (
         <ItemButton
           item={item}
           onPress={() => {
             setSelectedMotherId(item.id)
             setUserInputMother(item.title);
           }}
           backgroundColor={{ backgroundColor }}
           textColor={{ color }}
       />
     );
   };
 
   {/* Button: Father's Blood Type */}
   const renderFatherData = ({ item }) => {
     const backgroundColor = item.id === selectedFatherId ? colors.secondary : colors.primary;
     const color = item.id === selectedFatherId ? colors.primary : colors.secondary;
     
     return (
         <ItemButton
           item={item}
           onPress={() => {
             setSelectedFatherId(item.id)
             setUserInputFather(item.title);
           }}
           backgroundColor={{ backgroundColor }}
           textColor={{ color }}
       />
     );
   };
 
   {/* Results: Child's Blood Type */}
   const renderChildData = ({ item }) => {
     return (
       <View style={styles.resultsPercentageWrapper}>
       <View style={[styles.childTypeWrapper, 
         { backgroundColor: item.selected ? colors.secondary : colors.primary },
       ]}>
         <Text style={[styles.childTypeText, {
           color: item.selected ? colors.primary : colors.secondary
           }
         ]}> {item.title} </Text>
       </View>
         <Text style={styles.resultsPercentage}>{item.percentage}</Text>
       </View>
     );
   };

  return (
    //UI Styling
    <ImageBackground
      source={require("./assets/bg.png")}
      style={styles.backgroundImage}>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButtonWrap}
        onPress={() => navigation.navigate('Home')} >
        <Image
        source={require("./assets/back.png")}>
        </Image>
      </TouchableOpacity>

      {/* Header */}
      <View>
        <Text style={styles.pageSubheading}>Let's calculate your bloodtype.</Text>
      </View>

      {/* Mother Card */}
      <View style={[styles.parentWrapper, styles.boxShadow]}>
        <Text style={styles.parentTitle}>Mother</Text>
        <View style={styles.typeListWrapper}>
          <FlatList
            data={motherData}
            renderItem={renderMotherData}
            keyExtractor={(item) => item.id}
            extraData={selectedMotherId}
            horizontal={true}
          />
        </View>
      </View>

      {/* Father Card */}
      <View style={[styles.parentWrapper, styles.boxShadow]}>
        <Text style={styles.parentTitle}>Father</Text>
        <View style={styles.typeListWrapper}>
          <FlatList
            data={fatherData}
            renderItem={renderFatherData}
            keyExtractor={(item) => item.id}
            extraData={selectedFatherId}
            horizontal={true}
          />
        </View>
      </View>

      {/* Calculate Button */}
      <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculate}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>

      {/* Results */}
      <View style={styles.resultsWrapper}>
        <Text style={styles.resultsText}>Your child can have any of these possible bloodtypes:</Text>
        <View style={styles.resultsListWrapper}>
          <SafeAreaView>
            <FlatList
              data={childData}
              renderItem={renderChildData}
              keyExtractor={(item) => item.id}
              horizontal={true}
              extraData={forceRender} // Re-renders when this state is updated
            />
          </SafeAreaView>
        </View>
        {/* <Text>Father bloodtype: {userInputFather} Mother bloodtype: {userInputMother}</Text> */}
      </View>
    </ImageBackground>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
   return (
    SplashScreen.hide(),

      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown:false}}
              />
              <Stack.Screen
                name="Help"
                component={Help}
                options={{headerShown:false}}
              />
              <Stack.Screen 
                name="BloodType" 
                component={BloodType}
                options={{headerShown:false}} 
              />
              <Stack.Screen 
                name="BMI" 
                component={BMI}
                options={{headerShown:false}} 
              />
          </Stack.Navigator>
        </NavigationContainer>
   );
}

{/* Drop Shadows */}
const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

generateBoxShadowStyle(0, 4, colors.secondary, 0.25, 16, 16, colors.secondary);
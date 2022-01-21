import React, { useEffect, useState } from "react";
import styles from "./style";
import colors from './assets/colors/colors';
import motherData from "./assets/data/motherData";
import fatherData from "./assets/data/fatherData";
import childData from "./assets/data/childData";
import SplashScreen from 'react-native-splash-screen'
import { Text, View, Image, ImageBackground, TouchableOpacity, FlatList, SafeAreaView, Alert, Modal, Pressable, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }) => {
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
              <Text style={styles.modalTitle}>Blood Type Calculator</Text>
              <View style={styles.modalLine}/>
              
              <Text style={styles.modalText}>
                This is an app that can predict or calculate someone's blood type.
                {'\n\n'}
                To use it, simply click on the blood type that matches the Mother and Father's blood types, and press calculate.
              </Text>

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
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>Let's predict your child's traits.</Text>
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
            onPress={() => { setModalVisible(!modalVisible); }}>
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
            onPress={() => navigation.navigate('EyeColor')} >
              <Image 
                source = {require("./assets/eyecolor.png")}
                style={styles.backgroundImage}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.homeButtonWrapper]}
            onPress={() => navigation.navigate('HairColor')} >
            <Image 
                source = {require("./assets/haircolor.png")}
                style={styles.backgroundImage}/>
          </TouchableOpacity>
      </View>

    </ImageBackground>
    
  );
};

const BloodType = ({ navigation, route }) => {
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
      
      {/* Header */}
      <View>
        <Text style={styles.pageSubheading}>Let's predict your child's bloodtype.</Text>
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
        <View style={styles.childTypeListWrapper}>
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

const EyeColor = ({ navigation, route }) => {
  //percentage
  var blue = 0
  var green = 0
  var brown = 0

  const [userInputMother, setUserInputMother] = useState(' ');
  const [userInputFather, setUserInputFather] = useState(' ');
  const [forceRender, setForceRender] = useState(true);

  return (
  <ImageBackground
      source={require("./assets/bg.png")}
      style={styles.backgroundImage}>
      
      {/* Header */}
      <View>
        <Text style={styles.pageSubheading}>Let's predict your child's eye color.</Text>
      </View>



  </ImageBackground>
  );
};

const HairColor = ({ navigation, route }) => {
  return (
  <ImageBackground
      source={require("./assets/bg.png")}
      style={styles.backgroundImage}>
      
      {/* Header */}
      <View>
        <Text style={styles.pageSubheading}>Let's predict your child's hair color.</Text>
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
                name="BloodType" 
                component={BloodType}
                options={{headerShown:false}} 
              />
              <Stack.Screen 
                name="EyeColor" 
                component={EyeColor}
                options={{headerShown:false}} 
              />
              <Stack.Screen 
                name="HairColor" 
                component={HairColor}
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
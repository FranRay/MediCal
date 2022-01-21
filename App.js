import React, { useState } from "react";

//import style files
import styles from "./style";
import colors from './assets/colors/colors';

//import data files
import motherData from "./assets/data/motherData";
import fatherData from "./assets/data/fatherData";
import childData from "./assets/data/childData";
import motherEye from "./assets/data/motherEye";
import fatherEye from "./assets/data/fatherEye";
import childEye from "./assets/data/childEye";
import motherHair from "./assets/data/motherHair";
import fatherHair from "./assets/data/fatherHair";
import childHair from "./assets/data/childHair";

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

const Help = ({ navigation, route }) => {
  return (
    <ImageBackground
      source={require("./assets/bgHome.png")}
      style={styles.backgroundImage}>

      <View style={styles.helpTitle}>
        <Text style={styles.title}>Help</Text>
      </View>

      <View style = {styles.helpWrapper}>
        <Text style = {styles.helpText}>
          This is an app that can predict an unborn child traits, such as their blood type, eye color, hair color.
            {'\n\n'}
          To use it, simply click the trait that you would like to predict, then select the options that matches the Mother and Father, and press calculate.
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

const EyeColor = ({ navigation, route }) => {
  //percentage
  var blue = 0
  var green = 0
  var brown = 0

  const [userInputMother, setUserInputMother] = useState(' ');
  const [userInputFather, setUserInputFather] = useState(' ');
  const [forceRender, setForceRender] = useState(true);

  {/* Function: Percentage Change */}
  const displayPercentage = () => {
    childEye[0].percentage = blue
    childEye[1].percentage = green
    childEye[2].percentage = brown

    //if result percentage > 0, wrap color
    if (blue != "0%") {
      childEye[0].selected = true
    }
    else {
      childEye[0].selected = false
    }

    if (green != "0%") {
      childEye[1].selected = true
    }
    else {
      childEye[1].selected = false
    }

    if (brown != "0%") {
      childEye[2].selected = true
    }
    else {
      childEye[2].selected = false
    }
  }

  {/* Function: Display Results */}
  const calculate = () => {
    setForceRender(!forceRender); // Changing this state forces the results to update
    
    if ((userInputMother == '') && (userInputFather == '')){
      alert("No Input has been selected.")
    }

    //same eye colors
    else if ((userInputMother == 'Blue') && (userInputFather == 'Blue')) {
      blue = "99%"
      green = "1%"
      brown = "0%"
      displayPercentage();
    }

    else if ((userInputMother == 'Green') && (userInputFather == 'Green')) {
      blue = "24%"
      green = "75%"
      brown = "1%"
      displayPercentage();
    }

    else if ((userInputMother == 'Brown') && (userInputFather == 'Brown')) {
      blue = "6.25%"
      green = "18.75%"
      brown = "75%"
      displayPercentage();
    }

    //different eye colors
    else if ((userInputMother == 'Blue') || (userInputFather == 'Blue')) {
      if ((userInputMother == 'Green') || (userInputFather == 'Green')){
        blue = "50%"
        green = "50%"
        brown = "0%"
        displayPercentage();
      }

      else if ((userInputMother == 'Brown') || (userInputFather == 'Brown')){
        blue = "50%"
        green = "0%"
        brown = "50%"
        displayPercentage();
      }
    }

    else if ((userInputMother == 'Green') || (userInputFather == 'Green')) {
      if ((userInputMother == 'Brown') || (userInputFather == 'Brown')){
        blue = "12.5%"
        green = "37.5%"
        brown = "50%"
        displayPercentage();
      }
    }

    return blue, green, brown;
  }

  {/* Buttons */}
  const ItemButton = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.eyeButtonWrapper, backgroundColor]}>
      <Text style={[styles.eyeButtonText, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  {/* Button useStates */}
  const [selectedMotherId, setSelectedMotherId] = useState(null);
  const [selectedFatherId, setSelectedFatherId] = useState(null);

  {/* Button: Mother's Eye Color */}
  const renderMotherEye = ({ item }) => {
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

  {/* Button: Father's Eye Color */}
  const renderFatherEye = ({ item }) => {
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

  {/* Results: Child's Eye Color */}
  const renderChildEye = ({ item }) => {
    return (
      <View style={styles.resultsPercentageWrapper}>
      <View style={[styles.childEyeWrapper, 
        { backgroundColor: item.selected ? colors.secondary : colors.primary },
      ]}>
        <Text style={[styles.childEyeText, {
          color: item.selected ? colors.primary : colors.secondary
          }
        ]}> {item.title} </Text>
      </View>
        <Text style={styles.eyePercentage}>{item.percentage}</Text>
      </View>
    );
  };

  return (
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
        <Text style={styles.pageSubheading}>Let's predict your child's eye color.</Text>
      </View>

      {/* Mother Card */}
      <View style={[styles.parentWrapper, styles.boxShadow]}>
        <Text style={styles.parentTitle}>Mother</Text>
        <View style={styles.typeListWrapper}>
          <FlatList
            data={motherEye}
            renderItem={renderMotherEye}
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
            data={fatherEye}
            renderItem={renderFatherEye}
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
        <Text style={styles.resultsText}>Your child can have any of these possible eye colors:</Text>
        <View style={styles.resultsListWrapper}>
          <SafeAreaView>
            <FlatList
              data={childEye}
              renderItem={renderChildEye}
              keyExtractor={(item) => item.id}
              horizontal={true}
              extraData={forceRender} // Re-renders when this state is updated
            />
          </SafeAreaView>
        </View>
      </View>

  </ImageBackground>
  );
};

const HairColor = ({ navigation, route }) => {
  //percentage
  var black = 0
  var brown = 0
  var red = 0
  var strawberry = 0
  var blond = 0

  const [userInputMother, setUserInputMother] = useState(' ');
  const [userInputFather, setUserInputFather] = useState(' ');
  const [forceRender, setForceRender] = useState(true);

  {/* Function: Percentage Change */}
  const displayPercentage = () => {
    childHair[0].percentage = black
    childHair[1].percentage = brown
    childHair[2].percentage = red
    childHair[3].percentage = strawberry
    childHair[4].percentage = blond

    //if result percentage > 0, change wrap color
    if (black != "0%") {
      childHair[0].selected = true
    }
    else  {
      childHair[0].selected = false
    }

    if (brown != "0%") {
      childHair[1].selected = true
    }
    else  {
      childHair[1].selected = false
    }

    if (red != "0%") {
      childHair[2].selected = true
    }
    else  {
      childHair[2].selected = false
    }
    
    if (strawberry != "0%") {
      childHair[3].selected = true
    }
    else  {
      childHair[3].selected = false
    }

    if (blond != "0%") {
      childHair[4].selected = true
    }
    else  {
      childHair[4].selected = false
    }
  }

  {/* Function: Display Results */}
  const calculate = () => {
    setForceRender(!forceRender); // Changing this state forces the results to update

    if ((userInputMother == '') && (userInputFather == '')){
      alert("No Input has been selected.")
    }

    //same hair colors
    else if ((userInputMother == 'Black') && (userInputFather == 'Black')){
      black = "100%"
      brown = "0%"
      red = "0%"
      strawberry = "0%"
      blond = "0%"
      displayPercentage();
    }

    else if ((userInputMother == 'Brown') && (userInputFather == 'Brown')){
      black = "25%"
      brown = "50%"
      red = "3%"
      strawberry = "11%"
      blond = "12%"
      displayPercentage();
    }

    else if ((userInputMother == 'Red') && (userInputFather == 'Red')){
      black = "0%"
      brown = "0%"
      red = "100%"
      strawberry = "0%"
      blond = "0%"
      displayPercentage();
    }

    else if ((userInputMother == 'Strawberry') && (userInputFather == 'Strawberry')){
      black = "0%"
      brown = "0%"
      red = "25%"
      strawberry = "50%"
      blond = "25%"
      displayPercentage();
    }

    else if ((userInputMother == 'Blond') && (userInputFather == 'Blond')){
      black = "0%"
      brown = "0%"
      red = "25%"
      strawberry = "50%"
      blond = "25%"
      displayPercentage();
    }
    
    else if ((userInputMother == 'Black') || (userInputFather == 'Black')) {
      if ((userInputMother == 'Brown') || (userInputFather == 'Brown')) {
        black = "50%"
        brown = "50%"
        red = "0%"
        strawberry = "0%"
        blond = "0%"
        displayPercentage();
      }

      if ((userInputMother == 'Red' || 'Strawberry' || 'Blond') || (userInputFather == 'Red' || 'Strawberry' || 'Blond')) {
        black = "0%"
        brown = "100%"
        red = "0%"
        strawberry = "0%"
        blond = "0%"
        displayPercentage();
      }
    }

    else if ((userInputMother == 'Brown') || (userInputFather == 'Brown')) {
      if ((userInputMother == 'Red') || (userInputFather == 'Red')) {
        black = "0%"
        brown = "50%"
        red = "16%"
        strawberry = "34%"
        blond = "0%"
        displayPercentage();
      }

      if ((userInputMother == 'Strawberry') || (userInputFather == 'Strawberry')) {
        black = "0%"
        brown = "50%"
        red = "8%"
        strawberry = "25%"
        blond = "17%"
        displayPercentage();
      }

      if ((userInputMother == 'Blond') || (userInputFather == 'Blond')) {
        black = "0%"
        brown = "50%"
        red = "0%"
        strawberry = "16%"
        blond = "34%"
        displayPercentage();
      }
    }

    else if ((userInputMother == 'Red') || (userInputFather == 'Red')) {
      if ((userInputMother == 'Strawberry') || (userInputFather == 'Strawberry')) {
        black = "0%"
        brown = "0%"
        red = "50%"
        strawberry = "50%"
        blond = "0%"
        displayPercentage();
      }

      if ((userInputMother == 'Blond') || (userInputFather == 'Blond')) {
        black = "0%"
        brown = "0%"
        red = "0%"
        strawberry = "100%"
        blond = "0%"
        displayPercentage();
      }
    }

    else if ((userInputMother == 'Strawberry') || (userInputFather == 'Strawberry')) {
      if ((userInputMother == 'Blond') || (userInputFather == 'Blond')) {
        black = "0%"
        brown = "0%"
        red = "0%"
        strawberry = "50%"
        blond = "50%"
        displayPercentage();
      }
    }
  }

  {/* Buttons */}
  const ItemButton = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.hairButtonWrapper, backgroundColor]}>
      <Text style={[styles.hairButtonText, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  {/* Button useStates */}
  const [selectedMotherId, setSelectedMotherId] = useState(null);
  const [selectedFatherId, setSelectedFatherId] = useState(null);

  {/* Button: Mother's Hair Color */}
  const renderMotherHair = ({ item }) => {
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

  {/* Button: Father's Hair Color */}
  const renderFatherHair = ({ item }) => {
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

  {/* Results: Child's Hair Color */}
  const renderChildHair = ({ item }) => {
    return (
      <View style={styles.resultsPercentageWrapper}>
      <View style={[styles.childHairWrapper, 
        { backgroundColor: item.selected ? colors.secondary : colors.primary },
      ]}>
        <Text style={[styles.childHairText, {
          color: item.selected ? colors.primary : colors.secondary
          }
        ]}> {item.title} </Text>
      </View>
        <Text style={styles.hairPercentage}>{item.percentage}</Text>
      </View>
    );
  };

  return (
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
        <Text style={styles.pageSubheading}>Let's predict your child's hair color.</Text>
      </View>

      {/* Mother Card */}
      <View style={[styles.parentWrapper, styles.boxShadow]}>
        <Text style={styles.parentTitle}>Mother</Text>
        <View style={styles.typeListWrapper}>
          <FlatList
            data={motherHair}
            renderItem={renderMotherHair}
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
            data={fatherHair}
            renderItem={renderFatherHair}
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
        <Text style={styles.resultsText}>Your child can have any of these possible eye colors:</Text>
        <View style={styles.resultsListWrapper}>
          <SafeAreaView>
            <FlatList
              data={childHair}
              renderItem={renderChildHair}
              keyExtractor={(item) => item.id}
              horizontal={true}
              extraData={forceRender} // Re-renders when this state is updated
            />
          </SafeAreaView>
        </View>
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
import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ImageBackground, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default class App extends React.Component {
  state = {
    height: 0,
    weight: 0,
    resultNumber: 0,
    resultText: ""
  };

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  handleBackButtonClick() {
      this.props.navigation.goBack(null);
      return true;
  }

  handleCalculate = () => {
    let imc = (this.state.weight) / (this.state.height) / (this.state.height) * 10000;
    this.setState({
      resultNumber: imc.toFixed(2)
    });

    if (imc < 18.5) {
      this.setState({ resultText: "Underweight" });
    } else if (imc > 18.5 && imc < 25) {
      this.setState({ resultText: "Normal Weight" });
    } else if (imc >= 25 && imc < 30) {
      this.setState({ resultText: "Overweight" });
    } else {
      this.setState({ resultText: "Obesity" });
    }
  };

  render() {
    return (
      
      <ImageBackground
        source={require("../assets/bg.png")}
        style={styles.backgroundImage}>

        {/* Back Button */}
        <TouchableOpacity
            style={styles.backButtonWrap}
            onPress= {this.handleBackButtonClick}>
            <Image
            source={require("../assets/back.png")}>
            </Image>
        </TouchableOpacity>

        {/* Header */}
        <View>
          <Text style={styles.pageSubheading}>Let's calculate your BMI.</Text>
        </View>

        {/* Height Card */}
        <View style={[styles.parentWrapper, styles.boxShadow]}>
          <Text style={styles.parentTitle}>Height</Text>
          <View>
            <SafeAreaView>
                  <TextInput
                    style = {styles.bmiTextInput}
                    placeholder = "Enter your height"
                    keyboardType="numeric"
                    onChangeText = {height => {
                      this.setState({ height });
                    }}
                  />
            </SafeAreaView>
          </View>
        </View>

        {/* Mass Card */}
        <View style={[styles.parentWrapper, styles.boxShadow]}>
          <Text style={styles.parentTitle}>Mass</Text>
          <View>
            <SafeAreaView>
                  <TextInput
                    style = {styles.bmiTextInput}
                    placeholder = "Enter your mass"
                    keyboardType="numeric"
                    onChangeText={weight => {
                      this.setState({ weight });
                    }}
                  />
            </SafeAreaView>
          </View>
        </View>

        {/* Calculate Button */}
        <TouchableOpacity
            style={styles.calculateButton}
            onPress={this.handleCalculate}>
            <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        {/* Results */}
        <View style={styles.resultsWrapper}>
          <Text style={styles.resultsText}>Your BMI result:</Text>
          <View style={styles.resultsListWrapper}>
            <SafeAreaView style={styles.resultsInfoNum}>
              <View style={styles.resultsNumWrapper}>
                <Text style={styles.resultsNum}>{this.state.resultNumber}</Text>
              </View>
              <View style={styles.resultsInfoWrapper}>
                <Text style={styles.resultsInfo}>{this.state.resultText}</Text>
              </View>
            </SafeAreaView>
          </View>
        </View>
        </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },

  backButtonWrap: {
    marginLeft: 20,
    marginTop: 30,
    width: 30,
    height: 30,
 },

 pageSubheading: {
    marginTop: 5,
    marginLeft: -10,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    alignSelf: 'center',
  },

  parentWrapper: {
    marginTop: 20,
    width: 340,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignSelf: "center"
  },

  parentTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-Medium',
    color: '#14312E',
    paddingTop: 20,
    paddingLeft: 20,
  },

  bmiTextInput: {
    width: 300,
    height: 40,
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    alignSelf: "center",
    justifyContent: 'center',
    marginTop: 15,
    paddingLeft: 20,
    color: '#14312E',
    backgroundColor: '#F2F5F4',
    borderRadius: 10,
  },

  calculateButton: {
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: '#5CC6BA',
    width: 150,
    height: 45,
    alignSelf: "center",
    alignItems: "center",
  },

  calculateButtonText: {
    fontSize: 18,
    fontFamily: 'DMSans-Medium',
    color: '#FFFFFF',
    paddingTop: 10,
  },

  resultsWrapper: {
    paddingTop: 80,
    alignSelf: "center",
  },

  resultsText: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#14312E',
    paddingTop: 8,
  },

  resultsNumWrapper: {
    width: 140,
    height: 90,
  },

  resultsNum: {
    fontSize: 64,
    fontFamily: 'DMSans-Bold',
    color: '#14312E',
    paddingLeft: 20,
  },

  resultsInfoWrapper: {
    width: 150,
    height: 50,
    backgroundColor: '#5CC6BA',
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    marginTop: 15,
    borderRadius: 10,
  },

  resultsInfo: {
    fontSize: 18,
    fontFamily: 'DMSans-Medium',
    color: '#FFFFFF',
  },

  resultsListWrapper: {
    width: 340,
    height: 80,
    backgroundColor: '#FFFFFF',
    alignSelf: "center"
  },

  resultsInfoNum: {
    flexDirection: 'row',
  }

});
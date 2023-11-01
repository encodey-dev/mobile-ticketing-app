import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image,  TextInput, Alert} from 'react-native';


import auth from "@react-native-firebase/auth"

const SignUpScreen = ( {navigation} ) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  
  const staticImageLogo = require("../assets/logo.png");

        
    

    signUpAction= async () => {  
      if (!email || email.length <= 0) 
      {
        Alert.alert("Please enter an email");  
        return ;
      }

      if (!password || password.length <= 0) 
      {
        Alert.alert("Please enter a password");  
        return ;
      }



      try {
        let response = await auth().createUserWithEmailAndPassword(email, password)
        if (response && response.user) {
          Alert.alert("Success ✅", "Account created successfully");
          setEmail(null);
          setPassword(null);
          navigation.navigate("App_to_Home");
        }
      } catch (e) {
        console.log(e.message);
        Alert.alert("Error ✅", "Unable to create Account");
      }
   

    }
    
    return (
      <View style={styles.mainView}>

        <Image source={staticImageLogo}   style={styles.logo}/>
       
      
        <View style={styles.mainView}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
              />

              <TouchableOpacity
                                style={styles.touchableView}
                                onPress={this.signUpAction.bind(this)}
                                  >
                           <Text style={styles.touchableText}>Sign Up</Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("App_to_Home")}}>
                  <View>
                    <Text style={styles.touchableLink}>Already have account? Log In</Text>
                  </View>
              </TouchableOpacity>

          </View>

      </View>
    )
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableView: {
    marginBottom: 30,
    width: 350,
    height: 50,
    alignItems: 'center',
    backgroundColor: '#065b9b',
    borderWidth: 5,
    borderRadius: 10,
  },
  touchableText: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  logo: {
    width: 350,
    height: 58,
    marginBottom: 30,
  },
  textInput: {
    marginBottom: 30,
    width: 350,
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },

  touchableLink: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'blue'
  },
});

export default SignUpScreen;
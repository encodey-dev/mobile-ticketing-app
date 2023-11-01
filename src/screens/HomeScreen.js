import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image,  TextInput, Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import auth, { firebase } from "@react-native-firebase/auth"

const HomeScreen = ( {navigation} ) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userLogin, setuserLogin] = useState(null);

  const staticImageLogo = require("../assets/logo.png");

  const USER_KEY = 'USER_KEY';
  const MIFARE_KEY = 'MIFARE_KEY';
  const RIDERCLASS_KEY = 'RIDERCLASS_KEY';

    useEffect(() => {
      getLogin();

    }, []);

    const getLogin = async () => {

      let user = firebase.auth().currentUser;
      if (user) {
        console.log(user);

        let userEmail = firebase.auth().currentUser.email ;
        setuserLogin(userEmail);

      } else {
        setuserLogin(null);
      }

    }

    logoutAction= async () => {  
      await EncryptedStorage.setItem(USER_KEY, null);
      await EncryptedStorage.setItem(MIFARE_KEY, null);
      await EncryptedStorage.setItem(RIDERCLASS_KEY,null);

      try {
        let response = await auth().signOut()
        if (response && response.user) {
          Alert.alert("Success ✅", "Authenticated successfully")
        }
      } catch (e) {
        console.error(e.message)
      }

      setuserLogin(null);
      setEmail(null);
      setPassword(null);
    }

    loginAction= async () => {  
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
        let response = await auth().signInWithEmailAndPassword(email, password)
        if (response && response.user) {
          await EncryptedStorage.setItem(USER_KEY, email);
          setuserLogin(email);
        }
      } catch (e) {
        console.log(e.message);
        Alert.alert("Error ✅", "Unable to authenticated");
      }
   

    }
    
    return (
      <View style={styles.mainView}>

        <Image source={staticImageLogo}   style={styles.logo}/>
       
      

        {userLogin  ? (
            <View style={styles.mainView}>

              

              <TouchableOpacity
                style={styles.touchableView}
                onPress={() => {
                  navigation.navigate("AvailableMobileScreen" )}}>
                  <View>
                    <Text style={styles.touchableText}>Mobile Passes</Text>
                  </View>
              </TouchableOpacity>
                  


              <TouchableOpacity
                style={styles.touchableView}
                onPress={() => {
                  navigation.navigate("MifareCardScreen")}}>
                  <View>
                    <Text style={styles.touchableText}>Mifare Card</Text>
                  </View>
              </TouchableOpacity>

    

          </View>
        ): 
        (      
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
                                onPress={this.loginAction.bind(this)}
                                  >
                           <Text style={styles.touchableText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUpScreen")}}>
                  <View>
                    <Text  style={styles.touchableLink}>New? Create account</Text>
                  </View>
              </TouchableOpacity>


          </View>
        )}

        { userLogin && (
            <TouchableOpacity
            style={styles.touchableView}
            onPress={this.logoutAction.bind(this)}
              >
            <Text style={styles.touchableText}>Logout</Text>
            </TouchableOpacity>
        )}

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

export default HomeScreen;
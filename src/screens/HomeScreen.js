import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image,  TextInput, Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const HomeScreen = ( {navigation} ) => {

  const [email, setEmail] = useState(null);
  const [userLogin, setuserLogin] = useState(null);

  const staticImageLogo = require("../assets/logo.png");

  const USER_KEY = 'USER_KEY';
  const MIFARE_KEY = 'MIFARE_KEY';
  const RIDERCLASS_KEY = 'RIDERCLASS_KEY';

    useEffect(() => {
      getLogin();

    }, []);

    const getLogin = async () => {
      const loginUser = await EncryptedStorage.getItem(USER_KEY);
      if (!(loginUser == null)) {
        setuserLogin(loginUser);
      }

    }

    logoutAction= async () => {  
      await EncryptedStorage.setItem(USER_KEY, null);
      await EncryptedStorage.setItem(MIFARE_KEY, null);
      await EncryptedStorage.setItem(RIDERCLASS_KEY,null);

      setuserLogin(null);
      setEmail(null);
    }

    loginAction= async () => {  
      if (!email || email.length <= 0) 
      {
        Alert.alert("Please enter an email");  
        return ;
      }

      await EncryptedStorage.setItem(USER_KEY, email);
      setuserLogin(email);

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

              <TouchableOpacity
                                style={styles.touchableView}
                                onPress={this.loginAction.bind(this)}
                                  >
                           <Text style={styles.touchableText}>Login</Text>
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
});

export default HomeScreen;
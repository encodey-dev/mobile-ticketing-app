import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image,  TextInput, Alert} from 'react-native';


import {setPurchase} from '../core/setPurchase';
import styles from '../core/ticketsStyle';

const MifareCashValueScreen = ( {navigation, route} ) => {


  const staticImageLogo = require("../assets/logo.png");

   const [value, setValue] = useState(null);
   const [purchaseDetails, setPurchaseDetails] = useState(null);

    useEffect(() => {
        setPurchaseDetails(route.params.purchaseDetails)
    }, []);

    enterValueClick= async () => {  

        var numberAsInt = parseInt(value);  
        console.log(numberAsInt);

        if (numberAsInt <= 0 || value == null) 
        {
          Alert.alert("Please enter a value greater that zero");  
          return ;
        }
  
        var requestBody = JSON.stringify({
            "ProductId": purchaseDetails.ProductId,
            "CustomerID": purchaseDetails.CustomerID,
            "NfcCardID" : purchaseDetails.NfcCardID,
            "StoreValue" : value
        });

      
        navigation.navigate("CheckoutScreen", {requestParameter: {
          bodyPurchaseApi: requestBody,
          shortDescription: purchaseDetails.shortDescription, 
          unitPrice: value.toString() , 
          purchaseType : "Card " + purchaseDetails.NfcCardID
        }});
  
     }
    
    return (
      <View style={styles.mainView}>

        <Image source={staticImageLogo}   style={styles.logo}/>
        { purchaseDetails && (
           <Text style={localstyles.cardText}>Load {purchaseDetails.NfcCardID}</Text>
        )}

        <View style={styles.mainView}>
              <TextInput
                keyboardType='numeric'
                style={localstyles.textInput}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(enterValue) => setValue(enterValue)}
              />

              <TouchableOpacity
                                style={styles.touchableView}
                                onPress={this.enterValueClick.bind(this)}
                                  >
                           <Text style={styles.touchableText}>Enter Value</Text>
              </TouchableOpacity>

          </View>


      </View>
    )
};

const localstyles = StyleSheet.create({
  textInput: {
    marginBottom: 30,
    width: 350,
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  cardText: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#065b9b'
  },
});

export default MifareCashValueScreen;
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image,  TextInput, Alert} from 'react-native';

import styles from '../core/ticketsStyle';
import {setPurchase} from '../core/setPurchase';
import {validateCreditCard} from '../core/validateCreditCard';
import { TextInputMask } from 'react-native-masked-text'


const CheckoutScreen = ( {navigation, route} ) => {

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [requestSent, setRequestSent] = useState('');

  const staticImageLogo = require("../assets/logo.png");

    useEffect(() => {
      setRequestSent(route.params.requestParameter);
    }, []);


    clickAction = async () => {  

        var requestPayment = {
          name: name,
          cardNumber: cardNumber,
          expiration: expiration,
          cvv: cvv,
        };

        let paymentresponse =await validateCreditCard(requestPayment);

        if (!paymentresponse)
        { 
           return ;
        }

        let response =await setPurchase(requestSent.bodyPurchaseApi);

      
   

        if (response)
        {
            try {

                if (requestSent.purchaseType == "Mobile")
                {
                  navigation.navigate("AvailableMobileScreen");
                }
                else
                {
                  navigation.navigate("MifareCardScreen");
                }
              
              } catch (error) {
                console.log(error);
          
              }
        }
        

    }
    
    return (
      <View style={styles.mainView}>

        <Image source={staticImageLogo}   style={styles.logo}/>

        <View style={styles.mainView}>

        <Text style={[styles.textField, localstyles.textBigFont]}>
                {requestSent.purchaseType}
        </Text>

        <View style={styles.row}>
            <Text style={[styles.textField, localstyles.textWithMargin,localstyles.textBigFont]}>
                {requestSent.shortDescription}
            </Text>
            <Text style={[styles.textField,localstyles.textBigFont ]}>
                  ${requestSent.unitPrice}
            </Text>
         </View>

       
         <TextInput
            style={styles.textInput}
            placeholder="Cardholder Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />

           <TextInputMask
                type={'credit-card'}
               value={cardNumber}
               placeholder="Card Number"
               options={{
                obfuscated: false
              }}
               keyboardType='numeric'
              style={styles.textInput}
                onChangeText={(text) => setCardNumber(text)}
            />



          <View style={localstyles.row}>

           <TextInputMask
              type={'datetime'}
              value={expiration}
              placeholder="MM/YY"
              options={{ format: 'MM/YY' }}
              keyboardType='numeric'
              style={localstyles.textField}
              onChangeText={(text) => setExpiration(text)}
            />


          <TextInputMask
              type='custom'
              value={cvv}
              placeholder="Security Code"
              options={{ mask: '9999' }}
              keyboardType='numeric'
              style={localstyles.textField}
              onChangeText={(text) => setCvv(text)}

            />
            


          </View>


           <TouchableOpacity
             style={styles.touchableView}
             onPress={this.clickAction}>
                <Text style={styles.touchableText}>Pay</Text>
           </TouchableOpacity>

        </View>
      

      </View>
    )
};

const localstyles = StyleSheet.create({
   row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 36,
  },
  textField: {
    marginBottom: 30,
    width: 150,
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
  },
  textWithMargin : {
    marginRight: 24
  },
  textBigFont : {
    fontSize: 25, textAlign: 'center'
  }

});

export default CheckoutScreen;
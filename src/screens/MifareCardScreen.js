import React, {useEffect, useState} from 'react';
import { View, Text,  FlatList, Alert, SafeAreaView , TouchableOpacity,ImageBackground, Image, TextInput, StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {getToken} from '../core/getToken';
import styles from '../core/ticketsStyle';
import {getProducts} from '../core/products';
import {getMifareData} from '../core/mifare';


const MifareCardScreen = ( {navigation, route} ) => {
    const [products, setProducts] = useState(null);
    const [mifareCard, setMifareCard] = useState(null);
    const [userLogin, setuserLogin] = useState(null);
    const [inputCard, setInputCard] = useState(null);
    
    const USER_KEY = 'USER_KEY';
    const MIFARE_KEY = 'MIFARE_KEY';
    const RIDERCLASS_KEY = 'RIDERCLASS_KEY';
    const staticImage = require("../assets/Ticket.png");
    const staticImageLogo = require("../assets/logo.png");

    useEffect(() => {
        getMifare();

    }, []);


   const getMifare = async () => {

        const cardID = await EncryptedStorage.getItem(MIFARE_KEY);
        const riderClassID = await EncryptedStorage.getItem(RIDERCLASS_KEY);
        const loginUser = await EncryptedStorage.getItem(USER_KEY);

        setuserLogin(loginUser);
        let token = await getToken();

        // If mifare card is found
        if (!(cardID == null)) {

            var requestOptions = {
                cardID: cardID,
                riderClassID: riderClassID, 
                Balance : 0
              };

           
            requestOptions = await getMifareData(cardID);
            setMifareCard(requestOptions);

            const returnBody = await getProducts(riderClassID, false);

            if (returnBody.result)
            {
              console.log(returnBody.json);
              setProducts(returnBody.json.products);
            }
        }
   }

 
  renderSeparator =  () => {  
    return (  
        <View  
                style={{  
                    height: 1,  
                    width: 400,  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    };  


    clickActionPurchase = async (item) => {  

      // Product is cash value, User need to enter value
      if (item.entryType == "4")  
      {
        try {

          navigation.navigate("MifareCashValueScreen", {purchaseDetails: {
            ProductId:          item.uniqueId,
            CustomerID:         userLogin,
            mifareCardID:         mifareCard.cardID,
            shortDescription: item.shortDescription
          }});
        
        } catch (error) {
          console.log(error);
    
        }
        return ;
      }

        var requestBody = JSON.stringify({
            "ProductId": item.uniqueId,
            "CustomerID": userLogin,
            "mifareCardID" : mifareCard.cardID
        });


        navigation.navigate("CheckoutScreen", {requestParameter: {
          bodyPurchaseApi: requestBody,
          shortDescription: item.shortDescription, 
          unitPrice: item.unitPrice.toString() , 
          purchaseType : "Card " + mifareCard.cardID
        }});

    }  

    clickInputCard= async () => {  
        if (!inputCard || inputCard.length <= 0) 
        {
          Alert.alert("Please enter a card number");  
          return ;
        }

        try {
         
          
          requestOptions =  await getMifareData(inputCard);

          if (requestOptions.status == 200)
          {
   
            setMifareCard(requestOptions);
            const returnBody = await getProducts(requestOptions.riderClassID, false);

            if (returnBody.result)
            {
              console.log(returnBody.json);
              setProducts(returnBody.json.products);
            }
    
            await EncryptedStorage.setItem(MIFARE_KEY, inputCard);
            await EncryptedStorage.setItem(RIDERCLASS_KEY, requestOptions.riderClassID);
          }
          else
          {
            Alert.alert("Unable to get card information");  
          }

  

        } catch (error) {
          console.log(error);
        }


 
  
    }
    
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainView}>
      <Image source={staticImageLogo}   style={styles.logo}/>
      {mifareCard  ? (
          <View>
            <Text style={localstyles.cardText}>Card :{mifareCard.cardID}</Text>
            <Text style={localstyles.cardText}>Balance:{mifareCard.balance}</Text>
           </View>
      ): 
      (  
        <View style={styles.mainView}>
                <TextInput
                style={styles.textInput}
                placeholder="Card ID"
                placeholderTextColor="#003f5c"
                onChangeText={(card) => setInputCard(card)}
                />

                <TouchableOpacity
                                style={styles.touchableView}
                                onPress={this.clickInputCard.bind(this)}
                                    >
                            <Text style={styles.touchableText}>Input</Text>
                </TouchableOpacity>

        </View>
      )}

        { products && (
        <FlatList  
                    data={products}  
                    keyExtractor={(item) => item.uniqueId}
                    renderItem={({item}) =>  
                    <View style={styles.mainView}>
               
                      <ImageBackground source={staticImage} resizeMode="cover" style={styles.image}>
                      <Text style={styles.item}>{item.shortDescription}</Text>
                        <Text style={styles.item}>${item.unitPrice}</Text>                        

                        <TouchableOpacity
                                style={styles.touchableView}
                                onPress={this.clickActionPurchase.bind(this, item)}
                                  >
                           <Text style={styles.touchableText}>Purchase</Text>
                         </TouchableOpacity>
                       </ImageBackground>
                       
                        
                       
                   </View>

                     }  
                    ItemSeparatorComponent={this.renderSeparator}                                
                  
                />  
        )}

      </View>
      </SafeAreaView>
    )
};


const localstyles = StyleSheet.create({
    cardText: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#065b9b'
  },
});

export default MifareCardScreen;
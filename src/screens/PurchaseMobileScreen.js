import React, {useEffect, useState} from 'react';
import { View, Text,  FlatList,  SafeAreaView , TouchableOpacity,ImageBackground, Image} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {getProducts} from '../core/products';
import styles from '../core/ticketsStyle';
import {config} from '../core/config';


const PurchaseMobileScreen = ( {navigation, route} ) => {
    const [products, setProducts] = useState(null);
    const [userLogin, setuserLogin] = useState(null);
    
    const USER_KEY = 'USER_KEY';
    const staticImage = require("../assets/Ticket.png");
    const staticImageLogo = require("../assets/logo.png");

    useEffect(() => {
      bringProducts();

    }, []);




  const bringProducts = async () => {

    const loginUser = await EncryptedStorage.getItem(USER_KEY);
    setuserLogin(loginUser);


    const returnBody = await getProducts(config.fullFareRiderClass)
    if (returnBody.result)
    {
        console.log(returnBody.json);
        setProducts(returnBody.json.products);
    }

  };

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


    clickAction = async (item) => {  


      var requestBody = JSON.stringify({
        "ProductId": item.uniqueId,
        "CustomerID": userLogin
    });


     
      navigation.navigate("CheckoutScreen", {requestParameter: {
        bodyPurchaseApi: requestBody,
        shortDescription: item.shortDescription, 
        unitPrice: item.unitPrice.toString() , 
        purchaseType : "Mobile"
      }});

     
    }  
    
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainView}>
      <Image source={staticImageLogo}   style={styles.logo}/>
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
                                onPress={this.clickAction.bind(this, item)}
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



export default PurchaseMobileScreen;
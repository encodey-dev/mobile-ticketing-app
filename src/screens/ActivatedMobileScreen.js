import React, {useEffect, useState} from 'react';
import {  View, Text, StyleSheet, FlatList, SafeAreaView ,TouchableOpacity,ImageBackground, Image} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {getToken} from '../core/getToken';
import styles from '../core/ticketsStyle';
import {config} from '../core/config';

const ActivatedMobileScreen = ( {navigation, route} ) => {
    const [tickets, setTickets] = useState(null);
    
    const USER_KEY = 'USER_KEY';
    const staticImage = require("../assets/Ticket.png");
    const staticImageLogo = require("../assets/logo.png");
    
    useEffect(() => {
      getTickets();

    }, []);


  const getTickets = async () => {

    const loginUser = await EncryptedStorage.getItem(USER_KEY);

    let token = await getToken();

    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+ token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "CustomerID": loginUser
        });


        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };

        const response = await fetch(
          config.apiUrl+'/tickets/activated',  requestOptions
        );
        const json = await response.json();


        setTickets(json.tickets);
      } catch (error) {
        console.log(error);
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


  clickAction= async (item) => {  
    try {

      navigation.navigate("ShowBarcodeScreen", {ticket: {
        url:          item.url,
        productDescription:         item.productDescription,
        endDate:         item.endDate
      }});
    
    } catch (error) {
      console.log(error);

    }

    
  }  
    
    
    return (
      <SafeAreaView style={{ flex: 1 }}>

      <View style={[styles.mainViewWhole, {flexDirection: "column"}]}>

      <View style={{ flex: 1 }} >

      <View style={{ flexDirection: "row" }} >
          <View style={{ flex: 3,  height:50 }} >
              <TouchableOpacity
                  style={styles.touchableViewTop}
                  onPress={() => {
                    navigation.navigate("AvailableMobileScreen" )}}>
                    <View>
                      <Text style={styles.touchableTextTop}>Available Tickets</Text>
                    </View>
                </TouchableOpacity>
          </View>    
          <View style={{ flex: 3,  height:50 }} >
            <TouchableOpacity
                  style={[styles.touchableViewTop, { backgroundColor: "powderblue" }]}
                  onPress={() => {
                    navigation.navigate("ActivatedMobileScreen")}}>
                    <View>
                      <Text style={styles.touchableTextTop}>Activated Tickets</Text>
                    </View>
                </TouchableOpacity>
          </View> 
        
        </View>

        <View style={styles.mainView}>
          <Image source={staticImageLogo}   style={styles.logo}/>
        </View>

        </View>

        

      <View style={{ flex: 5 }}>

             
      { tickets && (
         <View style={styles.mainView}>
          <FlatList  
                      data={tickets}  
                      keyExtractor={(item) => item.ticketId}
                      renderItem={({item}) =>  

                      <View style={styles.mainView}>
                        <ImageBackground source={staticImage} resizeMode="cover" style={styles.image}>
                          <Text style={styles.item}>{item.productDescription}</Text>
                          <Text style={styles.item}>{item.endDate}</Text>

                          <TouchableOpacity
                                  style={styles.touchableView}
                                  onPress={this.clickAction.bind(this, item)}
                                    >
                            <Text style={styles.touchableText}>Tap for Barcode</Text>
                          </TouchableOpacity>

                          </ImageBackground>
                    </View>

                      }  
                      ItemSeparatorComponent={this.renderSeparator}                                
                    
                  />  
           </View>                
        )}



      </View>

      </View>


     
      </SafeAreaView>
    )
};




export default ActivatedMobileScreen;
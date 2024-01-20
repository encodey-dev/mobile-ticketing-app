import React, {useEffect, useState} from 'react';
import {  View, Text,  FlatList, Alert,SafeAreaView ,TouchableOpacity,ImageBackground, Image} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';


import {getAvailableTickets, activeTicket} from '../core/tickets';
import styles from '../core/ticketsStyle';


const AvailableMobileScreen = ( {navigation, route} ) => {
    const [tickets, setTickets] = useState(null);
    const [currentWalletId, setcurrentWalletId] = useState(null);
    
    const USER_KEY = 'USER_KEY';
    const WALLET_ID = 'WALLET_ID';

    const staticImage = require("../assets/Ticket.png");
    const staticImageLogo = require("../assets/logo.png");

    useEffect(() => {

      const unsubscribe = navigation.addListener('focus', () => {
        console.log('did focus');
        getTickets();

      });
  
      return unsubscribe;


    }, [navigation]);


  const getTickets = async () => {

    const loginUser = await EncryptedStorage.getItem(USER_KEY);
    const loginWalletId = await EncryptedStorage.getItem(WALLET_ID);
    console.log(loginUser);

    setcurrentWalletId(loginWalletId);

    try {
         
      var bodyRequest = JSON.stringify({ "CustomerID": loginUser,"WalletId" : loginWalletId, "MobileOnly" : true});

      const returnBody = await getAvailableTickets(bodyRequest)

      if (returnBody.result)
      {
        console.log(returnBody.json);
        setTickets(returnBody.json.tickets);
      }
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

      const loginUser = await EncryptedStorage.getItem(USER_KEY);
      const loginWalletId = await EncryptedStorage.getItem(WALLET_ID);

      var bodyRequest = JSON.stringify({
        "TicketID": item.ticketId,
        "CustomerID": loginUser,
        "WalletId" : loginWalletId
      });

      const result = await activeTicket(bodyRequest)

      if (result)
      {
          getTickets();
      }

   
  }  
    
    
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={[styles.mainViewWhole, {flexDirection: "column"}]}>


        <View style={{ flex: 2 }} >

        <View style={{ flexDirection: "row" }} >
          <View style={{ flex: 3,  height:50 }} >
              <TouchableOpacity
                style={[styles.touchableViewTop, { backgroundColor: "powderblue" }]}
                  onPress={() => {
                    navigation.navigate("AvailableMobileScreen" )}}>
                    <View>
                      <Text style={styles.touchableTextTop}>Available Tickets</Text>
                    </View>
                </TouchableOpacity>
          </View>    
          <View style={{ flex: 3,  height:50}} >
            <TouchableOpacity
                  style={styles.touchableViewTop}
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

            <TouchableOpacity
                  style={[styles.touchableView, {  width: 350 }]}
                  onPress={() => {
                    navigation.navigate("PurchaseMobile" )}}>
                    <View>
                      <Text style={styles.touchableText}>Purchase</Text>
                    </View>
          </TouchableOpacity>
          { currentWalletId && (
              <View style={styles.mainView}>
                <Text>Current Wallet Id</Text>
                <Text>{currentWalletId}</Text>
              </View>
          )}

        </View>
      


        </View>
        <View style={{ flex: 4 }}>

        { tickets && (
          <View style={styles.mainView}>
            <FlatList  
                        data={tickets}  
                        keyExtractor={(item) => item.ticketId}
                        renderItem={({item}) =>  

                        <View style={styles.mainView}>
                          <ImageBackground source={staticImage} resizeMode="cover" style={styles.image}>
                            <Text style={styles.item}>{item.productDescription}</Text>
                            <TouchableOpacity
                                    style={styles.touchableView}
                                    onPress={this.clickAction.bind(this, item)}
                                      >
                              <Text style={styles.touchableText}>Active</Text>
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


export default AvailableMobileScreen;
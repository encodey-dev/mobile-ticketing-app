import React, {useEffect, useState} from 'react';
import {  View, Text, StyleSheet, FlatList, SafeAreaView ,TouchableOpacity,ImageBackground, Image} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';


import {getActivedTickets} from '../core/tickets';
import styles from '../core/ticketsStyle';


const ActivatedMobileScreen = ( {navigation, route} ) => {
    const [tickets, setTickets] = useState(null);
    
    const USER_KEY = 'USER_KEY';
    const WALLET_ID = 'WALLET_ID';
    const TICKETS_LIST = 'TICKETS_LIST';
    const LAST_REFRESH = 'LAST_REFRESH';
    const staticImage = require("../assets/Ticket.png");
    const staticImageLogo = require("../assets/logo.png");
    
    useEffect(() => {
      getTickets();

    }, []);


  const getTickets = async () => {

    const loginUser = await EncryptedStorage.getItem(USER_KEY);
    const loginWalletId = await EncryptedStorage.getItem(WALLET_ID);
    

    try {

        var bodyRequest = JSON.stringify({"CustomerID": loginUser, "WalletId" : loginWalletId});

        const returnBody = await getActivedTickets(bodyRequest)

        if (returnBody.result )
        {

          // Store tickets on storage in case user is offline
          await EncryptedStorage.setItem(TICKETS_LIST, JSON.stringify(returnBody.json));
          await EncryptedStorage.setItem(LAST_REFRESH, Date.now().toString());

          setTickets(returnBody.json.tickets);

          // Finish the routine
          return ;
        }
      } catch (error) {
        console.log(error);
        
      }
      
      // Get tickets from storage in case user is offline.
      try {
        const ticketList = await EncryptedStorage.getItem(TICKETS_LIST);
        const lastRefresh = await EncryptedStorage.getItem(LAST_REFRESH);

        if (!(lastRefresh == null)) {
            const isNow = Date.now();
            const refreshHours = 3*60*60*1000;
            const lastRefreshNumber = Number(lastRefresh) + refreshHours;
    
            // Allow 3 hours of offline data
            if (lastRefreshNumber < isNow)
            {
              return;
            }
        }

        if (!(ticketList == null)) {
          const t = JSON.parse(ticketList);
          setTickets(t.tickets);
          console.log(t);
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
    try {

      navigation.navigate("ShowBarcodeScreen", {ticket: {
        url:          item.url,
        productDescription:         item.productDescription,
        endDate:         item.endDate,
        ticketData : item.ticketData
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

             
      { tickets ? (
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
        ): 
        ( 
          <Text style={styles.showText}>If you dont see your tickets, Please call customer services</Text>
        )
        }



      </View>

      </View>


     
      </SafeAreaView>
    )
};




export default ActivatedMobileScreen;
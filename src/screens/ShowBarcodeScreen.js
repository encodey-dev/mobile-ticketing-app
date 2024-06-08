import React, {useEffect, useState} from 'react';
import { Button, View, Text, StyleSheet , SafeAreaView,Image} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {generateTime} from '../core/generateTime';

const ShowBarcodeScreen = ( {navigation, route} ) => {

  const staticImage = require("../assets/logo.png");
  const ticket = route.params.ticket;

  // Set the barcode for the first time.
  let gTime = generateTime();
  const objCode = {d: ticket.ticketData, t: gTime};
  const jsonCode = JSON.stringify(objCode);

  const [timeCode, setTimeCode] = useState(jsonCode);


  const startTimer = () => {
   
       // Change the barcode every 3 seconds.
       timer = setTimeout(() => {
          let g = generateTime();
          const obj = {d: ticket.ticketData, t: g};
          const myJSON = JSON.stringify(obj);
        setTimeCode(myJSON);
        }, 3000)
    }

    useEffect(() => {
        startTimer();
       
    });    


    return (

      <SafeAreaView style={{ flex: 1 }}>
       <View style={styles.mainView}>
         
        <View style={{ flex: 1, backgroundColor: "white" }} />
            <Image source={staticImage}   style={styles.logo}/>
            <Text style={styles.touchableText}>{ticket.productDescription}</Text>

        </View>
        
        <View style={{ flex: 5, backgroundColor: "white" ,  alignItems: "center" }} >
        <Text style={styles.touchableText}>Scan this code to ride</Text> 
          { timeCode && (
            <QRCode 
              value= {timeCode}
              size={150}
            />
          )}

          <Text style={styles.touchableText}>Expires</Text> 
          <Text style={styles.touchableText}>{ticket.endDate.substring(0,24)}</Text> 


        </View>
        
        
       
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" 
  },
  touchableText: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065b9b'
  },
  logo: {
    width: 150,
    height: 25,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ShowBarcodeScreen;
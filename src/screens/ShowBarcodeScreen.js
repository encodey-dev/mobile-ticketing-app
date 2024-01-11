import React, {useEffect, useState} from 'react';
import { Button, View, Text, StyleSheet , SafeAreaView,Image} from 'react-native';
import { WebView } from 'react-native-webview';
import QRCode from 'react-native-qrcode-svg';

const ShowBarcodeScreen = ( {navigation, route} ) => {

  const staticImage = require("../assets/logo.png");
  const ticket = route.params.ticket;

  const [timeCode, setTimeCode] = useState("");

  
  const startTimer = () => {

       timer = setTimeout(() => {
          const d =  new Date();
          const localTime = new Date(d.getTime() - 18000000);
          const obj = {d: ticket.ticketData, t: localTime.toISOString()};

          console.log(localTime.getUTCHours());
          const myJSON = JSON.stringify(obj);
        setTimeCode(myJSON);
        }, 1000)
    }

    useEffect(() => {
        startTimer();
       
    });    


    return (

      <SafeAreaView style={{ flex: 1 }}>
       <View style={styles.mainView}>
         
        <View style={{ flex: 2, backgroundColor: "white" }} />
            <Image source={staticImage}   style={styles.logo}/>
            <Text style={styles.touchableText}>{ticket.productDescription}</Text>
            <Text style={styles.touchableText}>{ticket.endDate}</Text>
        </View>
        <View style={{ flex: 4, backgroundColor: "white" ,  alignItems: "center" }} >

        { timeCode && (
          <QRCode 
            value= {timeCode}
            size={150}
          />
        )}


        
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
    width: 350,
    height: 45,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ShowBarcodeScreen;
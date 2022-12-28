import React from 'react';
import { Button, View, Text, StyleSheet , SafeAreaView,Image} from 'react-native';
import { WebView } from 'react-native-webview';

const ShowBarcodeScreen = ( {navigation, route} ) => {

  const staticImage = require("../assets/logo.png");
  const ticket = route.params.ticket;

    return (

      <SafeAreaView style={{ flex: 1 }}>
       <View style={styles.mainView}>
         
        <View style={{ flex: 2, backgroundColor: "white" }} />
            <Image source={staticImage}   style={styles.logo}/>
            <Text style={styles.touchableText}>{ticket.productDescription}</Text>
            <Text style={styles.touchableText}>{ticket.endDate}</Text>
        </View>
        <View style={{ flex: 4, backgroundColor: "white" }} >
        <WebView source={{ uri: ticket.url }} />
        
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
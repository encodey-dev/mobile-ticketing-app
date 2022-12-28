import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";


import PurchaseMobileScreen from "./src/screens/PurchaseMobileScreen";
import AvailableMobileScreen from "./src/screens/AvailableMobileScreen";
import ActivatedMobileScreen from "./src/screens/ActivatedMobileScreen";
import ShowBarcodeScreen from "./src/screens/ShowBarcodeScreen";

import MifareCardScreen from "./src/screens/MifareCardScreen";
import MifareCashValueScreen from "./src/screens/MifareCashValueScreen";

import CheckoutScreen from "./src/screens/CheckoutScreen";





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App_to_Home"
        screenOptions={
          {
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#065b9b'}
          }
        }>
        <Stack.Screen
          name="App_to_Home"
          component={HomeScreen}
          options={{
            title: "Encodey App"
          }}
        />
    
        <Stack.Screen
          name="PurchaseMobile"
          component={PurchaseMobileScreen}
          options={{
            title: "Purchase Mobile Tickets"
          }}
        />

        <Stack.Screen
          name="AvailableMobileScreen"
          component={AvailableMobileScreen}
          options={{
            title: "Available Mobile Tickets"
          }}
        />

       <Stack.Screen
          name="ActivatedMobileScreen"
          component={ActivatedMobileScreen}
          options={{
            title: "Activated Mobile Tickets"
          }}
        />

      <Stack.Screen
          name="ShowBarcodeScreen"
          component={ShowBarcodeScreen}
          options={{
            title: "Show Barcode"
          }}
        />

      <Stack.Screen
          name="MifareCardScreen"
          component={MifareCardScreen}
          options={{
            title: "Mifare Card"
          }}
        />

      <Stack.Screen
          name="MifareCashValueScreen"
          component={MifareCashValueScreen}
          options={{
            title: "Mifare Cash Value"
          }}
        />        

      <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{
            title: "Checkout"
          }}
        />       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

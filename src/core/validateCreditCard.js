import {getToken} from './getToken';
import {config} from './config';
import {Alert} from 'react-native';

export const validateCreditCard = async (requestBody) => {
    try {

         if (requestBody.cardNumber.length < 14)
         {
           Alert.alert("Invalid credit card number") ;  
           return false;
         }

        // Futher credit card validation
        // Call payment gateway API

         return true;

      } catch (error) {
        console.log(error);
        Alert.alert("Purchase failed");  
        return false;
      }
}
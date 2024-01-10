import {getToken} from './getToken';
import {config} from './config';
import {Alert} from 'react-native';


export const postCustomer = async (requestBody) => {

  var returnCustomer = {
    id: "",
    walletId: "",
    found: false
  };

  try {

      let token = await getToken();
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+ token);
      myHeaders.append("Content-Type", "application/json");



      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: requestBody,
      };

      const response = await fetch(
        config.apiUrl+'/customer',  requestOptions
      );

      
      if (response.status == 200)
      {
        const json = await response.json();
        console.log(json);
        returnCustomer.id = json.id;
        returnCustomer.walletId = json.walletId;
        returnCustomer.found = true

        return returnCustomer;

       
      }
      else
      {
        const json = await response.json();
        console.log(json);
        return returnCustomer;
      }
    } catch (error) {
      console.log(error);
      return returnCustomer;
    }
}


export const getCustomer = async (customerId) => {

  console.log("caling get customer");

   var returnCustomer = {
       id: "",
       walletId: "",
       found: "false"
     };

   try {

       let token = await getToken();
       var myHeaders = new Headers();
       myHeaders.append("Authorization", "Bearer "+ token);
       myHeaders.append("Content-Type", "application/json");
 

       var requestOptions = {
         method: 'GET',
         headers: myHeaders
       };
 
       const response = await fetch(
         config.apiUrl+'/customer?id='+customerId ,  requestOptions
       );
 
       console.log(response);
       if (response.status == 200)
       {
         const json = await response.json();
         console.log(json);

         returnCustomer.id = json.id;
         returnCustomer.walletId = json.walletId;
         returnCustomer.found = "true";

         return returnCustomer;
       }
       else
       {
         const json = await response.json();
         console.log(json);
         return returnCustomer;
       }
     } catch (error) {
       console.log(error);
       returnCustomer.found = "error";
       return returnCustomer;
     }
}
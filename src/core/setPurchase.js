import {getToken} from './getToken';
import {config} from './config';
import {Alert} from 'react-native';

export const setPurchase = async (requestBody, purchaseType) => {
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

        let url = config.apiUrl+'/i/v1/tickets/issue';


        if (purchaseType == "Mobile")
        { 
           url = config.apiUrl+'/m/v1/tickets/issue';
        }
        
        
  
        const response = await fetch(
          url,  requestOptions
        );
  
        
        if (response.status == 200)
        {
          const json = await response.json();
          console.log(json);
          Alert.alert("Purchase was successful");  

          return true;
        }
        else
        {
          const json = await response.json();
          console.log(json);
          Alert.alert("purchase failed");    
          return false;
        }
      } catch (error) {
        console.log(error);
        Alert.alert("purchase failed");  
        return false;
      }
}
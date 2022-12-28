import {getToken} from './getToken';
import {config} from './config';
import {Alert} from 'react-native';

export const setPurchase = async (requestBody) => {
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
          config.apiUrl+'/tickets/issue',  requestOptions
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
import {setHeader} from './getToken';
import {config} from './config';
import {Alert} from 'react-native';


export const getActivedTickets= async (bodyRequest ) => {


    var returnBody = {
        result : true,
        json : null
    } 

    try {
      let headerRequest = await setHeader();

      var requestOptions = {
        method: 'POST',
        headers: headerRequest,
        body: bodyRequest,
      };

      const response = await fetch(
        config.apiUrl+'/tickets/activated',  requestOptions
      );

      const json = await response.json();

      returnBody.json = json;

      return returnBody;

    } catch (error) {
        console.log(error);
        returnBody.result = false;
        return returnBody;
    }

}

export const getAvailableTickets= async (bodyRequest ) => {


    var returnBody = {
        result : true,
        json : null
    } 

   try {
      let headerRequest = await setHeader();

      var requestOptions = {
        method: 'POST',
        headers: headerRequest,
        body: bodyRequest,
      };

     

      const response = await fetch(
        config.apiUrl+'/tickets/available',  requestOptions
      );

      const json = await response.json();

      returnBody.json = json;

      return returnBody;

    } catch (error) {
        console.log(error);
        returnBody.result = false;
        return returnBody;
    }

}


export const activeTicket= async (bodyRequest ) => {


    try {
  
        let headerRequest = await setHeader();
  
        var requestOptions = {
          method: 'PUT',
          headers: headerRequest,
          body: bodyRequest,
        };
  
        const response = await fetch(
          config.apiUrl+'/tickets/activate',  requestOptions
        );
        
        if (response.status == 200)
        {
          const json = await response.json();
          console.log(json);
          Alert.alert("Ticket was activated");  
          return true;
          
        }
        else
        {
          const json = await response.json();
          console.log(json);
          Alert.alert("Unable to active ticket.");  
          return false;
        }
  
      } catch (error) {
        console.log(error);
        Alert.alert("Unable to active ticket.");  
        return false;
      }
  
}


import {setHeader} from './getToken';
import {config} from './config';

export const getProducts = async (riderClassID) => {

    console.log(riderClassID);

    var returnBody = {
        result : true,
        json : null
    } 

    try {
         
        let headerRequest = await setHeader();


        var requestOptions = {
          method: 'GET',
          headers: headerRequest
        };


        const response = await fetch(
          config.apiUrl+'/products?RiderClassID='+riderClassID,  requestOptions
        );
        const json = await response.json();

        returnBody.json = json;

        return returnBody;
      } catch (error) {
        console.log(error);
        returnBody.result = false;
        return returnBody;
      }

  };
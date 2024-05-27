
import {setHeader} from './getToken';
import {config} from './config';

export const getProducts = async (riderClassID, ismobile) => {

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
          config.apiUrl+'/s/v1/products?RiderClassID='+riderClassID + "&ismobile="+ismobile,  requestOptions
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
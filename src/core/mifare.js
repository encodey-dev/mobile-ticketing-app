
import {setHeader} from './getToken';
import {config} from './config';


export  const getMifareData = async (cardID) => {


    try {
       
      let headerRequest = await setHeader();


      var requestOptions = {
        method: 'GET',
        headers: headerRequest
      };


      const response = await fetch(
        config.apiUrl+'/mifarecards/'+cardID,  requestOptions
      );

      if (response.status == 200)
      {
        const json = await response.json();
        console.log(json);
        var requestOptions = {
          cardID: cardID,
          riderClassID: json.riderClassUniqueID, 
          balance : json.balance,
          status : 200
          };

        return requestOptions;
      }
      else
      {
        var requestOptions = { cardID: cardID, status : 400 };
        const json = await response.json();
        console.log(json);
        return requestOptions;
      }
      


    } catch (error) {
      console.log(error);
    }


   }


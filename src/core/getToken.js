
import EncryptedStorage from 'react-native-encrypted-storage';
import {config} from './config';

const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRATION = 'expiration';



export const getToken = async () => {
  try {

    const currentTime = Date.now();

    const token = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);
    const expiration = await EncryptedStorage.getItem(EXPIRATION);

    // If there is a token
    if (!(token == null)) {
        const expirationTime = Date.parse(expiration);
        // If token has not expired
        if (expirationTime > currentTime  )
        {
          return token;
        }
        
     }
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

    console.log(config);

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("ClientId", config.clientId);
    urlencoded.append("ClientKey", config.clientKey);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded.toString()
    };

    const response = await fetch(
       config.tokenUrl,  requestOptions
    );
    const json = await response.json();

    await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, json.token);
    await EncryptedStorage.setItem(EXPIRATION, json.expiration);
  
    return json.token;
  } catch (error) {
    console.log(error);
  }
};
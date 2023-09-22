import {config} from './config';

export function generateUUID(digits) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < digits; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join('');
}

export const sendPayment = async (requestBody) => {
    try {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        console.log(requestBody);

        const resCardNumber = requestBody.cardNumber.replace(/ /g, '')

        var requestPayment = {
            createTransactionRequest: {
              merchantAuthentication: {
                name: config.paymentGatewayname,
                transactionKey: config.paymentGatewayKey
              },
              refId: generateUUID(16),
              transactionRequest: {
                transactionType: "authCaptureTransaction",
                amount: requestBody.unitprice,
                payment: {
                  creditCard: {
                    cardNumber: resCardNumber,
                    expirationDate:  requestBody.expiration,
                    cardCode: requestBody.cvv
                  }
                },
                lineItems: {
                  lineItem: {
                    itemId: "1",
                    name: requestBody.shortdescription,
                    description: requestBody.shortdescription,
                    quantity: "1",
                    unitPrice: requestBody.unitprice
                  }
                },
                processingOptions: {
                  isSubsequentAuth: "true"
                },
                authorizationIndicatorType: {
                  authorizationIndicator: "final"
                }
              }
            }
          }

          let sendStr = JSON.stringify(requestPayment);

          console.log(sendStr);
 
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: sendStr
        };
  


        const response = await fetch(
           'https://apitest.authorize.net/xml/v1/request.api',  requestOptions
        );
  
        
        let sendStr2 = JSON.stringify(response);

        console.log(sendStr2);
        
        if (response.status == 200)
        {
          let json = await response.text();
          // Remove the first character of the value, for some reason come with a weird character.
          json = json.substring(1, json.length);
          console.log(json);

          const obj = JSON.parse(json);
          
          if (obj.messages.resultCode == 'Ok')
          {
            return true;
          }



          return false;
        }
        else
        {
          
          const json = await response.text();
          console.log(json);
          return false;
        }
        
        
      } catch (error) {
        console.log(error);
        return false;
      }
}
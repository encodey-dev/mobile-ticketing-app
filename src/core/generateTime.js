

export function dayofyear(d) {   // d is a Date object
    var yn = d.getUTCFullYear();
    var mn = d.getUTCMonth();
    var dn = d.getUTCDate();
    var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
    var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
    var ddiff = Math.round((d2-d1)/864e5);
    return ddiff+1; 
}

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


export function generateTime () {

    const d =  new Date();
    const localTime = new Date(d.getTime() );

    const g = localTime.toUTCString();


     return g;

}
const AuthStr = 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=';
 const URL = 'http://localhost:8080/oauth/token';
//const URL = 'https://musicmaker-api-team4.herokuapp.com/oauth/token';

export function fetchToken(username, password) {
    return fetch(URL + '?grant_type=password&username='+ username +'&password='+password, {
        method: 'POST',
        headers: {
            'Authorization': AuthStr,
            'Content-Type': 'application/json'
        },
        mode: "cors",
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log("Json Response Fetch:")
            console.log(responseJson);
            if(responseJson.hasOwnProperty("access_token")){
                let JWT = responseJson;
                let now = Date.now();
                JWT.expires_in= now + JWT.expires_in*1000;
                localStorage.setItem('userToken', JSON.stringify(JWT));
                return true;
            }
            return false;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
            return false;
        });

}

export function checkToken(){
    if(localStorage.getItem('userToken')!= null){
        let jwt = JSON.parse(localStorage.getItem('userToken'));
        let current_time = Date.now();
        console.log("curr time: ", current_time);
        console.log('jwt.expires_in: ', jwt.expires_in);
        if ( jwt.expires_in > current_time) {
            return true;
        }
    }
    //localStorage.removeItem('userToken');
    return false;
}
//Fix Ben
/*export function fetchLogin() {
    return fetch('http://localhost:8080/oauth/token?grant_type=password&username=tim&password=tim', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=',
            'Content-Type': 'application/json'
        },
        mode: "cors",

    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}*/



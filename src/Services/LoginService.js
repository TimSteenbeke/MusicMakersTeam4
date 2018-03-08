const AuthStr = 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=';
// const URL = 'http://localhost:8080/oauth/token';
const URL = 'https://musicmaker-api-team4.herokuapp.com/oauth/token';

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
                localStorage.setItem('userToken', JSON.stringify(responseJson));
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
        let jwt = localStorage.getItem('userToken');
        if(isString(jwt)){
            return false;
        }
        var current_time = Date.now() / 1000;
        if ( jwt.exp < current_time) {
            localStorage.removeItem('userToken');
            return false;
        } else{
            return true;
        }
    }
        return false;
}

// Returns if a value is a string
function isString (value) {
    return typeof value === 'string' || value instanceof String;
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



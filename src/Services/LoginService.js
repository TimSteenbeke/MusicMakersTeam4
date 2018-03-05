const AuthStr = 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=';
const localURL = 'http://localhost:8080/oauth/token';
const herokuURL = 'https://musicmaker-api-team4.herokuapp.com/oauth/token';

export function fetchToken(username, password) {
    return fetch(localURL + '?grant_type=password&username='+ username +'&password='+password, {
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
            localStorage.setItem('userToken', responseJson.access_token);
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });

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



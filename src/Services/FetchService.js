const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';

export function fetchWithHeader(api = "", method = 'GET', body = {}, error = {}) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = {
        'Authorization': userToken.token_type + " " + userToken.access_token,
        'Content-Type': 'application/json',
    }
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        headers = {
            'Accept': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token,
            'Content-Type': 'application/json'
        }
    }
    return fetch(URL + api,
        {
            mode: 'cors',
            method: method,
            headers: headers,
            body: body
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
            return error;
        });
}
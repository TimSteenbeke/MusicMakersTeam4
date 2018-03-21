const URL = 'https://musicmaker-api-team4.herokuapp.com/';
// const URL = 'http://localhost:8080/';


export function fetchWithHeader(api = "", method = 'GET', body = {}, error = {}) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = {
        'Authorization': userToken.token_type + " " + userToken.access_token,
        'Content-Type': 'application/json',
    };
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        headers = {
            'Accept': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token,
            'Content-Type': 'application/json'
        }
    }
    return fetch(URL +"api/"+ api,
        {
            mode: 'cors',
            method: method,
            headers: headers,
            body: body
        })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            return error;
        });
}

export function fetchForm(api = "", method = 'GET', body = {}, error = {}) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = {
        'Authorization': userToken.token_type + " " + userToken.access_token,
        "Content-Type": "multipart/form-data"
    };
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        headers = {
            'Accept': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token,
            "Content-Type": "multipart/form-data"
        }
    }
    return fetch(URL +"api/"+ api,body,
        {
            mode: 'cors',
            method: method,
            headers: headers
        })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            return error;
        });
}

import axios from 'axios';
import Querystring from 'query-string';

const AuthStr = 'Bearer TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE';
const URL = 'http://localhost:8080/oauth/token?grant_type=password&username=tim&password=tim';
const URL2 = 'https://musicmaker-api-team4.herokuapp.com/oauth/token?grant_type=password&username=tim&password=tim';
const URL3 ='http://localhost:8080/oauth/token';
const data = {
    grant_type: "password",
    client_id: "MusicMakerAPIclientid",
    client_secret: "VcmjPKJz66AS1",
    scope: "read write",
    username: "tim",
    password: "tim"
};
const dataSafe = {
    grant_type: "password",
    username: "tim",
    password: "tim",
    Authorization: AuthStr
};
let USER_TOKEN;

export function fetchToken(username, password) {
    //fetch
    // return fetch("http://localhost:8080/oauth/token?grant_type=password&username=" + username + "&password=" + password, {
    // return fetch("https://musicmaker-api-team4.herokuapp.com/oauth/token?grant_type=password&username=" + username + "&password=" + password, {
    // return fetch(URL2, {
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE'
        },
        mode: "cors",
        withCredentials: true
    })
        .then((response) => {
            console.log("response: ");
            console.log(response.data);
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
//xhr
/*    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", URL);
    // xhr.open("POST", URL2);
    xhr.setRequestHeader("authorization", "Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "a7ba005a-4bbb-cdc9-651c-089022de27f5");

    xhr.send(null);*/

//http request
/*        let http = require("http");

            let options = {
                "method": "POST",
                "hostname": "localhost",
                "port": "8080",
                "path": "/oauth/token?grant_type=password&username=tim&password=tim",
                "headers": {
                    "authorization": "Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=",
                    "cache-control": "no-cache",
                    "postman-token": "be49093c-1c39-bfc6-1078-6158802e356a"
                }
            };

            let req = http.request(options, function (res) {
                let chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function () {
                    let body = Buffer.concat(chunks);
                    console.log(body.toString());
                });
            });

            req.end();*/

//axios.post hardcoded
/*        axios.post('http://localhost:8080/oauth/token?grant_type=password&username=tim&password=tim',
                {headers: {'Authorization': 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE='}})
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });*/

//axios.post with const data
/*        axios.post(URL3, Querystring.stringify(dataSafe),{mode:"corse"})
            .then(response => {
                console.log(response.data);
                USER_TOKEN = response.data.access_token;
                console.log('userresponse ' + response.data.access_token);
            })
            .catch((error) => {
                console.log('error ' + error);
            });

    /!*    const AuthStr = 'Bearer '.concat(USER_TOKEN);
        axios.get(URL, { headers: { Authorization: AuthStr } })
            .then(response => {
                // If request is good...
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error ' + error);
            });*!/*/

//axios.post with const
    /*    axios.post(URL, { 'headers': { 'Authorization': AuthStr } })
            .then((response) => {
                console.log(response.data);
            })
                .catch((error) => {
                    console.log(error);
                });
    */

}

import axios from 'axios';
import Querystring from 'query-string';

const AuthStr = 'Bearer TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE';
const URL = 'http://localhost:8080/oauth/token?grant_type=password&username=tim&password=tim';
const data = {
    grant_type: "password",
    client_id: "MusicMakerAPIclientid",
    client_secret: "VcmjPKJz66AS1",
    scope: "read write",
    username: "tim",
    password: "tim"
};
let USER_TOKEN;

export function fetchToken(username, password) {
    // return fetch("http://localhost:8080/oauth/token?grant_type=password&username=" + username + "&password=" + password, {
    return fetch(URL, {
        headers: {'Authorization': AuthStr},
        method: 'POST'
    })
        .then((response) => {
            console.log("response: ");
            console.log(response.data);
            // response.json();
        })
/*        .then((responseJson) => {
            return responseJson;
        })*/
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
//xhr
    /*   var data = null;

       var xhr = new XMLHttpRequest();
       xhr.withCredentials = true;

       xhr.addEventListener("readystatechange", function () {
           if (this.readyState === 4) {
               console.log(this.responseText);
           }
       });

       xhr.open("POST", "http://localhost:8080/oauth/token?grant_type=password&username=tim&password=tim");
       xhr.setRequestHeader("authorization", "Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE=");
       xhr.setRequestHeader("cache-control", "no-cache");
       xhr.setRequestHeader("postman-token", "a7ba005a-4bbb-cdc9-651c-089022de27f5");

       xhr.send(data);*/

//http request
    /*    let http = require("http");

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
    /*    axios.post('http://localhost:8080/oauth/token?grant_type=password&username=tim&password=tim',
                {headers: {'Authorization': 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE='}})
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });*/

//axios.post with const data
    /*    axios.post(URL, Querystring.stringify(data))
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

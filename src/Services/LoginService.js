export function fetchToken(username, password) {
/*    // return fetch("http://localhost:8080/oauth/token?grant_type=password&username=" + username + "&password=" + password, {
    return fetch("http://localhost:8080/oauth/token?grant_type=password&username=tim&password=tim", {
        hearers: {'Authorization': 'Basic TXVzaWNNYWtlckFQSWNsaWVudGlkOlZjbWpQS0p6NjZBUzE='},
        method: 'POST'
    })
        .then((response) => {
            console.log("respons: " + response);
            console.log(response);
            response.json();
        })
        .then((responseJson) => {
            console.log("responseJson: " + responseJson);
            return responseJson;
        })
        .catch((err) => {

            console.log("geen response");
            console.log(err);
        });*/

    var data = null;

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

    xhr.send(data);
}

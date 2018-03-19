import * as fetchService from "./FetchService";

/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';*/

export function getMyAgenda() {
    return fetchService.fetchWithHeader("agenda", "GET", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + 'agenda',
        {
            mode: 'cors',
            headers: {
                'Authorization': userToken.token_type + " " + userToken.access_token,
                'Content-Type': 'application/json'
            }
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
        });*/
}

export function getOtherAgenda(userid) {
    return fetchService.fetchWithHeader("agenda/"+userid, "GET", {}, {});
/*    let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + 'agenda/' + userid,
        {
            mode: 'cors',
            headers: {
                'Authorization': userToken.token_type + " " + userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log('other agenda opgevraagd');
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });*/
}

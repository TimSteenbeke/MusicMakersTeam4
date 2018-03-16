import * as fetchService from "./FetchService";

/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';*/

export function registerAbsent(performanceid) {
    return fetchService.fetchWithHeader("performance/absent/" + performanceid, "POST", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + 'performance/absent/' +performanceid,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization':  userToken.token_type + " " +  userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });*/
}

export function registerPresent(performanceid) {
    return fetchService.fetchWithHeader("performance/present/" + performanceid, "POST", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + 'performance/present/' +performanceid,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization':  userToken.token_type + " " +  userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });*/
}

export function getAttendanceStatus(performanceid) {
    return fetchService.fetchWithHeader("performance/attendancestatus/" + performanceid, "GET", {}, {});
    /* let userToken = JSON.parse(localStorage.getItem('userToken'));
     return fetch(URL + 'performance/attendancestatus/' +performanceid,
         {
             method: 'GET',
             mode: 'cors',
             headers: {
                 'Authorization':  userToken.token_type + " " +  userToken.access_token,
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
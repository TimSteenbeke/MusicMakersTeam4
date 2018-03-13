/**
 * Created by Ben on 28/02/2018.
 */
const herokuURL = 'https://musicmaker-api-team4.herokuapp.com/api/';
const localURL = 'http://localhost:8080/api/';
let userToken = JSON.parse(localStorage.getItem('userToken'));

export function registerAbsent(performanceid) {
    return fetch(herokuURL + 'performance/absent/' +performanceid,
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
        });
}

export function registerPresent(performanceid) {
    return fetch(herokuURL + 'performance/present/' +performanceid,
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
        });
}

export function getAttendanceStatus(performanceid) {
    return fetch(herokuURL + 'performance/attendancestatus/' +performanceid,
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
        });
}
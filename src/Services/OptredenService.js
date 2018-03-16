/**
 * Created by Ben on 28/02/2018.
 */
// const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
const URL = 'http://localhost:8080/api/';


export function registerAbsent(performanceid) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
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
        });
}

export function registerPresent(performanceid) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
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
        });
}

export function getAttendanceStatus(performanceid) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
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
        });
}
/**
 * Created by Ben on 28/02/2018.
 */
const herokuURL = 'https://musicmaker-api-team4.herokuapp.com/api/';

export function registerAbsent(performanceid) {
    return fetch(herokuURL + 'performance/absent/' +performanceid,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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

export function registerPresent(performanceid) {
    return fetch(herokuURL + 'performance/present/' +performanceid,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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

export function getAttendanceStatus(performanceid) {
    return fetch(herokuURL + 'performance/attendancestatus/' +performanceid,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
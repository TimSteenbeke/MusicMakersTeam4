/**
 * Created by Ben on 28/02/2018.
 */
const herokuURL = 'https://musicmaker-api-team4.herokuapp.com/api/';
const localURL = 'http://localhost:8080/api/';
let userToken = {
    token_type: "",
    access_token: ""
};
if (localStorage.getItem('userToken') != null) {
    userToken = JSON.parse(localStorage.getItem('userToken'));
}

export function registerAbsent(lessonid) {
    return fetch(herokuURL + 'lesson/absent/' +lessonid,
        {
            method: 'POST',
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

export function registerPresent(lessonid) {
    return fetch(herokuURL + 'lesson/present/' +lessonid,
        {
            method: 'POST',
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

export function getAttendanceStatus(lessonid) {
    return fetch(herokuURL + 'lesson/attendancestatus/' +lessonid,
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

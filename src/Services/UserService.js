/**
 * Created by jariv on 7/03/2018.
 */
const URL="https://musicmaker-api-team4.herokuapp.com/api/users/";
// const URL = 'http://localhost:8080/api/';
let userToken = JSON.parse(localStorage.getItem('userToken'));


export function getTeachers() {

    return fetch(URL + "teacherAdmin", {
        mode: 'cors',
        headers: {
            'Authorization':  userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}

export function getStudents() {

    return fetch(URL + "students", {
        mode: 'cors',
        headers: {
            'Authorization':  userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}

export function getAll() {

    return fetch(URL, {
        mode: 'cors',
        headers: {
            'Authorization':  userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}


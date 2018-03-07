/**
 * Created by jariv on 7/03/2018.
 */

URL="https://musicmaker-api-team4.herokuapp.com/api/users/";

export function getTeachers() {

    return fetch(URL + "teacherAdmin", {
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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


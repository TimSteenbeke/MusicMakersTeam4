import * as fetchService from "./FetchService";

/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';*/

export function postUser(data) {
    fetchService.fetchWithHeader("users", "POST", data, {});
}

export function getUserByUsernameFromBackend() {
    return fetchService.fetchWithHeader("users/loggedin", "GET", {}, {naam: "User niet gevonden"});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "users/loggedin", {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json()
        )
        .then((responseJson) => {
            localStorage.setItem('currentUser', JSON.stringify(responseJson));
            console.log("user");
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            return {naam: "User niet gevonden"};
        });*/
}



export function getUserFromBackend(userId) {
    return fetchService.fetchWithHeader("users/" + userId, "GET", {}, {naam: "User niet gevonden"});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "users/" + userId, {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json()
        )
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            const instrument = {naam: "User niet gevonden"};
            return instrument;
        });*/
}

export function UpdateUser(id, data) {
    return fetchService.fetchWithHeader("users/user/" + id, "PUT", data, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    console.log("useridddd: "+ id);
    console.log(data);

    return fetch(URL + "users/user/" + id, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        },
        body: data
    });*/
}

export function getTeachers() {
    return fetchService.fetchWithHeader("users/teacherAdmin", "GET", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "users/teacherAdmin", {
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
            });*/
}

export function getStudents() {
    return fetchService.fetchWithHeader("users/students", "GET", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "users/students", {
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

export function getAll() {
    return fetchService.fetchWithHeader("users/", "GET", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL +"users/", {
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
        });*/
}

export function getUserRoles() {
    return fetchService.fetchWithHeader("users/roles", "GET", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "users/roles", {
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
            });*/
}

export function deleteUser(userId) {
    return fetchService.fetchWithHeader("users/" + userId, "DELETE", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "users/" + userId, {
            method: 'DELETE',
            mode: 'CORS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken.token_type + " " +  userToken.access_token
            }
        });*/
}

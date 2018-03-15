/**
 * Created by jariv on 7/03/2018.
 */
const URL="http://localhost:8080/api/users/";
let userToken = JSON.parse(localStorage.getItem('userToken'));

export function postUser(data) {

    fetch(URL, {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        },
        body: data
    })
}

export function getUserByUsernameFromBackend(username) {
    return fetch(URL + "username/" + username, {
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
        });
}

export function getUserFromBackend(userId) {

    return fetch(URL + userId, {
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
        });
}

export function UpdateUser(id, data) {
    console.log("useridddd: "+ id);
    console.log(data);

    return fetch(URL + 'user/' + id, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        },
        body: data
    });
}

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
            console.log(responseJson);
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

export function getUserRoles() {

    return fetch(URL + "roles", {
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

export function deleteUser(userId) {

    return fetch(URL + userId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        }
    });
}

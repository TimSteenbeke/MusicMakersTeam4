const URL = 'https://musicmaker-api-team4.herokuapp.com/api/groups/';
//const URL = 'http://localhost:8080/api/groups/';

export function getAllGroupsFromBackend() {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "allgroups", {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " + userToken.access_token,
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


export function getGroupsByUser() {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL, {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " + userToken.access_token,
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


export function getGroupFromBackend(groupId) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + groupId, {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " + userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json()
        )
        .then((responseJson) => {
        console.log("groep: " + responseJson);
            return responseJson;
        })
        .catch((err) => {
            const group = {naam: "groep niet gevonden"};
            return group;
        });
}

export function postGroup(data) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token
        },
        body: data
    });
}

export function deleteGroup(groupId) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + groupId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token
        }
    });
}

export function updateGroup(groupId, data) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    console.log("id: " + groupId);
    console.log(data);
    return fetch(URL + 'group/' + groupId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token
        },
        body: data
    });
}
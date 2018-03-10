//const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
const URL = 'http://localhost:8080/api/';
let userToken = JSON.parse(localStorage.getItem('userToken'));

export function getGroupsFromBackend(userId) {
    return fetch(URL + "groups/" + userId, {
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

export function getAllGroupsFromBackend() {
    return fetch(URL + "groups/allgroups", {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
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
    return fetch(URL + "groups/" + groupId, {
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
            const group = {naam: "groep niet gevonden"};
            return group;
        });
}

export function postGroup(data) {
    fetch(URL + "groups", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        },
        body: data
    });
}
export function deleteGroup(groupId) {
    return fetch(URL + 'groups/' + groupId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

}

export function updateGroup(groupId, data) {
    console.log("id: " + groupId);
    console.log(data);
    return fetch(URL + 'groups/group/' + groupId, {
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
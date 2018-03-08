const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
const URL = 'localhost:8080/api/';
let userToken = JSON.parse(localStorage.getItem('userToken'));

export function getGroupsFromBackendByUser(userId) {
    return fetch(localURL + "groups/" + userId, {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log('hallo');
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {

            console.log("geen response");
            console.log(err);
        });
}

export function getGroupsFromBackend() {
    return fetch(localURL + "groups/allgroups", {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log('hallo');
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {

            console.log("geen response");
            console.log(err);
        });
}



export function getGroupFromBackend(groupId) {
    return fetch(localURL + "groups/" + groupId, {
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
    fetch(localURL + "groups", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

export function loadDataIntoEdit(groupId) {
    return fetch(localURL + "groups/" + groupId, {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log('hallo');
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            const groep = {naam: "groep niet gevonden"};
            return groep;
        });
export function deleteGroup(groupId) {
    return fetch('http://localhost:8080/api/groups/' + groupId, {
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
    return fetch('http://localhost:8080/api/groups/group/' + groupId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    });
}
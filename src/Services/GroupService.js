const herokuURL = 'https://musicmaker-api-team4.herokuapp.com/api/';
const localURL = 'localhost:8080/api/';

export function getGroupsFromBackend(userId) {
    return fetch(localURL + "groups/" + userId, {
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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

export function getAllGroupsFromBackend() {
    return fetch(localURL + "groups/", {
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
            const groep = {naam:"groep niet gevonden"};
            return groep;
        });
}

export function postGroup(data){
    fetch("http://localhost:8080/api/groups", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

//in de toekomst is dit de methode om alle data van 1 groep op te vragen, voorlopig doet bovenstaande methode hetzelfde maar moet nog aangepast worden eens Users in orde zijn
export function loadDataIntoEdit(groupId) {
    return fetch(localURL + "groups/" + groupId, {
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
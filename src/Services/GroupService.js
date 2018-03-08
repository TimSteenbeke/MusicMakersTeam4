const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';
let userToken = JSON.parse(localStorage.getItem('userToken'));

export function getGroupsFromBackend(userId) {
    return fetch(URL + "groups/" + userId, {
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

export function getAllGroupsFromBackend() {
    return fetch(URL + "groups/", {
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


//in de toekomst is dit de methode om alle data van 1 groep op te vragen, voorlopig doet bovenstaande methode hetzelfde maar moet nog aangepast worden eens Users in orde zijn
export function loadDataIntoEdit(groupId) {
    return fetch(URL + "groups/" + groupId, {
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
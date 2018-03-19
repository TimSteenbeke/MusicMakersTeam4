import * as fetchService from "./FetchService";

/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';*/

export function getAllGroupsFromBackend() {
    return fetchService.fetchWithHeader("groups/allgroups", "GET", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "groups/allgroups", {
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
        });*/
}

export function getGroupsByUser() {
    return fetchService.fetchWithHeader("groups/", "GET", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "groups/", {
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
            });*/
}

export function getGroupFromBackend(groupId) {
    return fetchService.fetchWithHeader("groups/" + groupId, "GET", {}, {naam: "groep niet gevonden"});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL +"groups/"+ groupId, {
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
            });*/
}

export function postGroup(data) {
    fetchService.fetchWithHeader("groups/", "POST", data, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    fetch(URL + "groups/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token
        },
        body: data
    });*/
}

export function deleteGroup(groupId) {
    return fetchService.fetchWithHeader("groups/" + groupId, "DELETE", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "groups/" + groupId, {
            method: 'DELETE',
            mode: 'CORS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken.token_type + " " + userToken.access_token
            }
        });*/
}

export function updateGroup(groupId, data) {
    return fetchService.fetchWithHeader("groups/group/" + groupId, "PUT", data, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        console.log("id: " + groupId);
        console.log(data);
        return fetch(URL + 'groups/group/' + groupId, {
            method: 'PUT',
            mode: 'CORS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken.token_type + " " + userToken.access_token
            },
            body: data
        });*/
}
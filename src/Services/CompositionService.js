import * as fetchService from "./FetchService";

/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';*/

export function getCompositionsFromBackend() {
    return fetchService.fetchWithHeader("compositions", "GET", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "compositions", {
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
            });*/
}

export function filterCompositions(search) {
    return fetchService.fetchWithHeader("compositions/filter/", "GET", {}, {naam: "muziekstuk niet gevonden"});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "compositions/filter/" + search, {
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
            const muziekstuk = {naam: "muziekstuk niet gevonden"};
            return muziekstuk;
        });*/
}

export function getCompositionFromBackend(compositionId) {
    return fetchService.fetchWithHeader("compositions/" + compositionId, "GET", {}, {naam: "muziekstuk niet gevonden"});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "compositions/" + compositionId, {
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
            const muziekstuk = {naam: "muziekstuk niet gevonden"};
            return muziekstuk;
        });*/
}

export function postMuziekstuk(data) {
    fetchService.fetchWithHeader("compositions/", "POST", data, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    console.log(data);
    fetch(URL + 'compositions/', {
        mode: 'corse',
        method: 'POST',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        },
        body: data
    })*/
}

export function deleteComposition(compositionId) {
    return fetchService.fetchWithHeader("compositions/" + compositionId, "DELETE", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + 'compositions/' + compositionId, {
            method: 'DELETE',
            mode: 'CORS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken.token_type + " " +  userToken.access_token,
            }
        });*/
}

export function UpdateComposition(compositionId, data) {
    return fetchService.fetchWithHeader("compositions/composition/" + compositionId, "PUT", data, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        console.log("id: " + compositionId);
        console.log(data);
        return fetch(URL + 'compositions/composition/' + compositionId, {
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
const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';

let userToken = JSON.parse(localStorage.getItem('userToken'));

export function getCompositionsFromBackend() {
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
        });
}

export function filterCompositions(search,id){
    console.log("switch id " + id);
    var url2 = "";

    switch (id){
        case '1': url2 = "title"; break;
        case '2': url2 = "genre"; break;
        case '3': url2 = "subject"; break;
        case '4': url2 = "type"; break;
        case '5': url2 = "fileformat"; break;
    }

    return fetch(URL + "compositions/" + url2 + "/" + search, {
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
        });
}

export function getCompositionFromBackend(compositionId) {
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
        });
}

export function postMuziekstuk(data) {
    console.log(data);
    fetch(URL + 'compositions/', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        },
        body: data
    })
}

export function deleteComposition(compositionId) {
    return fetch(URL + 'compositions/' + compositionId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token,
        }
    });
}

export function UpdateComposition(compositionId, data) {
    console.log("id: " + compositionId);
    console.log(data);
    return fetch(URL + 'compositions/composition/' + compositionId, {
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
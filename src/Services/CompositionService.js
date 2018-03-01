export function getCompositionsFromBackend() {
    return fetch("https://musicmaker-api-team4.herokuapp.com/api/compositions", { mode: 'cors'})
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

export function getCompositionFromBackend(compositionId) {
    return fetch("https://musicmaker-api-team4.herokuapp.com/api/compositions/" + compositionId, { mode: 'cors'})
        .then((response) => response.json()
        )
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            const muziekstuk = {naam:"muziekstuk niet gevonden"};
            return muziekstuk;
        });
}

export function postMuziekstuk(data) {
    fetch('https://musicmaker-api-team4.herokuapp.com/api/compositions/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

export function deleteComposition(compositionId) {
    return fetch('https://musicmaker-api-team4.herokuapp.com/api/compositions/' + compositionId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function UpdateComposition(compositionId, data) {
    console.log("id: " + compositionId);
    console.log(data);
    return fetch('https://musicmaker-api-team4.herokuapp.com/api/compositions/composition/' + compositionId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    });
}
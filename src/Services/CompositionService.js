export function getCompositionsFromBackend() {
    return fetch("http://localhost:8080/api/compositions", { mode: 'cors'})
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
    return fetch("http://localhost:8080/api/compositions/" + compositionId, { mode: 'cors'})
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
    fetch('http://localhost:8080/api/compositions/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

export function deleteComposition(compositionId) {
    return fetch('http://localhost:8080/api/compositions/' + compositionId, {
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
    return fetch('http://localhost:8080/api/compositions/composition/' + compositionId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    });
}
export function getCompositionsFromBackend() {
    return fetch("http://localhost:8080/api/compositions", { mode: 'cors'})
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log(responseJson);
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
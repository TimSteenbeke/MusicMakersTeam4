const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'localhost:8080/api/';
let userToken = JSON.parse(localStorage.getItem('userToken'));


export function getInstrumentenFromBackend() {
    return fetch(URL + "instruments", {
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

export function getInstrumentFromBackend(instrumentNr) {
    return fetch(URL + "instruments/" + instrumentNr, {
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
            const instrument = {naam: "instrument niet gevonden"};
            return instrument;
        });
}

export function getInstrumentSoortenFromBackend() {

    return fetch(URL + "instrumentsoorten", {
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

export function postInstrument(data) {
    fetch(URL + 'instruments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        },
        body: data
    })
}

export function deleteInstrument(instrumentId) {
    return fetch(URL + 'instruments/' + instrumentId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        }
    });
}

export function UpdateInstrument(instrumentId, data) {
    console.log(data);
    return fetch(URL + 'instruments/instrument/' + instrumentId, {
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
const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';

export function getInstrumentenFromBackend() {
    let userToken = JSON.parse(localStorage.getItem('userToken'));
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
    let userToken = JSON.parse(localStorage.getItem('userToken'));

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
    let userToken = JSON.parse(localStorage.getItem('userToken'));


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
    let userToken = JSON.parse(localStorage.getItem('userToken'));

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
    let userToken = JSON.parse(localStorage.getItem('userToken'));

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
    let userToken = JSON.parse(localStorage.getItem('userToken'));
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
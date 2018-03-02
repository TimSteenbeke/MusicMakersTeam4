/**
 * Created by Lo on 4/08/2017.
 */

export function getInstrumentenFromBackend() {

    return fetch("https://musicmaker-api-team4.herokuapp.com/api/instruments", {mode: 'cors'})
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
    return fetch("https://musicmaker-api-team4.herokuapp.com/api/instruments/" + instrumentNr, {mode: 'cors'})
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

    return fetch("https://musicmaker-api-team4.herokuapp.com/api/instrumentsoorten", {mode: 'cors'})
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
    fetch('https://musicmaker-api-team4.herokuapp.com/api/instruments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    }).catch((err) => {
        console.log("no courses found");
        console.log(err);
    });
}

export function deleteInstrument(instrumentId) {
    return fetch('https://musicmaker-api-team4.herokuapp.com/api/instruments/' + instrumentId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).catch((err) => {
        console.log("no courses found");
        console.log(err);
    });
}

export function UpdateInstrument(instrumentId, data) {
    console.log(data);
    return fetch('https://musicmaker-api-team4.herokuapp.com/api/instruments/instrument/' + instrumentId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    }).catch((err) => {
        console.log("no courses found");
        console.log(err);
    });
}
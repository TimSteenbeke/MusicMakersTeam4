import * as fetchService from "./FetchService";

/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';*/

export function getInstrumentenFromBackend() {
    return fetchService.fetchWithHeader("instruments/", "GET", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
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
        });*/
}

export function getInstrumentFromBackend(instrumentId) {
    return fetchService.fetchWithHeader("instruments/" + instrumentId, "GET", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "instruments/" + instrumentId, {
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
        });*/
}

export function getInstrumentSoortenFromBackend() {
    return fetchService.fetchWithHeader("instrumentsoorten/", "GET", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
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
            });*/
}

export function postInstrument(data) {
    fetchService.fetchWithHeader("instruments/", "POST", data, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    fetch(URL + 'instruments', {
 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        },
        body: data
    })*/
}

export function deleteInstrument(instrumentId) {
    return fetchService.fetchWithHeader("instruments/" + instrumentId, "DELETE", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + 'instruments/' + instrumentId, {
            method: 'DELETE',
            mode: 'CORS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken.token_type + " " +  userToken.access_token
            }
        });*/
}

export function UpdateInstrument(instrumentId, data) {
    return fetchService.fetchWithHeader("instruments/instrument/" + instrumentId, "PUT", data, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    console.log(data);
    return fetch(URL + 'instruments/instrument/' + instrumentId, {
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
/**
 * Created by Lo on 4/08/2017.
 */
const BASE_PATH = "backend/";


export function getInstrumentenFromBackend() {
    return fetch("http://musicmaker-api-team4.herokuapp.com/api/instruments")
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson.data;
        })
        .catch((err) => {
            console.log("geen response");
        });
}

export function getInstrumentFromBackend(instrumentNr) {
    return fetch("http://musicmaker-api-team4.herokuapp.com/api/instruments")
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.data;
        })
        .catch((err) => {
            const instrument = {naam:"instrumenten niet gevonden"};
            return instrument;
        });
}
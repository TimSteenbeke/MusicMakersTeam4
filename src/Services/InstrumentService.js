/**
 * Created by Lo on 4/08/2017.
 */

export function getInstrumentenFromBackend() {

    return fetch("http://musicmaker-api-team4.herokuapp.com/api/instruments", { mode: 'cors'})
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

export function getInstrumentFromBackend(instrumentNr) {
    return fetch("https://musicmaker-api-team4.herokuapp.com/api/instruments")
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.data;
        })
        .catch((err) => {
            const instrument = {naam:"instrumenten niet gevonden"};
            return instrument;
        });
}
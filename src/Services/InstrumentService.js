/**
 * Created by Lo on 4/08/2017.
 */

export function getInstrumentenFromBackend() {

    return fetch("https://musicmaker-api-team4.herokuapp.com/api/instruments", { mode: 'cors'})
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
    return fetch("https://musicmaker-api-team4.herokuapp.com/api/instruments/" + instrumentNr, { mode: 'cors'})
        .then((response) => response.json()
        )
        .then((responseJson) => {
        return responseJson;
        })
        .catch((err) => {
            const instrument = {naam:"instrumenten niet gevonden"};
            return instrument;
        });
}
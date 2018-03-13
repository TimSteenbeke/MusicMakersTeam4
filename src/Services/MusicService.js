import Compositions from "../Components/Compositions";

const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';

let userToken = {
    token_type: "",
    access_token: ""
};
if (localStorage.getItem('userToken') != null) {
    userToken = JSON.parse(localStorage.getItem('userToken'));
}

export function getPartituurById(partituurId) {

    return fetch(URL + "compositions/" + partituurId, {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}

export function getMusicObject(item) {
    const sampleBytes = base64ToArrayBuffer(item);
    return saveByteArray([sampleBytes]);
}

export function base64ToArrayBuffer(base64) {
    const binaryString =  window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++)        {
        let ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function saveByteArray(data) {
        const blob = new Blob(data, {type: "octet/stream"});
        return blob;
}


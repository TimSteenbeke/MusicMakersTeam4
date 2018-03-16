const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';

export function getPartituurById(partituurId) {
    let userToken = JSON.parse(localStorage.getItem('userToken'));

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


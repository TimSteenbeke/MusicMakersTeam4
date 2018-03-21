import * as fetchService from "./FetchService";


export function getPartituurById(partituurId) {
    return fetchService.fetchWithHeader("compositions/" + partituurId, "GET", {}, {});
}

export function getMusicObject(item) {
    const sampleBytes = base64ToArrayBuffer(item);
    return saveByteArray([sampleBytes]);
}

export function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        let ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function saveByteArray(data) {
    const blob = new Blob(data, {type: "octet/stream"});
    return blob;
}


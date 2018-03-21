import * as fetchService from "./FetchService";
import axios from 'axios';


export function postComposition(formdata){
    fetchService.fetchForm("compositions/", "GET",formdata,{});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    axios.post('https://musicmaker-api-team4.herokuapp.com/api/compositions/', formdata, {
        'Authorization': userToken.token_type + " " + userToken.access_token,
        "Content-Type": "multipart/form-data"
    });*/
}

export function getMyCompositionsFromBackend() {
    return fetchService.fetchWithHeader("compositions/mycompositions", "GET", {}, {});
}

export function addCompositionToMyPlaylist(compositionId){
    return fetchService.fetchWithHeader("compositions/addtoplaylist/" + compositionId , "PUT", {}, {});
}

export function getCompositionsFromBackend() {
    return fetchService.fetchWithHeader("compositions", "GET", {}, {});
}

export function filterCompositions(search) {
    return fetchService.fetchWithHeader("compositions/filter/" + search, "GET", {}, {naam: "muziekstuk niet gevonden"});
}

export function getCompositionFromBackend(compositionId) {
    return fetchService.fetchWithHeader("compositions/" + compositionId, "GET", {}, {naam: "muziekstuk niet gevonden"});
}

export function postMuziekstuk(data) {
    fetchService.fetchWithHeader("compositions/", "POST", data, {});
}

export function deleteComposition(compositionId) {
    return fetchService.fetchWithHeader("compositions/" + compositionId, "DELETE", {}, {});
}

export function UpdateComposition(compositionId, data) {
    return fetchService.fetchWithHeader("compositions/composition/" + compositionId, "PUT", data, {});
}
/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';*/

import * as fetchService from "./FetchService";

export function getCourseTypesFromBackend() {
    return fetchService.fetchWithHeader("courseTypes", "GET", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "courseTypes", {
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

export function getCourseTypeFromBackend(courseTypeNr) {
    return fetchService.fetchWithHeader("courseTypes/" + courseTypeNr, "GET", {}, {naam: "instrument niet gevonden"});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "courseTypes/" + courseTypeNr, {
            mode: 'cors',
            headers: {
                'Authorization': userToken.token_type + " " +  userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json()
            )
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
            })
            .catch((err) => {
                const courseType = {naam: "instrument niet gevonden"};
                return courseType;
            });*/
}

export function postCourseType(data) {
    fetchService.fetchWithHeader("courseTypes", "POST", data, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    fetch(URL + 'courseTypes', {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token
        },
        body: data
    })*/
}

export function deleteCourseType(courseTypeId) {
    return fetchService.fetchWithHeader("courseTypes/"+courseTypeId, "DELETE", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + 'courseTypes/' + courseTypeId, {
            method: 'DELETE',
            mode: 'CORS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken.token_type + " " + userToken.access_token
            }
        });*/
}

export function UpdateCourseType(courseTypeId, data) {
    return fetchService.fetchWithHeader("courseTypes/"+courseTypeId, "PUT", data, {});
    /*console.log(data);
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + 'courseTypes/' + courseTypeId, {
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
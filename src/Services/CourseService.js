import * as fetchService from "./FetchService";

/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
//const URL = 'http://localhost:8080/api/';*/

export function getCoursesFromBackend() {
    return fetchService.fetchWithHeader("courses", "GET", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + "courses", {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            console.log("no courses found");
            console.log(err);
        });*/
}

export function getCourseFromBackend(courseNr) {
    return fetchService.fetchWithHeader("courses/" + courseNr, "GET", {}, {beschrijving: "course niet gevonden"});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + "courses/" + courseNr, {
            mode: 'cors',
            headers: {
                'Authorization': userToken.token_type + " " + userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json()
            )
            .then((responseJson) => {
                return responseJson;
            })
            .catch((err) => {
                const course = {beschrijving: "course niet gevonden"};
                return course;
            });*/
}

export function postCourse(data) {
    fetchService.fetchWithHeader("courses/", "POST", data, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        console.log(data);
        fetch(URL + 'courses/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken.token_type + " " + userToken.access_token
            },
            body: data
        })*/
}

export function deleteCourse(courseId) {
    return fetchService.fetchWithHeader("courses/" + courseId, "DELETE", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    console.log(courseId);
    return fetch(URL + 'courses/' + courseId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token
        }
    });*/
}

export function updateCourse(courseId, data) {
    return fetchService.fetchWithHeader("courses/" + courseId, "PUT", data, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    console.log(data);
    return fetch(URL + 'courses/' + courseId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " + userToken.access_token,
        },
        body: data
    });*/
}

export function getLessonsFromCourse(courseId) {
    return fetchService.fetchWithHeader("courses/" + courseId +"/lessons", "GET",{},{})
}
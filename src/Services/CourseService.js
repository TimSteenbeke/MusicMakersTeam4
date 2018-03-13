const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';
let userToken = {
    token_type: "",
    access_token: ""
};
if (localStorage.getItem('userToken') != null) {
    userToken = JSON.parse(localStorage.getItem('userToken'));
}

export function getCoursesFromBackend() {
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
            return responseJson;
        })
        .catch((err) => {
            console.log("no courses found");
            console.log(err);
        });
}

export function getCourseFromBackend(courseNr) {
    return fetch(URL + "courses/" + courseNr, {
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
            const course = {beschrijving: "course niet gevonden"};
            return course;
        });
}

export function postCourse(data) {
    console.log(data);
    fetch(URL + 'courses/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        },
        body: data
    })
}

export function deleteCourse(courseId) {
    console.log(courseId);
    return fetch(URL + 'courses/' + courseId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token
        }
    });
}

export function updateCourse(courseId, data) {
    console.log(data);
    return fetch(URL + 'courses/' + courseId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken.token_type + " " +  userToken.access_token,
        },
        body: data
    });
}
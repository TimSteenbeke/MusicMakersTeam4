export function getCoursesFromBackend() {

    return fetch("https://musicmaker-api-team4.herokuapp.com/api/courses", {mode: 'cors'})
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

export function postCourse(data) {


    fetch('https://musicmaker-api-team4.herokuapp.com/api/courses', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

export function deleteCourse(courseId) {
    console.log(courseId);
    return fetch('https://musicmaker-api-team4.herokuapp.com/api/courses/' + courseId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function updateCourse(courseId, data) {
    console.log(data);
    return fetch('https://musicmaker-api-team4.herokuapp.com/api/courses/' + courseId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    });
}
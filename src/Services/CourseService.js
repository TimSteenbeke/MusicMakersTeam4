/**
 * Created by Ben on 27/02/2018.
 */
export function getCoursesFromBackend() {

    return fetch("https://musicmaker-api-team4.herokuapp.com/api/courses", { mode: 'cors'})
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
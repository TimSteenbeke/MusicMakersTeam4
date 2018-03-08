/**
 * Created by Ben on 28/02/2018.
 */
const herokuURL = 'https://musicmaker-api-team4.herokuapp.com/api/';


export function registerAbsent(lessonid) {
    return fetch(herokuURL + 'lesson/absent/' +lessonid,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
            console.log("geen response");
            console.log(err);
        });

}

export function registerPresent(lessonid) {
    return fetch(herokuURL + 'lesson/present/' +lessonid,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
            console.log("geen response");
            console.log(err);
        });
}

export function getAttendanceStatus(lessonid) {
    return fetch(herokuURL + 'lesson/attendancestatus/' +lessonid,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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
            console.log("geen response");
            console.log(err);
        });
}

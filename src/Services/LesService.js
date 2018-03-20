import * as fetchService from "./FetchService";

/*const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';*/

export function registerAbsent(lessonid) {
    fetchService.fetchWithHeader("lesson/absent/" + lessonid, "POST", {}, {});
    /*let userToken = JSON.parse(localStorage.getItem('userToken'));
    return fetch(URL + 'lesson/absent/' +lessonid,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization':  userToken.token_type + " " +  userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });*/
}

export function registerPresent(lessonid) {
    fetchService.fetchWithHeader("lesson/present/" + lessonid, "POST", {}, {});
    /*    let userToken = JSON.parse(localStorage.getItem('userToken'));
        return fetch(URL + 'lesson/present/' +lessonid,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization':  userToken.token_type + " " +  userToken.access_token,
                    'Content-Type': 'application/json'
                }
            })
            .catch((err) => {
                console.log("geen response");
                console.log(err);
            });*/
}

export function getAttendanceStatus(lessonid) {
   return fetchService.fetchWithHeader("lesson/attendancestatus/" + lessonid, "GET", {}, {});
}

export function postLesson(data) {
    fetchService.fetchWithHeader("lesson", "POST", data, {});
}

export function getLessons() {
    fetchService.fetchWithHeader("lesson", "GET", {}, {});
}

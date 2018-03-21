import * as fetchService from "./FetchService";

export function registerAbsent(lessonid) {
    fetchService.fetchWithHeader("lesson/absent/" + lessonid, "POST", {}, {});
}

export function registerPresent(lessonid) {
    fetchService.fetchWithHeader("lesson/present/" + lessonid, "POST", {}, {});
}

export function getAttendanceStatus(lessonid) {
   return fetchService.fetchWithHeader("lesson/attendancestatus/" + lessonid, "GET", {}, {});
}

export function postLesson(data) {
    fetchService.fetchWithHeader("lesson", "POST", data, {});
}

export function deleteLesson(lessonid) {
    return fetchService.fetchWithHeader("lesson/" + lessonid, "DELETE", {}, {});
}

export function getLessons() {
    return fetchService.fetchWithHeader("lesson", "GET", {}, {});
}

export function updateLesson(lessonid, data) {
    return fetchService.fetchWithHeader("lesson/lesson/" + lessonid, "PUT", data, {});
}

export function getLesson(lessonid) {
    return fetchService.fetchWithHeader("lesson/" + lessonid, "GET", {}, {});
}


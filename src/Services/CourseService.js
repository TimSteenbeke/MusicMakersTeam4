import * as fetchService from "./FetchService";


export function getCoursesFromBackend() {
    return fetchService.fetchWithHeader("courses", "GET", {}, {});
}

export function getCourseFromBackend(courseNr) {
    return fetchService.fetchWithHeader("courses/" + courseNr, "GET", {}, {beschrijving: "course niet gevonden"});
}

export function postCourse(data) {
    console.log("data: ",data);
    fetchService.fetchWithHeader("courses", "POST", data, {});
}

export function deleteCourse(courseId) {
    return fetchService.fetchWithHeader("courses/" + courseId, "DELETE", {}, {});
}

export function updateCourse(courseId, data) {
    return fetchService.fetchWithHeader("courses/" + courseId, "PUT", data, {});
}

export function getLessonsFromCourse(courseId) {
    return fetchService.fetchWithHeader("courses/" + courseId +"/lessons", "GET",{},{})
}

export function getMyCourses() {
    return fetchService.fetchWithHeader("mycourses", "GET", {}, {});
}
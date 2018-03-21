import * as fetchService from "./FetchService";

const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
// const URL = 'http://localhost:8080/api/';

export function getCourseTypesFromBackend() {
    return fetchService.fetchWithHeader("courseTypes", "GET", {}, {});
}

export function getCourseTypeFromBackend(courseTypeId) {
    return fetchService.fetchWithHeader("courseTypes/" + courseTypeId, "GET", {}, {naam: "instrument niet gevonden"});
}

export function postCourseType(data) {
    fetchService.fetchWithHeader("courseTypes", "POST", data, {});
}

export function deleteCourseType(courseTypeId) {
    return fetchService.fetchWithHeader("courseTypes/" + courseTypeId, "DELETE", {}, {});
}

export function UpdateCourseType(courseTypeId, data) {
    return fetchService.fetchWithHeader("courseTypes/" + courseTypeId, "PUT", data, {});
}
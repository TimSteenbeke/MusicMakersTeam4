import * as fetchService from "./FetchService";


export function registerAbsent(performanceid) {
    return fetchService.fetchWithHeader("performance/absent/" + performanceid, "POST", {}, {});
}

export function registerPresent(performanceid) {
    return fetchService.fetchWithHeader("performance/present/" + performanceid, "POST", {}, {});
}

export function getAttendanceStatus(performanceid) {
    return fetchService.fetchWithHeader("performance/attendancestatus/" + performanceid, "GET", {}, {});
}
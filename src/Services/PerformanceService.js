import * as fetchService from "./FetchService";

export function postPerformance(data) {
    fetchService.fetchWithHeader("performance", "POST", data, {});
}

export function getPerformance(performanceId) {
    return fetchService.fetchWithHeader("performance/" + performanceId, "GET", {}, {});
}

export function getAllPerformances() {
    return fetchService.fetchWithHeader("performance/", "GET",{}, {});
}

export function deletePerformance(performanceId) {
    fetchService.fetchWithHeader("performance/"+performanceId, "DELETE", {}, {});
}

export function updatePerformance(performanceId,data) {
    fetchService.fetchWithHeader("performance/performance/" + performanceId, "PUT", data, {});
}

export function registerUserPresent(performanceid) {
    fetchService.fetchWithHeader("performance/present/"+ performanceid, "POST", {}, {});
}

export function registerUserAbsent(performanceid) {
    fetchService.fetchWithHeader("performance/absent/"+ performanceid, "POST", {}, {});
}

export function getAttendanceStatus(performanceid) {
    return fetchService.fetchWithHeader("performance/attendancestatus/"+ performanceid, "GET", {}, {});
}



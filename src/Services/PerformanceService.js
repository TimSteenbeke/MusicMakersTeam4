import * as fetchService from "./FetchService";

export function postPerformance(data) {
    fetchService.fetchWithHeader("performance", "POST", data, {});
}

export function getPerformance(performanceId) {
    fetchService.fetchWithHeader("performance/" + performanceId, "GET", {}, {});
}

export function getAllPerformances() {
    fetchService.fetchWithHeader("performance", "GET",{}, {});
}

export function deletePerformance(performanceId) {
    fetchService.fetchWithHeader("performance/"+performanceId, "DELETE", {}, {});
}

export function updatePerformance(performanceId) {
    fetchService.fetchWithHeader("performance/performance/" + performanceId, "PUT", data, {});
}

export function registerUserPresent(performanceid) {
    fetchService.fetchWithHeader("performance/present/"+ performanceid, "POST", {}, {});
}

export function registerUserAbsent(performanceid) {
    fetchService.fetchWithHeader("performance/absent/"+ performanceid, "POST", {}, {});
}

export function getAttendanceStatus(performanceid) {
    fetchService.fetchWithHeader("performance/attendancestatus/"+ performanceid, "GET", {}, {});
}



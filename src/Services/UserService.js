import * as fetchService from "./FetchService";


export function postUser(data) {
    fetchService.fetchWithHeader("users", "POST", data, {});
}

export function getUserByUsernameFromBackend() {
    return fetchService.fetchWithHeader("users/loggedin", "GET", {}, {naam: "User niet gevonden"});
}


export function getUserFromBackend(userId) {
    return fetchService.fetchWithHeader("users/" + userId, "GET", {}, {naam: "User niet gevonden"});
}

export function UpdateUser(id, data) {
    return fetchService.fetchWithHeader("users/user/" + id, "PUT", data, {});
}

export function getTeachers() {
    return fetchService.fetchWithHeader("users/teacherAdmin", "GET", {}, {});
}

export function getStudents() {
    return fetchService.fetchWithHeader("users/students", "GET", {}, {});
}

export function getAll() {
    return fetchService.fetchWithHeader("users/", "GET", {}, {});
}

export function getUserRoles() {
    return fetchService.fetchWithHeader("users/roles", "GET", {}, {});
}

export function deleteUser(userId) {
    return fetchService.fetchWithHeader("users/" + userId, "DELETE", {}, {});
}

export function getRolesCurrentUser() {
    return fetchService.fetchWithHeader("users/userroles", "GET", {}, {});
}
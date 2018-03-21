import * as fetchService from "./FetchService";

export function getAllGroupsFromBackend() {
    return fetchService.fetchWithHeader("groups/allgroups", "GET", {}, {});
}

export function getGroupsByUser() {
    return fetchService.fetchWithHeader("groups/", "GET", {}, {});
}

export function getGroupFromBackend(groupId) {
    return fetchService.fetchWithHeader("groups/" + groupId, "GET", {}, {naam: "groep niet gevonden"});
}

export function postGroup(data) {
    fetchService.fetchWithHeader("groups/", "POST", data, {});
}

export function deleteGroup(groupId) {
    return fetchService.fetchWithHeader("groups/" + groupId, "DELETE", {}, {});
}

export function updateGroup(groupId, data) {
    return fetchService.fetchWithHeader("groups/group/" + groupId, "PUT", data, {});
}
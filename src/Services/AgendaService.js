import * as fetchService from "./FetchService";

export function getMyAgenda() {
    return fetchService.fetchWithHeader("agenda", "GET", {}, {});
}

export function getOtherAgenda(userid) {
    return fetchService.fetchWithHeader("agenda/"+userid, "GET", {}, {});
}

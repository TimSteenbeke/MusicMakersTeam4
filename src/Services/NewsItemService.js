import * as fetchService from "./FetchService";

export function getNewsItemsFromBackend() {
    return fetchService.fetchWithHeader("newsitems", "GET", {}, {});
}

export function getNewsItemFromBackend(newsitemId) {
    return fetchService.fetchWithHeader("newsitems/" + newsitemId, "GET", {}, {naam: "Melding niet gevonden"});
}

export function postNewsItem(data) {
    fetchService.fetchWithHeader("newsitems/", "POST", data, {});
}

export function deleteNewsItem(newsitemId) {
    return fetchService.fetchWithHeader("newsitems/" + newsitemId, "DELETE", {}, {});
}

export function updateNewsItem(newsitemId, data) {
    return fetchService.fetchWithHeader("newsitems/newsitem/" + newsitemId, "PUT", data, {});
}
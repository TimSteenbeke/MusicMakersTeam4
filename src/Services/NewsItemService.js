import * as fetchService from "./FetchService";

export function getNewsItemsFromBackend() {
    return fetchService.fetchWithHeader("newsitems", "GET", {}, {});
}

export function postInstrument(data) {
    fetchService.fetchWithHeader("newsitems/", "POST", data, {});
}
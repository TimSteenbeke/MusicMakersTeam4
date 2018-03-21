import * as fetchService from "./FetchService";


export function postInstrumentLevel(data) {
    fetchService.fetchWithHeader("instrumentlevels/", "POST", data, {});

}
import * as fetchService from "./FetchService";


export function postInstrumentLevel(data) {
    fetchService.fetchWithHeader("instrumentlevels/", "POST", data, {});

}

export function deleteInstrumentLevel(instrumentLevelId){
    return fetchService.fetchWithHeader("instrumentlevels/" + instrumentLevelId, "DELETE", {}, {});
}

export function increaseLevel(instrumentLevelId){
    return fetchService.fetchWithHeader("instrumentlevels/instrumentlevelup/" + instrumentLevelId, "POST", {}, {});

}

export function decreaseLevel(instrumentLevelId){
    return fetchService.fetchWithHeader("instrumentlevels/instrumentleveldown/" + instrumentLevelId, "POST", {}, {});

}
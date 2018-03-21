import * as fetchService from "./FetchService";

export function getInstrumentenFromBackend() {
    return fetchService.fetchWithHeader("instruments/", "GET", {}, {});
}

export function getMyInstrumentenLevelsFromBackend() {
    return fetchService.fetchWithHeader("users/myinstrumentlevels/", "GET", {}, {});
}

export function getInstrumentenLevelsFromBackend() {
    return fetchService.fetchWithHeader("instrumentlevels/", "GET", {}, {});
}

export function getInstrumentenLevelFromBackend(instrumentLevelId) {
    return fetchService.fetchWithHeader("instrumentlevels/" + instrumentLevelId, "GET", {}, {});
}

export function UpdateInstrumentLevel(instrumentLevelId, data) {
    return fetchService.fetchWithHeader("instrumentlevels/instrumentlevel/" + instrumentLevelId, "PUT", data, {});
}

export function getInstrumentFromBackend(instrumentId) {
    return fetchService.fetchWithHeader("instruments/" + instrumentId, "GET", {}, {});
}

export function getLevelsFromBackend() {
    return fetchService.fetchWithHeader("instrumentlevels/", "GET", {}, {});
}

export function getInstrumentSoortenFromBackend() {
    return fetchService.fetchWithHeader("instrumentsoorten/", "GET", {}, {});
}

export function postInstrument(data) {
    fetchService.fetchWithHeader("instruments/", "POST", data, {});
}

export function deleteInstrument(instrumentId) {
    return fetchService.fetchWithHeader("instruments/" + instrumentId, "DELETE", {}, {});
}

export function UpdateInstrument(instrumentId, data) {
    return fetchService.fetchWithHeader("instruments/instrument/" + instrumentId, "PUT", data, {});
}
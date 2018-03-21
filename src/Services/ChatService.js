import * as fetchService from "./FetchService";

export function getChatroomHistory(chatroom) {
    return fetchService.fetchWithHeader("message/chatroom/" + chatroom, "GET", {}, {});
}

export function getFullHistory() {
    return fetchService.fetchWithHeader("message", "GET", {}, {});
}

export function postChatroomMessage(data){
    return fetchService.fetchWithHeader("message/", "POST", data, {});
}
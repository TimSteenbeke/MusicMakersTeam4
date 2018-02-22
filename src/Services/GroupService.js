
export function getGroupsFromBackend(userId) {
    return fetch("https://musicmaker-api-team4.herokuapp.com/api/groups/" + userId, { mode: 'cors'})
        .then((response) =>
            response.json())
        .then((responseJson) => {
        console.log('hallo');
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {

            console.log("geen response");
            console.log(err);
        });
}


//in de toekomst is dit de methode om alle data van 1 groep op te vragen, voorlopig doet bovenstaande methode hetzelfde maar moet nog aangepast worden eens Users in orde zijn
export function loadDataIntoEdit(groupId){
    return fetch("https://musicmaker-api-team4.herokuapp.com/api/groups/" + groupId, {mode:'cors'})
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log('hallo');
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {

            console.log("geen response");
            console.log(err);
        });
}
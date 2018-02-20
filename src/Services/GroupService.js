export function getGroupsFromBackend() {
    return fetch("http://localhost:59381/api/groups/1", {mode: 'cors'})
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {

            console.log("no response");
            console.log(err);
        });
}

export function getPartituurById(partituurId) {

    return fetch("BackendJsonSimulated/" + partituurId + ".json")
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}
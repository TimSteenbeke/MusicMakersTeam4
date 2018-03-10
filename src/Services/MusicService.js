let userToken = JSON.parse(localStorage.getItem('userToken'));

export function getPartituurById(partituurId) {

    return fetch("https://musicmaker-api-team4.herokuapp.com/api/compositions/" + partituurId, {
        mode: 'cors',
        headers: {
            'Authorization': userToken.token_type + " " +  userToken.access_token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
        console.log("hallp");
        console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}
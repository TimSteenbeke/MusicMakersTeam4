
export function GetToken(username,password) {

    return fetch("https://musicmaker-api-team4.herokuapp.com/api/login/" + username+"," + password, { mode: 'cors'})
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {

            console.log("geen response");
            console.log(err);
        });
}

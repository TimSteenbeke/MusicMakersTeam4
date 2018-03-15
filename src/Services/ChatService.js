// const URL = 'https://musicmaker-api-team4.herokuapp.com/';
const URL = 'http://localhost:8080/';
let userToken = JSON.parse(localStorage.getItem('userToken'));

export function getHistory(){
    return fetch(URL + 'history',
        {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Authorization': userToken.token_type + " " + userToken.access_token,
            }
        })
        .then((response) =>{
            console.log("response history: ");
            console.log(response);
        })
/*        .then((responseJson) => {
            console.log(responseJson);
            return responseJson;
        })*/
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}

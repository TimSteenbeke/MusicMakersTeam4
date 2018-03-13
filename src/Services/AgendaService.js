
const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
 const localURL = 'http://localhost:8080/api/';
let userToken = {
    token_type: "",
    access_token: ""
};
if (localStorage.getItem('userToken') != null) {
    userToken = JSON.parse(localStorage.getItem('userToken'));
}


export function getMyAgenda() {
    return fetch(URL + 'agenda',
        {
            mode: 'cors',
            headers: {
                'Authorization': userToken.token_type + " " +  userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
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


export function getOtherAgenda(userid) {
    return fetch(URL + 'agenda/' + userid,
        {
            mode: 'cors',
            headers: {
                'Authorization': userToken.token_type + " " +  userToken.access_token,
                'Content-Type': 'application/json'
            }
        })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            console.log('other agenda opgevraagd');
            console.log(responseJson);
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}

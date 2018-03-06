//const URL = 'https://musicmaker-api-team4.herokuapp.com/api/';
const URL = 'localhost:8080/api/';

export function getAgendaById(agendaId) {
    return fetch(URL + 'agenda/' + agendaId,
        {
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
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

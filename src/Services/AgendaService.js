const herokuURL = 'https://musicmaker-api-team4.herokuapp.com/api/';
const localURL = 'localhost:8080/api/';

export function getAgendaById(agendaId) {
    return fetch(localURL + 'agenda/' + agendaId,
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

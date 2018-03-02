
export function getAgendaById(agendaId) {

    return fetch("https://musicmaker-api-team4.herokuapp.com/api/agenda/" + agendaId, { mode: 'cors'})
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

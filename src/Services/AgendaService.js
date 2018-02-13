
export function getAgendaById(agendaId) {

    return fetch("http://localhost:49847/api/agenda/" + agendaId, { mode: 'cors'})
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

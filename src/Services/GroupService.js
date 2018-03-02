
export function getGroupsFromBackend() {
    return fetch("http://localhost:8080/api/groups/allgroups", {mode: 'cors'})
        .then((response) =>
            response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            console.log("geen response");
            console.log(err);
        });
}

export function getGroupFromBackend(groupId) {
    return fetch("http://localhost:8080/api/groups/" + groupId, { mode: 'cors'})
        .then((response) => response.json()
        )
        .then((responseJson) => {
            return responseJson;
        })
        .catch((err) => {
            const groep = {naam:"groep niet gevonden"};
            return groep;
        });
}


export function postGroup(data){
    fetch("http://localhost:8080/api/groups", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
}

export function deleteGroup(groupId) {
    return fetch('http://localhost:8080/api/groups/' + groupId, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function updateGroup(groupId, data) {
    console.log("id: " + groupId);
    console.log(data);
    return fetch('http://localhost:8080/api/groups/' + groupId, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    });
}
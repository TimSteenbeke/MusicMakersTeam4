/**
 * Created by jariv on 27/02/2018.
 */
import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import * as UserService from '../Services/UserService';
import * as LoginService from '../Services/LoginService';
import * as GroupService from '../Services/GroupService.js';
import * as AgendaService from '../Services/AgendaService.js';

import Redirect from "react-router-dom/es/Redirect";
import {Button, Icon,Card,CardTitle,CardPanel} from 'react-materialize';

class GroupsAndChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: "",
            firstname: "",
            lastname: "",
            groups: [],
            items: [],
        };
    }

    componentDidMount(){
        UserService.getUserByUsernameFromBackend().then(users => {
            this.setState(
                {
                    username: users.username,
                    firstname: users.firstname,
                    lastname: users.lastname,
                }
                );
        });
        GroupService.getGroupsByUser().then(groups => {
            console.log("groeps:"  + groups);
            this.setState({groups: groups});
        });
        this.getMyAgendaItems();
    }

    getMyAgendaItems = () => {
        //HARDCODED ID (TEMPORARY)
        AgendaService.getMyAgenda().then(agendaItems => {
            this.mapAgendaItems(agendaItems)
        });
    };

    mapAgendaItems = (agendaItems) => {
        if (agendaItems !== undefined) {
            let AgendaItems= [];
            //Eigenaar toewijzen (Agenda van: ....)
            // this.setState({agendaOwner: agendaItems.agendaEigenaar})
            console.log(agendaItems);


            //Over lessons loopen en info in AgendaItem steken
            //type en basic info
            for (let i= 0; i < agendaItems.lessons.length; i++) {
                let les = {
                    id: agendaItems.lessons[i].lessonId ,
                    name: "Les coming soon (relatie ligt nog niet)",
                    startDateTime: new Date(agendaItems.lessons[i].startDateTime),
                    endDateTime: new Date(agendaItems.lessons[i].endDateTime),
                    type: 'Les',
                    classes: 'color-1'
                };
                AgendaItems.push(les);
            }

            //over performances loopen en info in AgendaItem steken
            //type en basic info
            for (let x= 0; x < agendaItems.performances.length; x++) {
                let optreden = {
                    id: agendaItems.performances[x].performanceId,
                    name: agendaItems.performances[x].beschrijving,
                    startDateTime: new Date(agendaItems.performances[x].startDateTime),
                    endDateTime: new Date(agendaItems.performances[x].endDateTime),
                    type: 'Optreden',
                    classes: 'color-2'
                };
                AgendaItems.push(optreden);
            }

            this.setState({items: AgendaItems});
        }
    };

    userLogout = () => {
        let response = LoginService.logout();

        console.log("responseee:" + response);

        if(response){
            this.setState({redirect: true});
        }
    };

    render() {
        let redirecting = null;

        if (this.state.redirect) {
            redirecting = <Redirect to='/'/>
        }

        return (
            <div className="containerCss">
                <CardPanel className="teal lighten-4 black-text">
                    <h6>Welkom, {this.state.firstname}!</h6>
                    <br/>
                    <h5>Mijn groepen:</h5>
                    <ul className="browser-default">
                    { this.state.groups && this.state.groups.length > 0 ?
                        this.state.groups.map((group, index) => (
                            <li>{group.name}</li>
                        ))
                        : <span>Geen groepen
                        </span>
                    }
                    </ul>
                    <br/>
                    <h5>Planning:</h5>
                    <ul className="browser-default">
                    { this.state.items && this.state.items.length > 0 ?
                        this.state.items.map((item, index) => (
                            <li>{item.name}</li>
                        ))
                        : <span>Geen planning</span>
                    }
                    </ul>
                    <br/>
                    <input type="button" value="Uitloggen" className="btn center" onClick={this.userLogout}/>
                </CardPanel>
                {redirecting}
            </div>
        );
    }
}

export default GroupsAndChat;
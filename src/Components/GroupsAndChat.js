/**
 * Created by jariv on 27/02/2018.
 */
import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import * as UserService from '../Services/UserService';
import * as LoginService from '../Services/LoginService';
import * as GroupService from '../Services/GroupService.js';
import * as AgendaService from '../Services/AgendaService.js';
import Moment from 'react-moment';
import swal from 'sweetalert2';


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
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Uitgelogd!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    render() {
        let redirecting = null;

        if (this.state.redirect) {
            redirecting = <Redirect to='/'/>
        }

        return (
            <div>
            <div className="containerCss">
                    <CardPanel className="white black-text">
                        <div className="row">
                            <div className="col s12 m12 l12 center">
                                <h4 >Welkom, {this.state.firstname}!</h4>
                            </div>
                            <div className="col s12 m12 l12">
                                <h5><i className="material-icons small">groups</i>Mijn groepen</h5>
                                { this.state.groups && this.state.groups.length > 0 ?
                                    this.state.groups.map((group, index) => (
                                        <span><i className="material-icons tiny">arrow_forward</i> {group.name}<br/></span>
                                    ))
                                    : <span>Geen groepen!<br/></span>
                                }
                            </div>
                            <div className="col s12 m12 l12" style={{marginBottom:15}}>
                                <h5><i className="material-icons small">date_range</i> Agenda:</h5>
                                { this.state.items && this.state.items.length > 0 ?
                                    this.state.items.map((item, index) => (
                                        <span><i className="material-icons tiny">check</i> {item.startDateTime.getDate()}-{item.startDateTime.getMonth() + 1}-{item.startDateTime.getFullYear()} {item.startDateTime.getHours()}:{item.startDateTime.getMinutes()}<br/>
                                <span><i className="material-icons tiny">trending_flat</i> {item.name}</span><br/><br/></span>
                                    ))
                                    : <span>Geen agenda!<br/></span>
                                }
                            </div>

                            <div className="col s12 m12 l12">
                                <input type="button" value="Uitloggen" className="btn right" onClick={this.userLogout}/>

                            </div>
                        </div>
                    </CardPanel>
            </div>
                {redirecting}
            </div>
        );
    }
}

export default GroupsAndChat;
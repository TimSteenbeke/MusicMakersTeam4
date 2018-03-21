import React, {Component} from 'react';
import * as UserService from '../../Services/UserService';
import * as LoginService from '../../Services/LoginService';
import * as GroupService from '../../Services/GroupService.js';
import * as AgendaService from '../../Services/AgendaService.js';
import swal from 'sweetalert2';
import { CardPanel} from 'react-materialize';
import "./GroupsAndChat.css";
import {Link} from 'react-router-dom';


export default class GroupsAndChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            groups: [],
            items: [],
            agendaItems: []
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
            this.setState({groups: groups});
        });
        console.log("groups");
        console.log(this.state.groups.newsItems);

        this.getMyAgendaItems();
    }

    getMyAgendaItems = () => {
        AgendaService.getMyAgenda().then(agendaItems => {
           this.setState({agendaItems: agendaItems}
           ,() => {this.mapAgendaItems(this.state.agendaItems)})
        });
    };

    mapAgendaItems = (agendaItems) => {
        if (agendaItems == undefined) {
            let AgendaItems= [];

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
                                <div className="collection">
                                    { this.state.groups && this.state.groups.length > 0 ?
                                        this.state.groups.map((group, index) => (
                                            <Link key={index} className="collection-item" to={`/mygroupdetails/${group.groupid}`}><span className="badge">1</span>{group.name}</Link>
                                        ))
                                        :  <a className="collection-item">Geen groepen!</a>
                                    }
                                </div>
                            </div>
                            <div className="col s12 m12 l12" style={{marginBottom:15}}>
                                <h5><i className="material-icons small">date_range</i> Agenda:</h5>
                                { this.state.items && this.state.items.length > 0 ?
                                    this.state.items.map((item, index) => (
                                        <span key={index}><i className="material-icons tiny">check</i> {item.startDateTime.getDate()}-{item.startDateTime.getMonth() + 1}-{item.startDateTime.getFullYear()} {item.startDateTime.getHours()}:{item.startDateTime.getMinutes()}<br/>
                                <span><i className="material-icons tiny">trending_flat</i> {item.name}</span><br/><br/></span>
                                    ))
                                    : <span>Geen agenda!<br/></span>
                                }
                            </div>
                        </div>
                    </CardPanel>
            </div>
            </div>
        );
    }
}
import React, {Component} from 'react';
import { ReactAgenda , guid ,ReactAgendaCtrl, Modal } from 'react-agenda';
import * as AgendaService from '../Services/AgendaService'
import ActivityPopUp from './ActivityPopUp.js';
import Header from './Header';
import {Row, Input} from 'react-materialize'
import * as UserService from '../Services/UserService.js'

require('moment/locale/nl.js');


let colors= {
    'color-1': '#242728' ,
    'color-2': '#242728' ,
    'color-3': '#242728' ,
};

let now = new Date();



let AgendaItem = function(props){
    console.log( 'ik ga renderen:' , props);
    console.log(props);
    return <div className="agendaItem">
        <h6 className="white-text">{props.item.name}</h6>
        <p className="white-text">leerkracht: {props.leerkrachten}</p>
        <ActivityPopUp id={props.item.id} type={props.item.type}/>
    </div>
};

class Agenda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selected:[],
            cellHeight:30,
            showModal:false,
            locale:"nl",
            rowsPerHour:2,
            numberOfDays:4,
            startDate: new Date(),
            agendaItems: [],
            agendaOwner: "",
            selectableUsers: []
        };
    }

    updateComponent = () =>{
        this.getUserRoles();
        this.getUsers();
        this.getMyAgendaItems();
    };

    componentDidMount() {
        //Ajax call to get user his role
        //If role = admin => extra features (change state)
        this.getUserRoles();
        this.getUsers();
        this.getMyAgendaItems();
    }


    getUserRoles =() => {
        UserService.getUserRoles();
    };

    getUsers = () => {
        UserService.getAll().then(console.log("----Teachers---- \n"))
            .then(users => {
                this.setState({selectableUsers: users.users}, console.log(users.users));
            });
    };

    getMyAgendaItems = () => {
        //HARDCODED ID (TEMPORARY)
        AgendaService.getMyAgenda().then(agendaItems => {
            this.mapAgendaItems(agendaItems)
        });
    };

    mapAgendaItems = (agendaItems) => {
        if (agendaItems != undefined) {
            let AgendaItems= [];
            //Eigenaar toewijzen (Agenda van: ....)
            // this.setState({agendaOwner: agendaItems.agendaEigenaar})
            console.log(agendaItems);


            //Over lessons loopen en info in AgendaItem steken
            //type en basic info
            for (let i= 0; i < agendaItems.lessons.length; i++) {
                let les = {
                    _id: guid(),
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
                    _id: guid(),
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


    setSelectedUser = (event,value) => {
        console.log(value);
        let user = event.target.value;
        this.setState({'requesteduser':user});
        AgendaService.getOtherAgenda(this.state.requesteduser).then(agendaitems => {
            this.mapAgendaItems(agendaitems);
        });
    };




    render() {
        //Load extra components based on state

        return  (
            <div>
                        <Header name="Agenda"/>
                        <section className="containerCss">
                            <div className="section">
                                <div className="row">
                                    <div className="col s3 m3 l3">
                                        <h5 className="truncate">Studenten</h5>
                                    </div>
                                    <div className="col s9 m9 l9">
                                        <Row>
                                            <Input s={12} multiple={false} type='select' label="Gebruikers"  onChange={this.setSelectedUser}
                                                   icon='child_care' defaultValue='1'>
                                                <option key="" value="" disabled>Kies de studenten</option>
                                                {this.state.selectableUsers.map((user, index) => (
                                                    <option key={user.userid}
                                                            value={user.userid}>{user.firstname} {user.lastname}</option>
                                                ))}
                                            </Input>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            <ReactAgenda
                                minDate={now}
                                maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
                                disablePrevButton={false}
                                startDate={this.state.startDate}
                                cellHeight={this.state.cellHeight}
                                locale={this.state.locale}
                                items={this.state.items}
                                numberOfDays={this.state.numberOfDays}
                                rowsPerHour={this.state.rowsPerHour}
                                itemColors={colors}
                                autoScale={false}
                                fixedHeader={true}
                                itemComponent={AgendaItem}
                            />
                        </section>
                    </div>
        );
    }
}

export default Agenda;
/**
 * Created by Ben on 28/02/2018.
 */
import React, {Component} from 'react';
import {ReactAgenda, guid} from 'react-agenda';
import * as LesService from '../Services/LesService.js'
import * as OptredenService from '../Services/OptredenService.js'


class ActivityPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aanwezigheidsstatus: 'Te beslissen',
            icon: 'notifications'
        };

    }

    componentDidMount() {
        //Call maken om te zien of persoon aanwezig of afwezig is voor die les
        //State verranderen
        this.getStatus();

    }

    getStatus() {
        if (this.props.type == "Optreden") {
            OptredenService.getAttendanceStatus(this.props.id).then(statusobject => {
                this.setState({aanwezigheidsstatus: statusobject.status});
                console.log(this.state.aanwezigheidsstatus);
            })
        } else {
            LesService.getAttendanceStatus(this.props.id).then(statusobject => {
                this.setState({aanwezigheidsstatus: statusobject.status});
                console.log(this.state.aanwezigheidsstatus);
            })
        }
    }

    aanwezig() {
        console.log(this.props);
        let id = this.props.id;
        this.setState({
            icon: 'check'
        });
        if (this.props.type == "Optreden") {
            OptredenService.registerPresent(id);
        } else {
            LesService.registerPresent(id);
        }
    }

    afwezig() {
        console.log(this.props);
        let id = this.props.id;
        this.setState({
            icon: 'not_interested'
        });
        if (this.props.type == "Optreden") {
            OptredenService.registerAbsent(id);
        } else {
            LesService.registerAbsent(id);
        }
    }

    render() {
        return (
            <div>
                {/*Popup*/}
                <a className="waves-effect waves-light deep-orange darken-4 btn"><i className="material-icons left">{this.state.icon}</i>{this.state.aanwezigheidsstatus}
                </a>
            </div>
        );
    }
}

export default ActivityPopUp;

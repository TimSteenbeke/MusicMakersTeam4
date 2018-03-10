/**
 * Created by Ben on 28/02/2018.
 */

import React, {Component} from 'react';
import {ReactAgenda, guid} from 'react-agenda';
import * as LesService from '../Services/LesService.js'
import * as OptredenService from '../Services/OptredenService.js'
import swal from 'sweetalert2'


class ActivityPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aanwezigheidsstatus: "Te beslissen",
            icon: 'notifications'
        };

    }

    componentDidMount() {
        //Call maken om te zien of persoon aanwezig of afwezig is voor die les
        //State verranderen
        this.getStatus();

    }

    getStatus = () => {
        if (this.props.type == "Optreden") {
            OptredenService.getAttendanceStatus(this.props.id).then(statusobject => {
                this.setState({aanwezigheidsstatus: statusobject.status});
                this.setIcon(statusobject.status);
                console.log(this.state.aanwezigheidsstatus);
            })
        } else {
            LesService.getAttendanceStatus(this.props.id).then(statusobject => {
                this.setState({aanwezigheidsstatus: statusobject.status});
                this.setIcon(statusobject.status);
                console.log(this.state.aanwezigheidsstatus);
            })
        }
    };

    setIcon = (status) => {
        console.log(status);
        if (status === "absent"){
            this.setState({
                icon: 'not_interested'
            });
        }else if(status === "present"){
            this.setState({
                icon: 'check'
            });
        }else{
            this.setState({
                icon: 'notifications'
            });
        }
    };

    aanwezig = () => {
        console.log(this.props);
        let id = this.props.id;
        if (this.props.type == "Optreden") {
            OptredenService.registerPresent(id);

        } else {
            LesService.registerPresent(id);
        }
    };

    afwezig = () => {
        console.log(this.props);
        let id = this.props.id;
        if (this.props.type == "Optreden") {
            OptredenService.registerAbsent(id);
        } else {
            LesService.registerAbsent(id);
        }
    };

    setAanwezigheid = () =>{
        swal({
            title: 'Aanwezigheid?',
            text: "Kies je status voor deze les!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aanwezig!',
            cancelButtonText: 'Afwezig!',
            confirmButtonClass: 'btn green',
            cancelButtonClass: 'btn red marginator',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                swal(
                    'Aanwezig!',
                    'Je bent aanwezig op deze les.',
                    'success'
                );
                this.aanwezig();
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Afwezig',
                    'Je bent afwezig op deze les',
                    'error'
                );
                this.afwezig();
            }
        });
        this.getStatus();
    };

    render() {
        return (
            <div>
                {/*Popup*/}
                <a onClick={this.setAanwezigheid} className="waves-effect waves-light deep-orange darken-4 btn"><i className="material-icons left">{this.state.icon}</i>{this.state.aanwezigheidsstatus}
                </a>
            </div>
        );
    }
}

export default ActivityPopUp;

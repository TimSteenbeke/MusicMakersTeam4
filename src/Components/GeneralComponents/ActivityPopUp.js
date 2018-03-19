import React, {Component} from 'react';
import * as LesService from '../../Services/LesService.js';
import * as OptredenService from '../../Services/OptredenService.js';
import swal from 'sweetalert2';
import './ActivityPopUp.css';


export default class ActivityPopUp extends Component {
    constructor(props) {
        console.log('props');
        console.log(props);
        super(props);
        this.state = {
            presenceStatus: "Te beslissen",
            icon: 'notifications'
        };
    }

    componentDidMount() {
        this.getStatus();
    }

    getStatus = () => {
        if (this.props.type === "Optreden") {
            OptredenService.getAttendanceStatus(this.props.id).then(statusobject => {
                this.setIcon(statusobject.status);
                console.log(this.state.presenceStatus);
            })
        } else {
            LesService.getAttendanceStatus(this.props.id).then(statusobject => {
                this.setIcon(statusobject.status);
                console.log(this.state.presenceStatus);
            })
        }
    };

    setIcon = (status) => {
        console.log(status);
        if (status === "absent"){
            this.setState({
                icon: 'not_interested',
                presenceStatus: "absent",
            });
        }else if(status === "present"){
            this.setState({
                icon: 'check',
                presenceStatus: "present",
            });
        }else{
            this.setState({
                icon: 'notifications'
            });
        }
    };

    present = () => {
        let id = this.props.id;
        if (this.props.type === "Optreden") {
            OptredenService.registerPresent(id);

        } else {
            LesService.registerPresent(id);
        }
    };

    absent = () => {
        let id = this.props.id;
        if (this.props.type === "Optreden") {
            OptredenService.registerAbsent(id);
        } else {
            LesService.registerAbsent(id);
        }
    };

    setPresence = () =>{
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
                    'Je bent present op deze les.',
                    'success'
                );
                this.present();
                this.setIcon('present')
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Afwezig',
                    'Je bent absent op deze les',
                    'error'
                );
                this.absent();
                this.setIcon('absent')

            }
        });

    };

    render() {
        return (
            <div>
                {/*Popup*/}
                <a onClick={this.setPresence} className="waves-effect waves-light deep-orange darken-4 btn"><i className="material-icons left">{this.state.icon}</i>{this.state.presenceStatus}
                </a>
            </div>
        );
    }
}

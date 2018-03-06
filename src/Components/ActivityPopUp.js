/**
 * Created by Ben on 28/02/2018.
 */
import React, {Component} from 'react';
import { ReactAgenda , guid  } from 'react-agenda';
import * as LesService from '../Services/LesService.js'
import * as OptredenService from '../Services/OptredenService.js'
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
    exampleImageInput: {
        margin: 10,
    }
}


class ActivityPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aanwezigheidsstatus:''
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
                this.setState({aanwezigheidsstatus:statusobject.status});
                console.log(this.state.aanwezigheidsstatus);
            })
        } else {
            LesService.getAttendanceStatus(this.props.id).then(statusobject => {
                this.setState({aanwezigheidsstatus:statusobject.status});
                console.log(this.state.aanwezigheidsstatus);
            })
        }
    }

    aanwezig() {
        console.log(this.props);
        var id= this.props.id;

        if (this.props.type == "Optreden") {
            OptredenService.registerPresent(id);
        } else {
            LesService.registerPresent(id);
        }
    }

    afwezig() {
        console.log(this.props);
        var id= this.props.id;

        if (this.props.type == "Optreden") {
            OptredenService.registerAbsent(id);
        } else {
            LesService.registerAbsent(id);
        }
    }

    render() {
        return  (
            <div>
                <div>Jouw status:{this.state.aanwezigheidsstatus}</div>
                <RaisedButton label="Aanwezig"  style={styles.exampleImageInput}  onClick={() => this.aanwezig()} backgroundColor="#DD2C00"
                              labelColor="#FFEBEE"/>
                <RaisedButton label="Afwezig"  style={styles.exampleImageInput}  onClick={() => this.afwezig()} backgroundColor="#DD2C00"
                              labelColor="#FFEBEE"/>
            </div>
        );
    }
}

export default ActivityPopUp;

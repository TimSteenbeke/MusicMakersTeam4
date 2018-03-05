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

        };

    }

    componentDidMount() {
        //Call maken om te zien of persoon aanwezig of afwezig is voor die les
        //State verranderen
        this.getStatus();

    }

    getStatus() {
        LesService.getAttendanceStatus(this.props.id);
    }

    aanwezig() {
        console.log(this.props);
        var id= this.props.id;

        if (this.props.type == "Optreden") {
            OptredenService.zetMijOpAanwezig(id);
        } else {
            LesService.registerPresent(id);
        }
    }

    afwezig() {
        console.log(this.props);
        var id= this.props.id;

        if (this.props.type == "Optreden") {
            OptredenService.zetMijOpAfwezig(id);
        } else {
            LesService.registerAbsent(id);
        }
    }

    render() {
        return  (
            <div>
                <RaisedButton label="Aanwezig"  style={styles.exampleImageInput}  onClick={() => this.aanwezig()} backgroundColor="#DD2C00"
                              labelColor="#FFEBEE"/>
                <RaisedButton label="Afwezig"  style={styles.exampleImageInput}  onClick={() => this.afwezig()} backgroundColor="#DD2C00"
                              labelColor="#FFEBEE"/>
            </div>
        );
    }
}

export default ActivityPopUp;

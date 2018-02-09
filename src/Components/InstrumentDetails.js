/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import '../CSS/AddInstrument.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

class InstrumentDetails extends Component {

    constructor(props) {
        super(props);
        this.state.instrument = {};
    }


    render() {
        return (

            <div className="Homepage">
                <section className="container">
                    <div className="left-login">

                    </div>
                    <div className="right-login">

                        <div className="instrumentDetailForm">

                            <h1 className="title">Instrument Details</h1>
                            <div className="InstrumentDetail">
                                <div id="instrumentDetails">
                                    <h2>Details</h2>
                                    <p>Instrument Soort Id: {this.props.InstrumentSoortId}</p>
                                    <p>Naam: {this.props.naam}</p>
                                    <p>Type: {this.props.type}</p>
                                    <p>Uitvoering: {this.props.uitvoering}</p>
                                    <p>Afbeelding: {this.props.afbeelding}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default InstrumentDetails;

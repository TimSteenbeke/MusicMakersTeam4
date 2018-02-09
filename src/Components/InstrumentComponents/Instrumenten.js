    /**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import '../../CSS/AddInstrument.css';
import InstrumentDetails from './InstrumentDetails';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import * as InstrumentenService from '../Services/InstrumentService.js'


class Instrumenten extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrumenten: []
        };
    }

    componentDidMount() {
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }

    render() {
        return (
            <div id="halDetails">
                {this.state.instrumenten.map((instrument,i) =>
                    <InstrumentDetails
                        key={i}
                        InstrumentSoortId={instrument.InstrumentSoortId}
                        naam={instrument.naam}
                        type={instrument.type}
                        uitvoering={instrument.uitvoering}
                        afbeelding={instrument.afbeelding}
                    />
                )}
            </div>
        );
    }
}

export default Instrumenten;


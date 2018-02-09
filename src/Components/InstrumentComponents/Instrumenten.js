    /**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';
import InstrumentDetails from './InstrumentDetails';
import * as InstrumentenService from '../../Services/InstrumentService.js'


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
            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Instrumenten</h1>
                        {this.state.instrumenten.map((instrument, i) =>
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
                </section>
            </div>
        );
    }
}

export default Instrumenten;


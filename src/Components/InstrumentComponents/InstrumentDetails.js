/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';

class InstrumentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrument: []
        }
    }



    render() {
        return (



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

        );
    }
}

export default InstrumentDetails;

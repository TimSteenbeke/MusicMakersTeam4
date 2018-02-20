/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as InstrumentenService from '../Services/InstrumentService.js'

class InstrumentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrument: {}
        }
    }

    componentDidMount() {
        InstrumentenService.getInstrumentFromBackend(1).then(instrument => {
            this.setState({instrument: instrument});
        });
    }



    render() {
        return (
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Instrumenten</h1>
                    <Card expanded={true}>
                        <CardHeader
                            title={this.state.instrument.naam}
                            subtitle="Instrumenten Details"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <div className="InstrumentDetail">
                                <div id="instrumentDetails">
                                    <p>{this.state.instrument.naam}</p>
                                    <p>{this.state.instrument.type}</p>
                                    <p> {this.state.instrument.uitvoering}</p>
                                    <p>{this.state.instrument.afbeelding}</p>
                                </div>
                            </div>
                        </CardText>
                    </Card>
                </div>
            </section>

        );
    }
}

export default InstrumentDetails;

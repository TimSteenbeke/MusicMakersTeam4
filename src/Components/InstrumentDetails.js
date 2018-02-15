/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';

class InstrumentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrument: []
        }
    }


    render() {
        return (
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Instrumenten</h1>
                    <Card>
                        <CardHeader
                            title={this.props.naam}
                            subtitle="Instrumenten Details"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <div className="InstrumentDetail">
                                <div id="instrumentDetails">
                                    <p>Instrument Soort Id: {this.props.InstrumentSoortId}</p>
                                    <p>Naam: </p>
                                    <p>Type: {this.props.type}</p>
                                    <p>Uitvoering: {this.props.uitvoering}</p>
                                    <p>Afbeelding: {this.props.afbeelding}</p>
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

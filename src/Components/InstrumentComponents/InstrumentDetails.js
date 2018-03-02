import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as InstrumentenService from '../../Services/InstrumentService.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';


class InstrumentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrument: {
                soort: {},
                afbeelding: ""
            }
            ,
            open: false,
        }
    }

    componentDidMount() {
        InstrumentenService.getInstrumentFromBackend(this.props.id)
            .then(console.log("----Instrument met id " + this.props.id + "---- \n"))
            .then(instrument => this.setState({instrument: instrument}, console.log(instrument)))
    }


    render() {
        return (
            <div>

                <h1 className="header">Details</h1>
                <Card expanded={true}>
                    <CardHeader
                        title={this.state.instrument.naam}
                    />
                    <CardText>
                        <div className="InstrumentDetail">
                            <div id="instrumentDetails">

                                <List>
                                    <ListItem primaryText="Type" secondaryText={this.state.instrument.type}/>
                                    <Divider/>
                                    <Subheader>Soort</Subheader>
                                    <ListItem primaryText="Type" secondaryText={this.state.instrument.soort.soortNaam}/>
                                    <Divider/>
                                    <Subheader>Image</Subheader>
                                    <ListItem>
                                        <img height="100px" width="100px"
                                             src={"data:image;base64," + this.state.instrument.afbeelding}
                                             alt="Instrument"/>
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default InstrumentDetails;

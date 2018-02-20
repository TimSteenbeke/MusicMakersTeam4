/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as InstrumentenService from '../Services/InstrumentService.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';



class InstrumentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrument: {
                soort:{}
            },
            open: false,
        }
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };

    componentDidMount() {
        InstrumentenService.getInstrumentFromBackend(this.props.id)
            .then(console.log(this.props.id))
            .then(instrument => this.setState({instrument: instrument}));
    }



    render() {
        return (
                <div >
                    <h1 className="header">Details</h1>
                    <Card expanded={true}>
                        <CardHeader
                            title={this.state.instrument.naam}
                        />
                        <CardText>
                            <div className="InstrumentDetail">
                                <div id="instrumentDetails">
                                    <List>
                                        <ListItem primaryText="Type" secondaryText={this.state.instrument.type} />
                                        <Divider />
                                        <Subheader>Soort</Subheader>
                                        <ListItem primaryText="Type" secondaryText={this.state.instrument.soort.soortNaam}/>
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

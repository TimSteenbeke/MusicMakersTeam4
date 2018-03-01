/**
 * Created by michiel on 25/02/2018.
 */

/*
import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as CompositionService from '../Services/CompositionService.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import fileDownload from 'react-file-download';
import base64 from 'base-64';


class MuziekstukDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            muziekstuk: {},
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
        CompositionService.getCompositionFromBackend(this.props.id)
            .then(console.log("----Muziekstuk met id " + this.props.id + "---- \n"))
            .then(muziekstuk => this.setState({muziekstuk: muziekstuk}, console.log(muziekstuk)))
    }



    assignItem = item => { // bound arrow function handler
        const filename = this.state.muziekstuk.titel + "." + this.state.muziekstuk.fileFormat;
        const filecontent = base64.decode(item);

        console.log(filecontent);


        fileDownload(filecontent,filename);
    };



    render() {
        return (
            <div >

                <h1 className="header">{}</h1>
                <Card expanded={true}>
                    <CardHeader
                        title={this.state.muziekstuk.titel}
                    />
                    <CardText>
                        <div className="InstrumentDetail">
                            <div id="instrumentDetails">

                                <List>
                                    <ListItem primaryText="Titel" secondaryText={this.state.muziekstuk.titel} />
                                    <Divider />
                                    <ListItem primaryText="Artiest" secondaryText={this.state.muziekstuk.artist}/>
                                    <Divider />
                                    <ListItem primaryText="Taal" secondaryText={this.state.muziekstuk.language}/>
                                    <Divider />
                                    <ListItem primaryText="Genre" secondaryText={this.state.muziekstuk.genre}/>
                                    <Divider />
                                    <ListItem primaryText="Onderwerp" secondaryText={this.state.muziekstuk.subject}/>
                                    <Divider />
                                    <ListItem primaryText="Onderwerp" secondaryText={this.state.muziekstuk.fileFormat}/>
                                    <Divider/>
                                    <ListItem primaryText="Download"  onClick={e => this.assignItem(this.state.muziekstuk.content)}/>
                                </List>


                            </div>

                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default MuziekstukDetails;
*/

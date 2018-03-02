import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as CompositionService from '../Services/CompositionService.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import fileDownload from 'react-file-download';
import base64 from 'base-64';

class CompositionDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orignaltitel: "",
            composition: {},
            open: false,
        }
    }

    componentDidMount() {
        CompositionService.getCompositionFromBackend(this.props.id)
            .then(console.log("----Muziekstuk met id " + this.props.id + "---- \n"))
            .then(composition => this.setState({composition: composition,orignaltitel: composition.titel}, console.log(composition)))
    }

    assignItem = item => { // bound arrow function handler
        const extension = this.state.composition.fileFormat.split('.');
        const filename = this.state.composition.titel + "." + extension[1];
        const filecontent = base64.decode(item);

        console.log(filecontent);

        fileDownload(filecontent,filename);
    };

    render() {
        return (
            <div >

                <h1 className="header">Muziekstuk Details</h1>
                <Card expanded={true}>
                    <CardHeader
                        title={this.state.orignaltitel}
                    />
                    <CardText>
                        <div className="CompositionDetail">
                            <div id="compositionDetails">

                                <List>
                                    <ListItem primaryText="Titel" secondaryText={this.state.composition.titel} />
                                    <Divider />
                                    <ListItem primaryText="Artiest" secondaryText={this.state.composition.artist}/>
                                    <Divider />
                                    <ListItem primaryText="Taal" secondaryText={this.state.composition.language}/>
                                    <Divider />
                                    <ListItem primaryText="Genre" secondaryText={this.state.composition.genre}/>
                                    <Divider />
                                    <ListItem primaryText="Onderwerp" secondaryText={this.state.composition.subject}/>
                                    <Divider />
                                    <ListItem primaryText="Bestand" secondaryText={this.state.composition.fileFormat}/>
                                    <Divider/>
                                    <ListItem primaryText="Download"  onClick={e => this.assignItem(this.state.composition.content)}/>
                                </List>
                            </div>
                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default CompositionDetails;

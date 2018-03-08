import React, {Component} from 'react';
import {Card, CardText} from 'material-ui/Card';
import * as CompositionService from '../Services/CompositionService.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
        const sampleBytes = CompositionDetails.base64ToArrayBuffer(item);
        this.saveByteArray([sampleBytes], this.state.composition.fileFormat);
    };

    static base64ToArrayBuffer(base64) {
        const binaryString =  window.atob(base64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++)        {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    saveByteArray = (function () {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, name) {
            const blob = new Blob(data, {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    render() {
        return (
            <div>
                <h1 className="header">Muziekstuk Details</h1>
                <Card expanded={true}>
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

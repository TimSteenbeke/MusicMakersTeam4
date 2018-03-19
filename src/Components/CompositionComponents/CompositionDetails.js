/*
import React, {Component} from 'react';
import {Card, CardText} from 'material-ui/Card';
import * as CompositionService from '../Services/CompositionService.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";
import Header from './Header'


class CompositionDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            compositionId: this.props.match.params.id,
            title: "string",
            artist: "string",
            language: "string",
            genre: "string",
            subject: "string",
            instrumentType: "string",
            link: "string",
            fileFormat: "string",
            content: "string",
            composition: {},
            open: false,
        }
    }

    componentDidMount() {
        let self = this;
        CompositionService.getCompositionFromBackend(self.state.compositionId)
            .then(console.log("----Composition with id " + self.state.compositionId + "---- \n"))
            .then(composition => {
                self.setState({
                    title: composition.title,
                    artist: composition.artist,
                    language: composition.language,
                    genre: composition.genre,
                    subject: composition.subject,
                    instrumentType: composition.instrumentType,
                    link: composition.link,
                    fileFormat: composition.fileFormat
                });
            }).catch((error) => {
            console.log(error);
        });
    }

    handleUpdate = () => {
        const self = this;
        CompositionService.UpdateComposition(this.state.compositionId, JSON.stringify(
            {
                content: this.state.composition.content,
                artist: this.state.composition.artist,
                language: this.state.composition.language,
                genre: this.state.composition.genre,
                subject: this.state.composition.subject,
                instrumentType: this.state.composition.instrumentType,
                link: this.state.composition.link,
                fileFormat: this.state.composition.fileFormat,
                title: this.state.composition.titel
            }
        ));
    };


    assignItem = item => { // bound arrow function handler
        const sampleBytes = CompositionDetails.base64ToArrayBuffer(item);
        this.saveByteArray([sampleBytes], this.state.composition.fileFormat);
    };

    static base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
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
        let redirecter = null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return <div className="Homepage">
            {redirecter}
            <Header name={this.state.naam}/>

            <Card expanded={true}>
                <CardText>
                    <div className="CompositionDetail">
                        <div id="compositionDetails">
                            <List>
                                <ListItem primaryText="Titel" secondaryText={this.state.composition.titel}/>
                                <Divider/>
                                <ListItem primaryText="Artiest" secondaryText={this.state.composition.artist}/>
                                <Divider/>
                                <ListItem primaryText="Taal" secondaryText={this.state.composition.language}/>
                                <Divider/>
                                <ListItem primaryText="Genre" secondaryText={this.state.composition.genre}/>
                                <Divider/>
                                <ListItem primaryText="Onderwerp" secondaryText={this.state.composition.subject}/>
                                <Divider/>
                                <ListItem primaryText="Bestand" secondaryText={this.state.composition.fileFormat}/>
                                <Divider/>
                                <ListItem primaryText="Download"
                                          onClick={e => this.assignItem(this.state.composition.content)}/>
                            </List>
                        </div>
                    </div>
                </CardText>
            </Card>
        </div>
          )
    }};




export default CompositionDetails;
*/

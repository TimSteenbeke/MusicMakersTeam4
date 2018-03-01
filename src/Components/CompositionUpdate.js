import React, {Component} from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import * as CompositionService from '../Services/CompositionService.js'
import {List, ListItem} from 'material-ui/List';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const styles = {
    width: {
        width: "90%",
    },
    loginButton: {
        boxShadow: "2px 2px 5px #616161",
        margin: 12,
    },
    errorStyle: {
        color: deepOrangeA700,

    },
    underlineStyle: {
        borderColor: deepOrangeA700,
    },
    inputstyle: {
        color: black500,
    },
    floatingLabelStyle: {
        color: black500,
    },
    floatingLabelFocusStyle: {
        color: grey500,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};


class CompositionUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            compid: 1,
            composition: {
                MuziekstukId: 1,
                titel: "string",
                artist: "string",
                language: "string",
                genre: "string",
                subject: "string",
                instrumentType: "string",
                link: "string",
                fileFormat: "string",
                content: "string",
            }
            ,
            open: false,
        }
    }

    componentDidMount() {
        const self = this;
        CompositionService.getCompositionFromBackend(this.props.id)

            .then(console.log("----Muziekstuk met id " + this.props.id + "---- \n"))
            .then(composition => self.setState({composition: composition,compid: this.props.id}, console.log(composition)))
    }

    onChangeTitel = (event, typedTitel) => {
        let composition = Object.assign({}, this.state.composition);
        composition.titel = typedTitel;
        this.setState({composition});
    };


    onChangeArtiest = (event, typedArtiest) => {
        let composition = Object.assign({}, this.state.composition);
        composition.artist = typedArtiest;
        this.setState({composition});
    };

    onChangeLanguage = (event, typedLang) => {
        let composition = Object.assign({}, this.state.composition);
        composition.language = typedLang;
        this.setState({composition});
    };

    onChangeGenre = (event, typedGenre) => {
        let composition = Object.assign({}, this.state.composition);
        composition.genre = typedGenre;
        this.setState({composition});
    };

    onChangeSubject = (event, typedSubject) => {
        let composition = Object.assign({}, this.state.composition);
        composition.subject = typedSubject;
        this.setState({composition})
    };

    onChangeInstrType = (event, typedInstrumenttype) => {
        let composition = Object.assign({}, this.state.composition);
        composition.instrumentType = typedInstrumenttype;
        this.setState({composition})
    };

    onChangeLink = (event, typedLink) => {
        let composition = Object.assign({}, this.state.composition);
        composition.link = typedLink;
        this.setState({composition})
    };

    handleUpdate = () => {
        const self = this;
        console.log("compid: " + self.state.composition.MuziekstukId);
        CompositionService.UpdateComposition(this.state.compid, JSON.stringify(
            {
                content: this.state.composition.content,
                artist: this.state.composition.artist,
                language: this.state.composition.language,
                genre: this.state.composition.genre,
                subject: this.state.composition.subject,
                instrumentType: this.state.composition.instrumentType,
                link: this.state.composition.link,
                fileFormat: this.state.composition.fileFormat,
                titel: this.state.composition.titel
            }
        ));
    };

    render() {
        return (
            <div >

                <h1 className="header">Muziekstuk details</h1>
                <Card expanded={true}>
                    <CardText>
                        <div className="InstrumentDetail">
                            <div id="instrumentDetails">
                                <List>
                                    <ListItem>
                                        <TextField
                                            value = {this.state.composition.titel}
                                            onChange={this.onChangeTitel}
                                            hintText="Geef nieuwe titel in..."
                                            floatingLabelText="Titel"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        /><br/>
                                        <TextField
                                            value = {this.state.composition.artist}
                                            onChange={this.onChangeArtiest}
                                            hintText="Geef artiest in..."
                                            floatingLabelText="Artiest"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        /><br />
                                        <TextField
                                            value = {this.state.composition.language}
                                            onChange={this.onChangeLanguage}
                                            hintText="Geef een taal in..."
                                            floatingLabelText="Taal"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        /><br />
                                        <TextField
                                            value = {this.state.composition.genre}
                                            onChange={this.onChangeGenre}
                                            hintText="Geef een genre in..."
                                            floatingLabelText="Genre"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        /><br />
                                        <TextField
                                            value = {this.state.composition.subject}
                                            onChange={this.onChangeSubject}
                                            hintText="Geef een onderwerp in..."
                                            floatingLabelText="Onderwerp"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        /><br />
                                        <TextField
                                            value = {this.state.composition.instrumentType}
                                            onChange={this.onChangeInstrType}
                                            hintText="Geef een instrumenttype in..."
                                            floatingLabelText="Instrument Type"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        />
                                        <TextField
                                            value = {this.state.composition.link}
                                            onChange={this.onChangeLink}
                                            hintText="Geef een link in..."
                                            floatingLabelText="Link"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        />
                                    </ListItem>

                                </List>
                            </div>
                        </div>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Update" onClick={this.handleUpdate}/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CompositionUpdate;
/**
 * Created by michiel on 25/02/2018.
 */

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import axios from 'axios';

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

class AddMuziekstuk extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formdata: new FormData(),
            value: 1,
            open: false,
            typedTitel: "",
            typedArtiest: "",
            typedLang: "",
            typedGenre: "",
            typedSubject: "",
            typedInstrumenttype: "",
            typedLink: "",
            bestandType: "",
            bestand: "",
        };
    }

    handleClick = () => {
        this.setState({
            open: true,
        });
        this.state.formdata.append("compresource",JSON.stringify(
            {
                content: this.state.bestand,
                titel: this.state.typedTitel,
                artist: this.state.typedArtiest,
                language: this.state.typedLang,
                genre: this.state.typedGenre,
                subject: this.state.typedSubject,
                instrumentType: this.state.typedInstrumenttype,
                link: this.state.typedLink,
                fileFormat: this.state.bestandType
            }));

        axios.post('https://musicmaker-api-team4.herokuapp.com/api/compositions/', this.state.formdata, {
            "Content-Type": "multipart/form-data"
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    onChangeTitel = (event, typedTitel) => {
        this.setState({typedTitel});
    };

    onChangeArtiest = (event, typedArtiest) => {
        this.setState({typedArtiest});
    };

    onChangeLanguage = (event, typedLang) => {
        this.setState({typedLang});
    };

    onChangeGenre = (event, typedGenre) => {
        this.setState({typedGenre});
    };

    onChangeSubject = (event, typedSubject) => {
        this.setState({typedSubject});
    };

    onChangeInstrType = (event, typedInstrumenttype) => {
        this.setState({typedInstrumenttype});
    };



    onChangeLink = (event, typedLink) => {
        this.setState({typedLink});
    };


    handleChange = (event, index, value) => {
        this.setState({value});
        console.log(value)
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        const file = evt.target.files[0];
        const extension = file.name;

        this.setState({
            bestandType: extension

        });

        const fmdata = new FormData();
        fmdata.append("file",evt.target.files[0]);
        this.state.formdata.append("files", evt.target.files[0]);
    };

    render() {

        return (

            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Muziekstuk toevoegen</h1>
                        <form className="addInstrument" action="/" method="POST" onSubmit={(e) => {
                            e.preventDefault();
                            this.handleClick();
                        } }>

                            <TextField
                                onChange={this.onChangeTitel}
                                hintText="Geef titel in..."
                                floatingLabelText="Titel"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                required
                            /><br />
                            <TextField
                                onChange={this.onChangeArtiest}
                                hintText="Geef artiest in..."
                                floatingLabelText="Artiest"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                required
                            /><br />
                            <TextField
                                onChange={this.onChangeLanguage}
                                hintText="Geef een taal in..."
                                floatingLabelText="Taal"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                required
                            /><br />
                            <TextField
                                onChange={this.onChangeGenre}
                                hintText="Geef een genre in..."
                                floatingLabelText="Genre"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                required
                            /><br />
                            <TextField
                                onChange={this.onChangeSubject}
                                hintText="Geef een onderwerp in..."
                                floatingLabelText="Onderwerp"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                required
                            /><br />
                            <TextField
                                onChange={this.onChangeInstrType}
                                hintText="Geef een instrumenttype in..."
                                floatingLabelText="Instrument Type"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                                required
                            />
                            <TextField
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
                            <br/>
                            <RaisedButton
                                label="Selecteer een bestand"
                                labelPosition="before"
                                containerElement="label"
                            >
                                <input type="file"
                                       style={styles.exampleImageInput}
                                       name="file"
                                       className="upload-file"
                                       id="file"
                                       onChange={this.handleChangeImage}
                                       encType="multipart/form-data"
                                />
                            </RaisedButton>

                            <label>{this.state.bestandType}</label>


                            <RaisedButton label="Voeg muziekstuk Toe" onClick={this.add} backgroundColor="#DD2C00"
                                          type="submit"
                                          labelColor="#FFEBEE"/>


                            <Snackbar
                                open={this.state.open}
                                message="Muziekstuk toegevoegd!"
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                            />
                        </form>
                    </div>

                </section>
            </div>
        );
    }
}

export default AddMuziekstuk;

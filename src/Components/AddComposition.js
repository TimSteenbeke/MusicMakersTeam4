/**
 * Created by michiel on 25/02/2018.
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import axios from 'axios';
import Header from './Header'
import StyledTextField from './StyledTextField'
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize'
import swal from 'sweetalert2'

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
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Composition Added!',
            showConfirmButton: false,
            timer: 1500
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

        axios.post('http://musicmaker-api-team4.herokuapp.com/api/compositions/', this.state.formdata, {
            "Content-Type": "multipart/form-data"
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    onChangeTitel = (e) => {
        this.setState({typedTitel: e.target.value});
    };

    onChangeArtiest = (e) => {
        this.setState({typedArtiest: e.target.value});
    };

    onChangeLanguage = (e) => {
        this.setState({typedLang: e.target.value});
    };

    onChangeGenre = (e) => {
        this.setState({typedGenre: e.target.value});
    };
    onChangeSubject = (e) => {
        this.setState({typedSubject: e.target.value});
    };

    onChangeInstrType = (e) => {
        this.setState({typedInstrumenttype: e.target.value});
    };

    onChangeLink = (e) => {
        this.setState({typedLink: e.target.value});
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
                <Header name="Muziekstuk toevoegen"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable">
                                <div className="card-content">
                                    <form className="addmuziekstuk" action="/" method="POST" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Titel</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <Row>
                                                        <StyledTextField onChange={this.onChangeTitel} placeholder="Geef een titel in..." label="Titel"/>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Artiest</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeArtiest} placeholder="Geef een artiest in..." label="Artiest"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Taal</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeLanguage} placeholder="Geef een taal in..." label="Taal"/><br />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Genre</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeGenre} placeholder="Geef een genre in..." label="Genre"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Onderwep</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeSubject} placeholder="Geef een onderwerp in..." label="Onderwerp"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Instrumenttype</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeInstrType} placeholder="Geef een type in..." label="Instrumenttype"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Link</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeLink} placeholder="Geef een link in..." label="Link"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
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
                                        </div>

                                    </form>

                                </div>
                                <div className="card-action">
                                    <Link to="/muziekstukken" onClick={this.handleClick}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                        <i
                                            className="material-icons">done</i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col s0 m2 l2"/>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddMuziekstuk;

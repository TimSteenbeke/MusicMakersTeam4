import React, {Component} from 'react';
import axios from 'axios';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import './AddComposition.css';
import StyledTextField from "../GeneralComponents/StyledTextField";
import * as CompositionService from "../../Services/CompositionService";

export default class AddComposition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: new FormData(),
            value: 1,
            bestandType: "",
            bestand: "",
            fields: {},
            errors: {}
        };
    }

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Composition Added!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            this.state.formdata.append("compresource",JSON.stringify(
                {
                    content: this.state.bestand,
                    title: this.state.fields["title"],
                    artist: this.state.fields["artiest"],
                    language: this.state.fields["taal"],
                    genre: this.state.fields["genre"],
                    subject: this.state.fields["onderwerp"],
                    instrumentType: this.state.fields["type"],
                    link: this.state.fields["link"],
                    fileFormat: this.state.bestandType
                }));
        }).then(() => {
            CompositionService.postComposition(this.state.formdata);

        }).then(() => {
            this.props.history.push("/compositions");
        });


    };

    handleChangeImage = (evt) => {
        const file = evt.target.files[0];
        const extension = file.name;

        this.setState({
            bestandType: extension
        });

        const fmdata = new FormData();
        fmdata.append("file",evt.target.files[0]);
        this.state.formdata.append("files", evt.target.files[0]);
    };

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Muziekstuk toevoegen"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-m2">
                        <div className="card hoverable">
                            <div className="card-content">
                                <form className="addInstrument" action="/" method="POST" onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleClick();
                                } }>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="titel"  required onChange={this.handleChange.bind(this, "title")} placeholder="Geef een titel in..." label="Titel *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="artiest"  required onChange={this.handleChange.bind(this, "artiest")} placeholder="Geef een artiest in..." label="Artiest *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="taal"  required onChange={this.handleChange.bind(this, "taal")} placeholder="Geef een taal in..." label="Taal *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="genre" required onChange={this.handleChange.bind(this, "genre")} placeholder="Geef een genre in..." label="Genre *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="onderwerp"  required onChange={this.handleChange.bind(this, "onderwerp")} placeholder="Geef een onderwerp in..." label="Onderwerp *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="type" required="true" onChange={this.handleChange.bind(this, "type")} placeholder="Geef een type in..." label="Type *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="link"  onChange={this.handleChange.bind(this, "link")} placeholder="Geef een link in..." label="Link"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <div className="file-field input-field">
                                                    <div className="btn-floating waves-effect waves-light deep-orange darken-4 pulse">
                                                        <i className="material-icons">attach_file</i>
                                                        <input name="file"
                                                               className="upload-file"
                                                               id="file"
                                                               onChange={this.handleChangeImage}
                                                               encType="multipart/form-data" type="file"/>
                                                    </div>
                                                </div>
                                                <label>{this.state.bestandType}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <small style={{color: 'red'}}>Velden met een * zijn verplicht</small>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-action">
                                <a  onClick={this.handleClick}
                                      className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                    <i
                                        className="material-icons">done</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

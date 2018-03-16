/**
 * Created by michiel on 25/02/2018.
 */

import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import {Link} from 'react-router-dom';
import swal from 'sweetalert2'

class AddMuziekstuk extends Component {

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
        });
        this.state.formdata.append("compresource",JSON.stringify(
            {
                content: this.state.bestand,
                titel: this.state.fields["titel"],
                artist: this.state.fields["artiest"],
                language: this.state.fields["taal"],
                genre: this.state.fields["genre"],
                subject: this.state.fields["onderwerp"],
                instrumentType: this.state.fields["type"],
                link: this.state.fields["link"],
                fileFormat: this.state.bestandType
            }));

        axios.post('http://musicmaker-api-team4.herokuapp.com/api/compositions/', this.state.formdata, {
            "Content-Type": "multipart/form-data"
        });
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


    compositionSubmit(e){
        e.preventDefault();
        console.log("Form submitted");
        this.handleClick();
        this.props.history.push('/compositions')
    }

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        console.log(field + " - " + fields[field]);
        this.setState({fields});
    }

    render() {

        return (
            <div className="row col s12 m12 l12">
                <Header name="Muziekstuk toevoegen"/>
                <div className="section">
                    <div className="card hoverable z-depth-3" style={{marginRight: 50,marginLeft:50}}>
                        <form name="compositionForm" className="compositionForm" onSubmit= {this.compositionSubmit.bind(this)}>

                        <div className="card-content">
                            <div className="row">
                                <div className="col s12 m12  l12 center">
                                    <h2>Muziekstuk toevoegen</h2>
                                </div>
                                <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                    <label>Titel</label>
                                    <input ref="titel" className="center" required onChange={this.handleChange.bind(this, "titel")} placeholder="Geef een titel in..." label="Titel"/>
                                </div>
                                <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                    <label>Artiest</label>
                                    <input ref="artiest" className="center" required onChange={this.handleChange.bind(this, "artiest")} placeholder="Geef een artiest in..." label="Artiest"/>
                                </div>
                                <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                    <label>Taal</label>
                                    <input ref="taal" className="center" required onChange={this.handleChange.bind(this, "taal")} placeholder="Geef een taal in..." label="Taal"/>
                                </div>
                                <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                    <label>Genre</label>
                                    <input ref="genre" className="center" required onChange={this.handleChange.bind(this, "genre")} placeholder="Geef een genre in..." label="Genre"/>
                                </div>
                                <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                    <label>Onderwerp</label>
                                    <input ref="onderwerp" className="center" required onChange={this.handleChange.bind(this, "onderwerp")} placeholder="Geef een onderwerp in..." label="Onderwerp"/>
                                </div>
                                <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                    <label>Instrumenttype</label>
                                    <input ref="type" className="center" required onChange={this.handleChange.bind(this, "type")} placeholder="Geef een type in..." label="Type"/>
                                </div>
                                <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                    <label>Link</label>
                                    <input ref="link" className="center" onChange={this.handleChange.bind(this, "link")} placeholder="Geef een link in..." label="Link"/>
                                </div>
                                <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                    <label>Bestand</label>
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
                        <div className="card-action center">
                            <input style={{marginRight: 20,width: 150}} type="submit" value="Opslaan" className="btn waves-effect waves-light deep-orange darken-4 pulse"/>
                            <Link style={{width: 150}} to="/compositions" className="btn waves-effect waves-light deep-orange darken-4 pulse">Terug</Link>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMuziekstuk;

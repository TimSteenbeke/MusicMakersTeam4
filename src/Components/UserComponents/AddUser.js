import React, {Component} from 'react';
import Header from '../GeneralComponents/Header'
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import * as UserService from '../../Services/UserService';
import './AddUser.css';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: new FormData(),
            value: 1,
            bestandType: "",
            bestand: "",
            fields: {},
            errors: {},
            image: "..image/image.jpg",
        };
    }

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'User Added!',
            showConfirmButton: false,
            timer: 1500
        });
        UserService.postUser(JSON.stringify(
            {
                username: this.state.fields["gebruikersnaam"],
                firstname: this.state.fields["voornaam"],
                lastname: this.state.fields["achternaam"],
                password: this.state.fields["wachtwoord"],
                userimage: this.state.image,
                street: this.state.fields["straat"],
                streetnumber: this.state.fields["nummer"],
                postalcode: this.state.fields["postcode"],
                city: this.state.fields["woonplaats"],
                country: this.state.fields["land"],
            }
        ));
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];

        const extension = file.name;

        this.setState({
            bestandType: extension
        });

        reader.onload = function (upload) {
            self.setState({
                image: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("Uploaded");
        }, 1000);
    };


    compositionSubmit(e){
        e.preventDefault();
        console.log("Form submitted");
        this.handleClick();
        this.props.history.push('/users')
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
                <Header name="Gebruiker toevoegen"/>
                <div className="section">
                    <div className="card" style={{marginRight: 50,marginLeft:50}}>
                        <form name="compositionForm" className="compositionForm" onSubmit= {this.compositionSubmit.bind(this)}>

                            <div className="card-content">
                                <div className="row">
                                    <div className="col s12 m12  l12 center">
                                        <h2>Gebruiker toevoegen</h2>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center" style={{marginBottom:20}}>
                                        <label>Foto</label>
                                        <div className="file-field input-field">
                                            <div
                                                className="btn-floating waves-effect waves-light deep-orange darken-4 pulse">
                                                <i className="material-icons">attach_file</i>
                                                <input name="file"
                                                       className="upload-file"
                                                       id="file"
                                                       onChange={this.handleChangeImage}
                                                       encType="multipart/form-data" accept="image/*" type="file"/>
                                            </div>
                                        </div>
                                        <label>{this.state.bestandType}</label>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Gebruikersnaam</label>
                                        <input ref="gebruikersnaam" className="center" required onChange={this.handleChange.bind(this, "gebruikersnaam")} placeholder="Geef een gebruikersnaam in..." label="Gebruikersnaam"/>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Voornaam</label>
                                        <input ref="voornaam" className="center" required onChange={this.handleChange.bind(this, "voornaam")} placeholder="Geef een voornaam in..." label="voornaam"/>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Achternaam</label>
                                        <input ref="achternaam" className="center" required onChange={this.handleChange.bind(this, "achternaam")} placeholder="Geef een achternaam in..." label="achternaam"/>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Wachtwoord</label>
                                        <input ref="wachtwoord" className="center" required onChange={this.handleChange.bind(this, "wachtwoord")} placeholder="Geef een wachtwoord in..." label="wachtwoord"/>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Adres</label>
                                    </div>
                                    <div className="col s12 m6 l6 center">
                                    <label>Straat</label>
                                    <input ref="straat" className="center" required onChange={this.handleChange.bind(this, "straat")} placeholder="Geef een straat in..." label="straat"/>
                                    </div>
                                    <div className="col s12 m6 l6 center">
                                        <label>Nummer</label>
                                        <input ref="nummer" className="center" required onChange={this.handleChange.bind(this, "nummer")} placeholder="Geef een nummer in..." label="nummer"/>
                                    </div>
                                    <div className="col s12 m4 l4 center">
                                        <label>Postcode</label>
                                        <input ref="postcode" className="center" required onChange={this.handleChange.bind(this, "postcode")} placeholder="Geef een postcode in..." label="postcode"/>
                                    </div>
                                    <div className="col s12 m4 l4 center">
                                        <label>Woonplaats</label>
                                        <input ref="woonplaats" className="center" required onChange={this.handleChange.bind(this, "woonplaats")} placeholder="Geef een woonplaats in..." label="woonplaats"/>
                                    </div>
                                    <div className="col s12 m4 l4 center">
                                        <label>Land</label>
                                        <input ref="land" className="center" required onChange={this.handleChange.bind(this, "land")} placeholder="Geef een land in..." label="land"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action center">
                                <input style={{marginRight: 20,width: 150}} type="submit" value="Opslaan" className="btn waves-effect waves-light deep-orange darken-4 pulse"/>
                                <Link style={{width: 150}} to="/users" className="btn waves-effect waves-light deep-orange darken-4 pulse">Terug</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

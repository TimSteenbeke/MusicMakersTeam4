/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import * as UserService from '../Services/UserService';
import Header from './Header'
import StyledTextField from './StyledTextField'
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import * as LoginService from '../Services/LoginService';

class UserUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.match.params.id,
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            userimage: "",
            street: "",
            streetnumber: "",
            postalcode: "",
            city: "",
            country: "",
            fields: {},
        }
    }

    componentDidMount () {
        const self = this;

        UserService.getUserFromBackend(self.state.userid)
            .then(console.log("----User met id " + self.state.userid + "---- \n"))
            .then(user => {
                self.setState({
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: user.password,
                    userimage: user.userimage,
                    street: user.street,
                    streetnumber: user.streetnumber,
                    postalcode: user.postalcode,
                    city: user.city,
                    country: user.country,
                });
                console.log(self.state.username);
                console.log(self.state.firstname);
            }).catch((error) => {
            console.log(error);
        });
    }

    componentWillMount(){
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }

    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Instrument Edited',
            showConfirmButton: false,
            timer: 1500
        });
        let self = this;
        console.log("wut: " + self.state.userid);

        UserService.UpdateUser(self.state.userid, JSON.stringify(
            {
                username: self.state.username,
                firstname: self.state.firstname,
                lastname: self.state.lastname,
                password: self.state.password,
                userimage: self.state.userimage,
                street: self.state.street,
                streetnumber: self.state.streetnumber,
                postalcode: self.state.postalcode,
                city: self.state.city,
                country: self.state.country,
            }
        ));
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                userimage: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("Uploaded");
        }, 1000);
    };

    setUsername = event => {
        let value = event.target.value;
        return this.setState({username: value})
    };

    setFirstname = event => {
        let value = event.target.value;
        return this.setState({firstname: value})
    };

    setLastname = event => {
        let value = event.target.value;
        return this.setState({lastChild: value})
    };

    setStreet = event => {
        let value = event.target.value;
        return this.setState({street: value})
    };

    setStreetnumber = event => {
        let value = event.target.value;
        return this.setState({streetnumber: value})
    };

    setPostalcode = event => {
        let value = event.target.value;
        return this.setState({postalcode: value})
    };

    setCity = event => {
        let value = event.target.value;
        return this.setState({city: value})
    };

    setCountry = event => {
        let value = event.target.value;
        return this.setState({country: value})
    };

    compositionSubmit(e){
        e.preventDefault();
        console.log("Form submitted");
        this.handleUpdate();
        this.props.history.push('/users')
    }
    render() {
        return (
            <div className="row col s12 m12 l12">
                <Header name="Gebruiker details"/>
                <div className="section">
                    <div className="card hoverable z-depth-3" style={{marginRight: 50,marginLeft:50}}>
                        <form name="compositionForm" className="compositionForm" onSubmit= {this.compositionSubmit.bind(this)}>

                            <div className="card-content">
                                <div className="row">
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center" style={{marginBottom:20}}>
                                        <label>Foto</label>
                                        <div className="card-image">
                                            <img src={"data:image;base64," + this.state.userimage} alt="Instrument" style={{width: 100, height: 100}}/>
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
                                        </div>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Gebruikersnaam</label>
                                        <input className="center" type="text" value={this.state.username} label="Titel"  onChange={this.setUsername} placeholder="Geef een gebruikersnaam in.."/>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Voornaam</label>
                                        <input className="center" type="text" value={this.state.firstname} label="Titel"  onChange={this.setFirstname} placeholder="Geef een voornaam in.."/>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Achternaam</label>
                                        <input className="center" type="text" value={this.state.lastname} label="Titel"  onChange={this.setLastname} placeholder="Geef een achternaam in.."/>
                                    </div>
                                    <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                                        <label>Adres</label>
                                    </div>
                                    <div className="col s12 m6 l6 center">
                                        <label>Straat</label>
                                        <input className="center" type="text" value={this.state.street} label="Titel"  onChange={this.setStreet} placeholder="Geef een straat in.."/>
                                    </div>
                                    <div className="col s12 m6 l6 center">
                                        <label>Nummer</label>
                                        <input className="center" type="text" value={this.state.streetnumber} label="Titel"  onChange={this.setStreetnumber} placeholder="Geef een huisnummer in.."/>
                                    </div>
                                    <div className="col s12 m4 l4 center">
                                        <label>Postcode</label>
                                        <input className="center" type="text" value={this.state.postalcode} label="Titel"  onChange={this.setPostalcode} placeholder="Geef een postcode in.."/>
                                    </div>
                                    <div className="col s12 m4 l4 center">
                                        <label>Woonplaats</label>
                                        <input className="center" type="text" value={this.state.city} label="Titel"  onChange={this.setCity} placeholder="Geef een woonplaats in.."/>
                                    </div>
                                    <div className="col s12 m4 l4 center">
                                        <label>Land</label>
                                        <input className="center" type="text" value={this.state.country} label="Titel"  onChange={this.setCountry} placeholder="Geef een land in.."/>
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

export default UserUpdate;

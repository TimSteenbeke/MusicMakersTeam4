import React, {Component} from 'react';
import * as UserService from '../../Services/UserService';
import Header from '../GeneralComponents/Header';
import swal from 'sweetalert2';
import './UserUpdate.css';
import StyledTextField from "../GeneralComponents/StyledTextField";
import {Link} from 'react-router-dom';
import {Row, Input}from 'react-materialize';

export default class UserUpdate extends Component {

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
            roles: [],
            selectedroles: []
        }
    }

    componentDidMount () {
        const self = this;

        UserService.getUserRoles().then(roles => {
            this.setState({roles: roles})
        })

        UserService.getUserFromBackend(self.state.userid)
            .then(user => {
                console.log(user);
                self.setState({
                    selectedroles: user.roles.map(role => role.roleId),
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
            }).catch((error) => {
            console.log(error);
        });
    }

    handleUpdate = () => {
        let self = this;

        swal({
            position: 'top-end',
            type: 'success',
            title: 'Gebruiker opgeslagen!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
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
                    roleids: self.state.selectedroles
                }
            ));
        });



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
            console.log("successfully Uploaded");
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
        return this.setState({lastname: value})
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

    handleRoleChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({selectedroles: value});
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Gebruiker bewerken"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-l2">
                        <div className="card hoverable z-depth-3">
                            <h4 className="center">Gebruiker bewerken</h4>
                            <form action="/" method="PUT" onSubmit={(e) => {e.preventDefault(); this.handleUpdate();}}>

                            <div className="card-image">
                                <img
                                    src={"data:image;base64," + this.state.userimage} alt="Instrument"
                                    height="300px"/>
                                <form action="#">
                                    <div className="file-field input-field">
                                        <div

                                            className="btn-floating halfway-fab waves-effect waves-light deep-orange darken-4 pulse">
                                            <i className="material-icons">attach_file</i>
                                            <input name="file"
                                                   className="upload-file"
                                                   id="file"
                                                   onChange={this.handleChangeImage}
                                                   encType="multipart/form-data" accept="image/*" type="file"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-content">
                                <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField required  type="text" value={this.state.username} label="Gebruikersnaam"  onChange={this.setUsername} placeholder="Geef een gebruikersnaam in.."/>
                                        </div>
                                </div>
                                <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField  required type="text" value={this.state.firstname} label="Voornaam"  onChange={this.setFirstname} placeholder="Geef een voornaam in.."/>
                                        </div>
                                </div>
                                <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField required type="text" value={this.state.lastname} label="Achternaam"  onChange={this.setLastname} placeholder="Geef een achternaam in.."/>
                                        </div>
                                </div>
                                <div className="section">
                                    <div className="col s12 m12 l12">
                                        <Row>
                                            <Input s={12} multiple={true} type='select'
                                                   onChange={this.handleRoleChange}
                                                   label="Rol" icon='person_outline' value={this.state.selectedroles}>
                                                <option key="" value="" disabled>Selecteer 1 of meerdere rollen...
                                                </option>
                                                {this.state.roles.map((role, index) => (
                                                    <option key={role.roleId}
                                                            value={role.roleId}>{role.roleName}</option>
                                                ))}
                                            </Input>
                                        </Row>
                                    </div>
                                </div>
                                <div className="section">
                                    <div className="row">
                                        <div className="col s12 m6 l6">
                                            <StyledTextField required type="text" value={this.state.street} label="Straat"  onChange={this.setStreet} placeholder="Geef een straat in.."/>
                                        </div>
                                        <div className="col s12 m6 l6">
                                            <StyledTextField required type="text" value={this.state.streetnumber} label="Huisnummer"  onChange={this.setStreetnumber} placeholder="Geef een huisnummer in.."/>
                                        </div>
                                    </div>
                                </div>
                                <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField required type="number" value={this.state.postalcode} label="Postcode"  onChange={this.setPostalcode} placeholder="Geef een postcode in.."/>
                                        </div>
                                </div>
                                <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField required type="text" value={this.state.city} label="Woonplaats"  onChange={this.setCity} placeholder="Geef een woonplaats in.."/>
                                        </div>
                                </div>
                                <div className="section">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField required type="text" value={this.state.country} label="Land"  onChange={this.setCountry} placeholder="Geef een land in.."/>
                                        </div>
                                </div>
                                <div className="section">
                                    <div className="col s12 m12 l12 center">
                                        <input type="submit" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle" value="Bewerken"/>
                                        <Link to="/users" type="button" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle">Terug</Link>
                                    </div>
                                </div>

                            </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

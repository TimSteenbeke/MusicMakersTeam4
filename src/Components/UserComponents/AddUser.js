import React, {Component} from 'react';
import Header from '../GeneralComponents/Header'
import swal from 'sweetalert2';
import * as UserService from '../../Services/UserService';
import './AddUser.css';
import StyledTextField from "../GeneralComponents/StyledTextField";
import {Row,Input} from 'react-materialize';


export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: new FormData(),
            value: 1,
            fields: {},
            errors: {},
            image: "..image/image.jpg",
            roles: [],
            roleids: []
        };
    }

    componentDidMount(){
        UserService.getUserRoles().then(roles => {
            this.setState({roles: roles})
        })
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
                roleids: this.state.roleids
            }
        ));

        this.props.history.push('/users');
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];

        reader.onload = function (upload) {
            self.setState({
                image: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("successfully Uploaded");
        }, 1000);
    };

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }


    handleRoleChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({roleids: value});
    };


    render() {
        return (
            <div className="Homepage">
                <Header name="Gebruiker toevoegen"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-m2">
                        <div className="card hoverable">
                            <div className="card-image">
                                <img
                                    src={"data:image;base64," + this.state.image} alt="Instrument"
                                    height="300px"/>
                                <form action="#">
                                    <div className="file-field input-field">
                                        <div
                                            className="btn-floating halfway-fab waves-effect waves-light deep-orange darken-4 pulse">
                                            <i className="material-icons">attach_file</i>
                                            <input name="file"
                                                   className="upload-file"
                                                   id="file"
                                                   required
                                                   onChange={this.handleChangeImage}
                                                   encType="multipart/form-data" accept="image/*" type="file"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-content">
                                <form className="addInstrument" action="/" method="POST" onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleClick();
                                } }>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="gebruikersnaam"  required onChange={this.handleChange.bind(this, "gebruikersnaam")} placeholder="Geef een gebruikersnaam in..." label="Gebruikersnaam *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="voornaam"  required onChange={this.handleChange.bind(this, "voornaam")} placeholder="Geef een voornaam in..." label="Voornaam *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="achternaam" required onChange={this.handleChange.bind(this, "achternaam")} placeholder="Geef een achternaam in..." label="Achternaam *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="wachtwoord" required onChange={this.handleChange.bind(this, "wachtwoord")} placeholder="Geef een wachtwoord in..." label="Wachtwoord *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <Row>
                                                    <Input s={12} multiple={true} type='select'
                                                           onChange={this.handleRoleChange}
                                                           label="Rol" icon='face' defaultValue='1'>
                                                        <option key="" value="" disabled>Selecteer een rol...
                                                        </option>
                                                        {this.state.roles.map((role, index) => (
                                                            <option key={role.roleId}
                                                                    value={role.roleId}>{role.roleName}</option>
                                                        ))}
                                                    </Input>
                                                </Row>
                                           </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m6 l6">
                                                <StyledTextField ref="straat"  required onChange={this.handleChange.bind(this, "straat")} placeholder="Geef een straat in..." label="straat *"/>
                                            </div>
                                            <div className="col s12 m6 l6">
                                                <StyledTextField ref="nummer"  required onChange={this.handleChange.bind(this, "nummer")} placeholder="Geef een nummer in..." label="nummer *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="postcode" required onChange={this.handleChange.bind(this, "postcode")} placeholder="Geef een postcode in..." label="postcode *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="woonplaats"  required onChange={this.handleChange.bind(this, "woonplaats")} placeholder="Geef een woonplaats in..." label="woonplaats *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField ref="land" required onChange={this.handleChange.bind(this, "land")} placeholder="Geef een land in..." label="land *"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                </form>
                            </div>
                            <div className="card-action">
                                <button onClick={this.handleClick}
                                      className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                    <i
                                        className="material-icons">done</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

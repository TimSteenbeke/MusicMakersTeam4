/**
 * Created by jariv on 8/02/2018.
 */

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import * as InstrumentenService from '../Services/InstrumentService.js'
import Snackbar from 'material-ui/Snackbar';
import Header from './Header'
import StyledTextField from './StyledTextField'

import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';

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


class AddInstrument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            soorten: [],
            open: false,
            typedName: "",
            typedType: "",
            typedVersion: "",
            image: "..image/image.jpg",
        };


    }

    handleClick = () => {
        this.setState({
            open: true,
        });
        InstrumentenService.postInstrument(JSON.stringify(
            {
                afbeelding: this.state.image,
                instrumentsoortid: this.state.value,
                naam: this.state.typedName,
                type: this.state.typedType,
                uitvoering: this.state.typedVersion
            }
        ));
        console.log("Image: " + this.state.image);
        console.log("Value: " + this.state.value);
        console.log("Name: " + this.state.typedName);
        console.log("Type: " + this.state.typedType);
        console.log("Version: " + this.state.typedVersion);

    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    componentDidMount() {
        InstrumentenService.getInstrumentSoortenFromBackend()
            .then(console.log("----soorten---- \n"))
            .then(soorten => {
                this.setState({soorten: soorten}, console.log(soorten));
            });
    }

    onChangeType = (event, typedType) => {
        this.setState({typedType});
        console.log("Type:" + typedType)
    };

    onChangeNaam = (event, typedName) => {
        this.setState({typedName});
        console.log("Naam:" + typedName)
    };

    onChangeVersion = (event, typedVersion) => {
        this.setState({typedVersion});
        console.log("Version:" + typedVersion)
    };

    handleChange = (event, index, value) => {
        this.setState({value});
        console.log(value)
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
            console.log("Uploaded");
        }, 1000);
    };

    render() {
        return (

            <div className="Homepage">
                <Header name="Add Instrument"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable">
                                <div className="card-image">
                                    <img
                                        src={"data:image;base64," + this.state.afbeelding} alt="Instrument"
                                        height="300px"/>
                                    <span className="card-title white-text">{this.state.naam}</span>
                                    <form action="#">
                                        <div className="file-field input-field">
                                            <div
                                                className="btn-floating halfway-fab waves-effect waves-light red darken-4 pulse">
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
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5>{this.state.type}</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <StyledTextField hint="Geef nieuw type in..." label="Type"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">

                                            <div className="col s3 m3 l3">
                                                <h5>{this.state.soortnaam}</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <StyledTextField hint="Geef nieuwe soortnaam in..." label="Soortnaam"/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-action">
                                    <Link to="/instrumenten">
                                        <a onClick={this.handleUpdate}
                                           className="btn-floating btn-small waves-effect waves-light red darken-4 pulse"><i
                                            className="material-icons">done</i></a>
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

export default AddInstrument;

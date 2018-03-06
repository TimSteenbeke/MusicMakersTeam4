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
        var self = this;
        var reader = new FileReader();
        var file = evt.target.files[0];
        const extension = file.name;
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
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Voeg Instrument toe</h1>
                        <form className="addInstrument" action="/" method="POST" onSubmit={(e) => {
                            e.preventDefault();
                            this.handleClick();
                        } }>
                            <SelectField
                                autoWidth={true}
                                floatingLabelText="Soort"
                                value={this.state.value}
                                onChange={this.handleChange}
                                selectedMenuItemStyle={styles.errorStyle}
                            >
                                {this.state.soorten.map((soort, index) => (
                                    <MenuItem key={soort.instrumentSoortId}
                                              value={soort.instrumentSoortId}
                                              primaryText={soort.soortNaam}/>
                                ))}
                            </SelectField>
                            <br />

                            <TextField
                                onChange={this.onChangeNaam}
                                hintText="Geef naam in..."
                                floatingLabelText="Naam"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            /><br />
                            <TextField
                                onChange={this.onChangeType}
                                hintText="Geef type in..."
                                floatingLabelText="Type"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            /><br />
                            <TextField
                                onChange={this.onChangeVersion}
                                hintText="Geef uitvoering in..."
                                floatingLabelText="Uitvoering"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            />
                            <RaisedButton
                                label="Kies een image"
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
                                       required
                                       accept="image/*"
                                />
                            </RaisedButton>

                            <RaisedButton label="Voeg Instrument Toe" onClick={this.add} backgroundColor="#DD2C00"
                                          style={styles.loginButton}
                                          type="submit"
                                          labelColor="#FFEBEE"
                                          className="inputIntrumentButton"/>
                            <Snackbar
                                open={this.state.open}
                                message="Instrument Added"
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

export default AddInstrument;

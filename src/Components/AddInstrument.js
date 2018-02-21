/**
 * Created by jariv on 8/02/2018.
 */

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import * as InstrumentenService from '../Services/InstrumentService.js'


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
        this.state = {value: 1, soorten: [],};


    }

    animateLogin = () => {
        this.setState({
            flex: 1
        });
    };

    componentDidMount() {
        InstrumentenService.getInstrumentSoortenFromBackend()
            .then(console.log("----soorten---- \n"))
            .then(soorten => {
            this.setState({soorten: soorten}, console.log(soorten));
        });
    }

    handleChange = (event, index, value) => this.setState({value});


    render() {
        return (

            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">

                        <h1 className="header">Voeg Instrument toe</h1>
                        <SelectField
                            autoWidth={true}
                            floatingLabelText="Soort"
                            value={this.state.value}
                            onChange={this.handleChange}
                            selectedMenuItemStyle={styles.errorStyle}
                        >
                            {this.state.soorten.map((soort, index) => (
                                <MenuItem key={soort.instrumentSoortId} value={soort.instrumentSoortId} primaryText={soort.soortNaam}/>
                            ))}
                        </SelectField>
                        <br />

                        <TextField
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
                            <input type="file" style={styles.exampleImageInput}/>
                        </RaisedButton>

                        <RaisedButton label="Voeg Instrument Toe" onClick={this.add} backgroundColor="#DD2C00"
                                      style={styles.loginButton}
                                      labelColor="#FFEBEE"
                                      className="inputIntrumentButton"/>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddInstrument;

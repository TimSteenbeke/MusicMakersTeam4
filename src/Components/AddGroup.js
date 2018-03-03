import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

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

var counter = 1;
export default class AddGroup extends Component {

    addInput(divName) {
        var newdiv = document.createElement('div');
        newdiv.innerHTML = "Groepslid " + (counter + 1) + " <br/><TextField\n" +
            "hintText=\"Geef groepsleden in...\"\n" +
            "floatingLabelText=\"Groepsleden\"\n" +
            "style={styles.width}\n" +
            "inputStyle={styles.inputstyle}\n" +
            "hintStyle={styles.floatingLabelFocusStyle}\n" +
            "floatingLabelStyle={styles.floatingLabelStyle}\n" +
            "floatingLabelFocusStyle={styles.floatingLabelFocusStyle}\n" +
            "underlineFocusStyle={styles.underlineStyle}\n" +
            "/>";
        document.getElementById(divName).appendChild(newdiv);
        counter++;
    }

    render() {
        return (

            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">

                        <h1 className="header">Voeg een groep toe</h1>
                        <TextField
                            hintText="Geef de naam van je groep in..."
                            floatingLabelText="Naam"
                            style={styles.width}
                            inputStyle={styles.inputstyle}
                            hintStyle={styles.floatingLabelFocusStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                        /><br/>
                        <TextField
                            hintText="Geef begeleider in..."
                            floatingLabelText="Begeleider"
                            style={styles.width}
                            inputStyle={styles.inputstyle}
                            hintStyle={styles.floatingLabelFocusStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                        /><br/>
                        <form>
                            <div id="dynamicGroupMember">
                                {/*Groepslid<br/><input type="text" name="groupMembers[]"/>*/}

                                <TextField
                                    hintText="Geef groepslid in..."
                                    floatingLabelText="Groepslid 1"
                                    style={styles.width}
                                    inputStyle={styles.inputstyle}
                                    hintStyle={styles.floatingLabelFocusStyle}
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    underlineFocusStyle={styles.underlineStyle}
                                />
                            </div>
                            <br/>
                            <RaisedButton label="Extra groepslid" onClick={() => this.addInput("dynamicGroupMember")}/>
                        </form>
                        <RaisedButton
                            label="Kies een image"
                            labelPosition="before"

                            containerElement="label"
                        >
                            <input type="file" style={styles.exampleImageInput}/>
                        </RaisedButton>

                        <RaisedButton label="Voeg Groep Toe" onClick={this.add} backgroundColor="#DD2C00"
                                      style={styles.loginButton}
                                      labelColor="#FFEBEE"
                                      className="inputGroepButton"/>
                    </div>
                </section>
            </div>
        );
    }
}
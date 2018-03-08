/**
 * Created by jariv on 8/02/2018.
 */

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';
import SuperSelectField from 'material-ui-superselectfield'


import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';

const styles = {
    width: {
        width: "90%",
    },
    smallIcon: {
        width: 36,
        height: 36,
    },
    small: {
        width: 72,
        height: 72,
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


const students = [];
    for (let i = 0; i < 10; i++) {
    students.push('Student ' + i);
}


const supervisor = [];
for (let i = 0; i < 5; i++) {
    supervisor.push('Supervisor ' + i);
}


class AddGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentValue: [],
            supervisorValue: [],
            soorten: [],
            open: false,
            image: "..image/image.jpg",
            bestand: "",
            teacherids: [],
            studentids: [],
            teachers: [],
            students: []
        };
    }

    studentItems(values) {
        return students.map((name) => (
            <MenuItem
                key={name}
                insetChildren={true}
                checked={values && values.indexOf(name) > -1}
                value={name}
                primaryText={name}
            />
        ));
    }

    supervisorItems(values) {
        return supervisor.map((name) => (
            <MenuItem
                key={name}
                insetChildren={true}
                checked={values && values.indexOf(name) > -1}
                value={name}
                primaryText={name}
            />
        ));
    }


    handleChangeStudent = (event, index, values) => {
        this.setState({
            studentValue: values,
        });
    };

    handleChangeSupervisor = (event, index, values) => {
        this.setState({
            supervisorValue: values,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    componentDidMount() {

    }

    handleIconClick = () => {
        this.state.studentValue.push()
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        var self = this;
        var reader = new FileReader();
        var file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                image: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, ""),
                bestand: file.name
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
                        <h1 className="header">Voeg Groep Toe</h1>
                        <form className="addGroup" action="/" method="POST" onSubmit={(e) => {
                            e.preventDefault();
                            this.handleClick();
                        }}>
                            <TextField
                                onChange={this.onChangeNaam}
                                hintText="Geef groepsnaam in..."
                                floatingLabelText="Groepnaam"
                                style={styles.width}

                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            /><br/>
                            <SuperSelectField
                                multiple={true}
                                maxHeight={200}
                                keepSearchOnSelect
                                autoWidth={true}
                                hintText='Users'
                                value={this.state.studentValue}
                                onChange={this.handleChangeStudent}
                                selectedMenuItemStyle={styles.errorStyle}
                            >
                                {this.studentItems(this.state.studentValue)}
                            </SuperSelectField>
                            <br/>
                            <SelectField
                                multiple={true}
                                maxHeight={200}
                                autoWidth={true}
                                floatingLabelText="Supervisors"
                                value={this.state.supervisorValue}
                                onChange={this.handleChangeSupervisor}
                                selectedMenuItemStyle={styles.errorStyle}
                            >
                                {this.supervisorItems(this.state.supervisorValue)}
                            </SelectField>
                            <br/>


                            <RaisedButton label="Voeg Groep Toe" onClick={this.add} backgroundColor="#DD2C00"
                                          style={styles.loginButton}
                                          type="submit"
                                          labelColor="#FFEBEE"
                                          className="inputIntrumentButton"/>
                            <Snackbar
                                open={this.state.open}
                                message="Group Added"
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                            />
                        </form>
                        <RaisedButton
                            label="Kies een image"
                            labelPosition="before"
                            containerElement="label"
                        >
                            <input type="file" style={styles.exampleImageInput}
                                   name="file"
                                   className="upload-file"
                                   id="file"
                                   onChange={this.handleChangeImage}
                                   encType="multipart/form-data"/>
                        </RaisedButton>
                        <label>{this.state.bestand}</label>
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

export default AddGroup;

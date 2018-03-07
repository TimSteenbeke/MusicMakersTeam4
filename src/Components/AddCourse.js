/**
 * Created by Ben on 27/02/2018.
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as CourseService from '../Services/CourseService.js'
import Snackbar from 'material-ui/Snackbar';
import Header from './Header'


import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";

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


class AddCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            open: false,
            typedcoursebeschrijving: "",
            typedprijs: 0,
            selectedteacherids: [],
            selectedstudentids :[]
        };


    }

    handleClick = () => {
        this.setState({
            open: true,
        });
        CourseService.postCourse(JSON.stringify(
            {
                coursebeschrijving: this.state.typedcoursebeschrijving,
                prijs: this.state.typedprijs,
                teacherids: this.state.selectedteacherids,
                studentids: this.state.selectedstudentids
            }
        ));
        console.log(this.state.selectedstudentids);
    };



    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    componentWillMount(){
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }

    onChangePrijs = (event, typedPrijs) => {
        this.setState({typedprijs: typedPrijs});
        console.log("prijs:" + typedPrijs)
    };

    onChangeNaam = (event, typedName) => {
        this.setState({typedcoursebeschrijving: typedName});
        console.log("Coursebeschrijving:" + typedName)
    };

    onChangeTeacherIds = (event, typedTeacherIds) => {
        this.setState({selectedteacherids:typedTeacherIds.split(",")});
        console.log(  typedTeacherIds)
    };

    onChangeStudentIds = (event, typedStudentIds) => {
        this.setState({selectedstudentids:typedStudentIds.split(",")});
        console.log(typedStudentIds)
    };

    handleChange = (event, index, value) => {
        this.setState({value});
        console.log(value)
    };

    render() {
        let redirecter=null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return (

            <div className="Homepage">
                {redirecter}
                <Header name="Add Course"/>
                <section className="containerCss">
                    <div className="whiteBox">
                        <form className="addInstrument" action="/" method="POST" onSubmit={(e) => {
                            e.preventDefault();
                            this.handleClick();
                        } }>
                            <TextField
                                onChange={this.onChangeNaam}
                                hintText="Geef cursusnaam in"
                                floatingLabelText="Cursusnaam"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            /><br />
                            <TextField
                                onChange={this.onChangePrijs}
                                hintText="Geef prijs in..."
                                floatingLabelText="Prijs"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            /><br />
                            <TextField
                                onChange={this.onChangeTeacherIds}
                                hintText="Selecteer leerkrachten"
                                floatingLabelText="Leerkrachten"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            />
                            <TextField
                                onChange={this.onChangeStudentIds}
                                hintText="Selecteer studenten"
                                floatingLabelText="studenten"
                                style={styles.width}
                                inputStyle={styles.inputstyle}
                                hintStyle={styles.floatingLabelFocusStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineStyle}
                            />

                            <RaisedButton label="Voeg Course Toe" onClick={this.add} backgroundColor="#DD2C00"
                                          style={styles.loginButton}
                                          type="submit"
                                          labelColor="#FFEBEE"
                                          className="inputIntrumentButton"/>
                            <Snackbar
                                open={this.state.open}
                                message="Course Added"
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

export default AddCourse;


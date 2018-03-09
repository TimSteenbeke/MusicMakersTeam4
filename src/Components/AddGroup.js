/**
 * Created by jariv on 8/02/2018.
 */

import React, {Component} from 'react';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import * as UserService from "../Services/UserService";
import swal from 'sweetalert2'
import Header from "./Header";
import {Input, Row} from "react-materialize";
import Link from "react-router-dom/es/Link";
import StyledTextField from "./StyledTextField";
import * as GroupService from "../Services/GroupService";
import {RaisedButton} from "material-ui";

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

class AddGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            bestand: "",
            userids: [],
            studentids: [],
            allUsers: [],
            students: [],
            groupImage: "",
            fileType: ""
        };
    }

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Groep toegevoegd',
            showConfirmButton: false,
            timer: 1500
        });
        console.log("Name: " + this.state.name);
        console.log("studentIds: " + this.state.studentids);
        console.log("userIds: " + this.state.userids);

        GroupService.postGroup(JSON.stringify(
            {
                name: this.state.name,
                userids: this.state.userids,
                studentids: this.state.studentids,
                groupimage: this.state.groupImage

            }
        ));
    };


    onChangeName = (e) => {
        this.setState({name: e.target.value});
        console.log("name:" + e.target.value)
    };

    addUsers = () => {
        UserService.getAllUsers().then(console.log("----Students---- \n"))
            .then(allUsers => {
                this.setState({allUsers: allUsers.users}, console.log(allUsers.users));
            });
    };

    addStudents = () => {
        UserService.getStudents().then(console.log("----Users---- \n"))
            .then(students => {
                this.setState({students: students.users}, console.log(students.users));
            });

    };


    handleUserChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({userids: value});
        console.log(this.state.userids);
    };

    handleStudentChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({studentids: value});
        console.log(this.state.studentids);
    };

    componentDidMount() {
        this.addUsers();
        this.addStudents();
    }

    handleChangeImage = (evt) => {
        console.log("Uploading");
        const file = evt.target.files[0];
        const extension = file.name;

        this.setState({
            fileType: extension

        });

        const fmdata = new FormData();
        fmdata.append("file",evt.target.files[0]);
        this.state.formdata.append("files", evt.target.files[0]);
    };


    render() {
        return (
            <div className="Homepage">
                <Header name="Add Group"/>
                <section className="containerCss">
                    <div className="col s0 m2 l2"/>
                    <div className="col s12 m8 l8">
                        <div className="card hoverable">
                            <div className="card-content">
                                <form className="addGroup" action="/" method="POST" onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleClick();
                                }}>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5 className="truncate">Group</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <StyledTextField onChange={this.onChangeName}
                                                                 hint="Geef een naam in..."
                                                                 label="Naam"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5 className="truncate">Gebruikers</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <Row>
                                                    <Input s={12} multiple={true} type='select'
                                                           onChange={this.handleUserChange}
                                                           label="Begeleiders" icon='face' defaultValue='1'>
                                                        <option key="" value="" disabled>Kies de begeleiders
                                                        </option>
                                                        {this.state.allUsers.map((user, index) => (
                                                            <option key={user.userid}
                                                                    value={user.userid}>{user.firstname} {user.lastname}</option>
                                                        ))}
                                                    </Input>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5 className="truncate">Studenten</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <Row>
                                                    <Input s={12} multiple={true} type='select' label="Studenten"
                                                           onChange={this.handleStudentChange}
                                                           icon='child_care' defaultValue='1'>
                                                        <option key="" value="" disabled>Kies de studenten</option>
                                                        {this.state.students.map((student, index) => (
                                                            <option key={student.userid}
                                                                    value={student.userid}>{student.firstname} {student.lastname}</option>
                                                        ))}
                                                    </Input>
                                                </Row>
                                            </div>
                                            <RaisedButton
                                                label="Selecteer een bestand"
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
                                                />
                                            </RaisedButton>
                                            <label>{this.state.fileType}</label>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                </form>

                            </div>

                            <div className="card-action">
                                <Link to="/groups" onClick={this.handleClick}
                                      className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                    <i
                                        className="material-icons">done</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col s0 m2 l2"/>
                </section>
            </div>
        );
    }
}

export default AddGroup;

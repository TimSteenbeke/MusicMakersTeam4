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
import Redirect from "react-router-dom/es/Redirect";

class AddGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            supervisorid: 1,
            userids: [],
            allUsers: [],
            students: [],
            image: "../image/image.jpg"
        };
    }




    addUsers = () => {
        UserService.getAll().then(console.log("----Students---- \n"))
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

    onChangeName = (e) => {
        this.setState({name: e.target.value});
        console.log("name:" + e.target.value)
    };


    handleUserChange = (e) => {
        let options = e.target.options;
        let value = 1;
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value = options[i].value;
            }
        }
        this.setState({supervisorid: value});
        console.log(this.state.supervisorid);
    };

    handleStudentChange = (e) => {
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

    componentDidMount() {
        this.addUsers();
        this.addStudents();
    }

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

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Groep toegevoegd',
            showConfirmButton: false,
            timer: 1500
        });
        console.log("Name: " + this.state.name);
        console.log("studentIds: " + this.state.userids);
        console.log("userIds: " + this.state.supervisorid);

        GroupService.postGroup(JSON.stringify(
            {
                name: this.state.name,
                supervisorid: this.state.supervisorid,
                userids: this.state.userids,
                groupimage: this.state.image

            }
        ));
    };

    render() {

        let redirecter = null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return (<div className="Homepage">
                {redirecter}
                <Header name={this.state.name}/>
                <section className="containerCss">
                    <div className="col s0 m2 l2"/>
                    <div className="col s12 m8 l8">
                        <div className="card hoverable">
                            <div className="card-image">
                            <img
                                src={"data:image;base64," + this.state.image} alt="Groep"
                                height="300px"/>
                                <span className="card-title white-text">{this.state.name}</span>
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
                            <div className="row">
                                <div className="col s3 m3 l3">
                                    <h5 className="truncate">Groepsnaam</h5>
                                </div>
                                <div className="col s9 m9 l9">
                                    <StyledTextField onChange={this.onChangeName}
                                                     label="Naam"/>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="section">
                                <div className="row">
                                    <div className="col s3 m3 l3">
                                        <h5 className="truncate">Begeleider</h5>
                                    </div>
                                    <div className="col s9 m9 l9">
                                        <Row>
                                            <Input s={12} multiple={false} type='select'
                                                   onChange={this.handleUserChange}
                                                   label="Begeleider" icon='face'>
                                                <option key="" value="" disabled>Kies de begeleider
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

                                </div>

                                <div className="divider"></div>

                                <div className="card-action">
                                    <Link to="/groups" onClick={this.handleClick}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                        <i
                                            className="material-icons">done</i>
                                    </Link>
                                </div>
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

import React, {Component} from 'react';
import * as UserService from "../../Services/UserService";
import swal from 'sweetalert2'
import Header from "../GeneralComponents/Header";
import {Input, Row} from "react-materialize";
import Link from "react-router-dom/es/Link";
import Redirect from "react-router-dom/es/Redirect";
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import StyledTextField from "../GeneralComponents/StyledTextField";
import * as GroupService from "../../Services/GroupService";
import './AddGroup.css';

export default class AddGroup extends Component {
    dataSourceConfig = {
        text: 'fullname',
        value: 'userid',
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            supervisor: {},
            userids: [],
            allUsers: [],
            students: [],
            image: "../image/image.jpg"
        };
    }

    addUsers = () => {
        UserService.getAll().then(console.log("----Students---- \n"))
            .then(allUsers => {
                let users = allUsers.users;
                users.forEach((user) => {
                    user["fullname"] = user.firstname + ' ' + user.lastname;
                });
                this.setState({allUsers: allUsers.users}, console.log(allUsers.users));
            });
    };

    addStudents = () => {
        UserService.getStudents().then(console.log("----Users---- \n"))
            .then(students => {
                let users = students.users;
                users.forEach((students) => {
                    students["fullname"] = students.firstname + ' ' + students.lastname;
                });
                this.setState({students: students.users}, console.log(students.users));
            });

    };

    onChangeName = (e) => {
        this.setState({name: e.target.value});
    };

    handleBegeleider = (chosenRequest, index) => {
        console.log(index);
        if (index != -1) {
            this.setState({supervisor: chosenRequest});
        }
        console.log(this.state.supervisor);
    };

    handleUser = (chosenRequest, index) => {
        console.log(index);
        if (index != -1) {
            let value = [];
            console.log(chosenRequest);
            let users = this.state.userids;
            users.forEach((user) => {
                value.push(user);
            });
            value.push(chosenRequest.userid);
            const ids = value.filter((val, id, array) => array.indexOf(val) == id);
            this.setState({userids: ids});
            console.log(ids)
        }
    };

    deleteSupervisor = () => {
        this.setState({
            supervisor: {}
        })
    };


    deleteStudent = (i) => {
        console.log("userid = " + i);
        this.state.userids.forEach((user) => {
            console.log("user in loop = " + user);
            if (user === i) {
                console.log("GOTTEM = " + i);
                let value = [];
                    let users = this.state.userids;
                    users.forEach((user) => {
                        if (user != i){
                            value.push(user);
                        }
                    });
                console.log("DEEZ NUTS = " + value);
                this.setState({userids: value});
            }
        });
    };


    componentDidMount() {
        this.addUsers();
        this.addStudents();
        console.log(this.state.students);
        console.log(this.state.allUsers);
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
        console.log("Userid: " + this.state.supervisor.userid);
        console.log("name: " + this.state.name);
        console.log("id's: " + this.state.userids);

        GroupService.postGroup(JSON.stringify(
            {
                name: this.state.name,
                supervisorid: this.state.supervisor.userid,
                userids: this.state.userids,
                groupimage: this.state.image

            }
        ));
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Groep toevoegen"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-l2">
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
                                <div className="col s12 m12 l12">
                                    <StyledTextField placeholder="Geef een groepsnaam in..."  label="Groepsnaam" onChange={this.onChangeName}/>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="section">
                                <div className="row">
                                    <div className="col s12 m12 l12">
                                        <Row>
                                            <AutoComplete
                                                floatingLabelText="Begeleiders"
                                                dataSource={this.state.allUsers}
                                                dataSourceConfig={this.dataSourceConfig}
                                                fullWidth={true}
                                                onNewRequest={this.handleBegeleider}
                                            />
                                        </Row>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m12 l12">
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
                                    <div className="col s3 m3 l3">
                                    </div>
                                    <div className="col s9 m9 l9">
                                        <ul className="collection">
                                            <li className="collection-item">
                                                <div>{this.state.supervisor.fullname}<a onClick={this.deleteSupervisor}
                                                                                        className="secondary-content"><i
                                                    className="material-icons">clear</i></a></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="divider"></div>

                                <div className="section">
                                    <div className="row">
                                        <div className="col s3 m3 l3">
                                            <h5 className="truncate">Studenten</h5>
                                        </div>
                                        <div className="col s9 m9 l9">
                                            <Row>
                                                <AutoComplete
                                                    floatingLabelText="Studenten"
                                                    dataSource={this.state.students}
                                                    dataSourceConfig={this.dataSourceConfig}
                                                    fullWidth={true}
                                                    onNewRequest={this.handleUser}
                                                />
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s3 m3 l3">
                                        </div>
                                        <div className="col s9 m9 l9">
                                            <ul className="collection">
                                                {this.state.userids.map((id, index) => (
                                                    <li key={index} className="collection-item">
                                                        <div>{this.state.students.find(student => student.userid === id).fullname}<a
                                                            onClick={() => this.deleteStudent(id)}
                                                            className="secondary-content"><i
                                                            className="material-icons">clear</i></a></div>
                                                    </li>
                                                ))}
                                            </ul>
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
                    </div>
                </section>
            </div>
        );
    }
}

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
            this.setState({supervisorid: chosenRequest.userid});
        }
        console.log(this.state.supervisorid);
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
            const ids = value.filter((val,id,array) => array.indexOf(val) == id);
            this.setState({userids: ids});
            console.log(ids)
        }
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
        return (<div className="Homepage">
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
                                            <AutoComplete
                                                floatingLabelText="Studenten"
                                                dataSource={this.state.allUsers}
                                                dataSourceConfig={this.dataSourceConfig}
                                                fullWidth={true}
                                                onNewRequest={this.handleBegeleider}
                                            />
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            <ul className="collection">

                                <li className="collection-item avatar">
                                    <img src="images/yuna.jpg" alt="" className="circle" />
                                        <span className="title">Title</span>
                                        <p>First Line <br />

                                        </p>
                                        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                                </li>
                            </ul>
                            <div className="section">
                                <div className="row">
                                    <div className="col s3 m3 l3">
                                        <h5 className="truncate">Studenten</h5>
                                    </div>
                                    <div className="col s9 m9 l9">
                                        <Row>
                                            <AutoComplete
                                                floatingLabelText="Begeleiders"
                                                dataSource={this.state.students}
                                                dataSourceConfig={this.dataSourceConfig}
                                                fullWidth={true}
                                                onNewRequest={this.handleUser}
                                            />
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

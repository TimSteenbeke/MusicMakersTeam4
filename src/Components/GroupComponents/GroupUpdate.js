import React, {Component} from 'react';
import * as GroupService from '../../Services/GroupService.js';
import swal from 'sweetalert2'
import Link from "react-router-dom/es/Link";
import Header from "../GeneralComponents/Header";
import * as UserService from "../../Services/UserService";
import {Row} from "react-materialize";
import StyledTextField from "../GeneralComponents/StyledTextField";
import './GroupUpdate.css';
import AutoComplete from 'material-ui/AutoComplete';

export default class GroupUpdate extends Component {
    dataSourceConfig = {
        text: 'fullname',
        value: 'userid',
    };

    constructor(props) {
        super(props);
        this.state = {
            groupid: this.props.match.params.id,
            allUsers: [],
            students: [],
            supervisorid: 0,
            userids: [],
            name: "",
            groupimage: "../image/image.jpg"
        }
    }

    addUsers = () => {
        UserService.getAll().then(console.log("----Users---- \n"))
            .then(allUsers => {
                let users = allUsers.users;
                users.forEach((user) => {
                    user["fullname"] = user.firstname + ' ' + user.lastname;
                });
                this.setState({allUsers: allUsers.users}, () =>{
                    console.log(allUsers);
                    this.addStudents();
                });
            });
    };

    addStudents = () => {
        UserService.getStudents().then(console.log("----Students---- \n"))
            .then(students => {
                let users = students.users;
                users.forEach((students) => {
                    students["fullname"] = students.firstname + ' ' + students.lastname;
                });
                this.setState({students: students.users}, () => {
                    console.log(students);
                    this.getGroup();
                });
            });
    };

    handleNameChange = event => {
        let value = event.target.value;
        return this.setState({name: value})
    };


    handleBegeleider = (chosenRequest, index) => {
        console.log(index);
        if (index !== -1) {
            this.setState({supervisorid: chosenRequest.userid});
        }
        console.log(this.state.supervisorid);
    };

    handleUser = (chosenRequest, index) => {
        console.log(index);
        if (index !== -1) {
            let value = [];
            console.log(chosenRequest);
            let users = this.state.userids;
            users.forEach((user) => {
                value.push(user);
            });
            value.push(chosenRequest.userid);
            const ids = value.filter((val, id, array) => array.indexOf(val) === id);
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
                let value = [];
                let users = this.state.userids;
                users.forEach((user) => {
                    if (user !== i) {
                        value.push(user);
                    }
                });
                this.setState({userids: value});
            }
        });
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                groupimage: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("successfully Uploaded");
        }, 1000);
    };


    componentDidMount() {
        this.addUsers();
    }

    getGroup = () => {
        const self = this;
        GroupService.getGroupFromBackend(self.state.groupid).then(loadedGroup => {
            console.log(loadedGroup);
            if (loadedGroup.supervisor !== null) {
                self.setState({
                    supervisorid: loadedGroup.supervisor.id
                });
                console.log(this.state.supervisorid)
            }
            self.setState({
                name: loadedGroup.name,
                userids: loadedGroup.userids,
                groupimage: loadedGroup.groupimage,

            }, () => {
                console.log(console.log(this.state.groupid));
                console.log(console.log(this.state.supervisorid));
                console.log(console.log(this.state.userids));
            })

        })

    };

    handleUpdate = () => {
        let self = this;
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Groep aangepast',
            showConfirmButton: false,
            timer: 1500
        });

        console.log("NAME =>" + console.log(self.state.name));
        console.log(console.log(self.state.groupid));
        console.log(console.log(self.state.supervisorid));
        console.log(console.log(self.state.userids));

        GroupService.updateGroup(self.state.groupid, JSON.stringify(
            {
                name: self.state.name,
                supervisorid: self.state.supervisorid,
                userids: self.state.userids,
                groupimage: self.state.groupimage
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
                                    src={"data:image;base64," + this.state.groupimage} alt="Groep"
                                    height="300px"/>
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
                            <div className="section">
                                <div className="row">
                                    <div className="col s12 m12 l12">
                                        <StyledTextField onChange={this.handleNameChange}
                                                         value={this.state.name}
                                                         label="Naam"/>
                                    </div>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="section">
                                <div className="row">
                                    <div className="col s3 m3 l3">
                                        <h5 className="truncate">Begeleiders</h5>
                                    </div>
                                    <div className="col s9 m9 l9">
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
                                    <div className="col s3 m3 l3">
                                    </div>
                                    <div className="col s9 m9 l9">
                                        <ul className="collection">
                                            <li className="collection-item">
                                                {this.state.supervisorid !== 0 ?
                                                    <div>{this.state.allUsers.find(user => user.userid === this.state.supervisorid).fullname}<a
                                                        onClick={this.deleteSupervisor}
                                                        className="secondary-content"><i
                                                        className="material-icons">clear</i></a></div>
                                                    :
                                                    <div>Geen begeleider gevonden<a
                                                        className="secondary-content"><i
                                                        className="material-icons">clear</i></a></div>
                                                }
                                            </li>
                                        </ul>
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
                                    <Link to="/groups" onClick={this.handleUpdate}
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
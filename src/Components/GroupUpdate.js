import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import * as GroupService from '../Services/GroupService.js'
import {List, ListItem} from 'material-ui/List';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import swal from 'sweetalert2'
import * as LoginService from "../Services/LoginService";
import Link from "react-router-dom/es/Link";
import Redirect from "react-router-dom/es/Redirect";
import Header from "./Header";
import * as UserService from "../Services/UserService";
import {Input, Row} from "react-materialize";
import StyledTextField from "./StyledTextField";

export default class GroupUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            students: [],
            group: {
                groupId: this.props.match.params.id,
                name: "string",
                supervisor: {
                    id: 1,
                    username: ""
                },
                image: "../image/image.jpg"
            },
        }
    }

    addUsers = () => {
        UserService.getAllUsers().then(console.log("----Users---- \n"))
            .then(allUsers => {
                this.setState({allUsers: allUsers.users}, console.log(allUsers.users));
            });
    };

    addStudents = () => {
        UserService.getStudents().then(console.log("----Students---- \n"))
            .then(students => {
                this.setState({students: students.users}, console.log(students.users));
            });

    };

    handleNameChange = event => {
        let value = event.target.value;
        return this.setState({name: value})
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

        const self = this;
        console.log("newgroupid: " + self.state.group.groupId);
        GroupService.getGroupFromBackend(self.state.group.groupId)
            .then(console.log("----Groep met id " + self.state.group.groupId + "---- \n"))
            .then(loadedGroup => self.setState({
                groupId: loadedGroup.groupId,
                name: loadedGroup.name,
                supervisor: loadedGroup.supervisor
            }, console.log(loadedGroup)))
    }

    componentWillMount() {
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }

    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Groep aangepast',
            showConfirmButton: false,
            timer: 1500
        });
        let self = this;
        GroupService.updateGroup(self.state.groupId, JSON.stringify(
            {
                name: self.state.group.name,
                supervisorid: self.state.group.supervisor.id,
                userids: this.state.userids,
                groupimage: this.state.group.image
            }
        ));
        console.log("groupId: " + self.state.groupId);
        console.log("groepsnaam: " + self.state.name);
        console.log("supervisorid: " + self.state.supervisor.supervisorid);
        console.log("supervisornaam: " + self.state.supervisor.username);
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
                            <div className="card-content">
                                <div className="section">
                                    <div className="row">
                                        <div className="col s3 m3 l3">
                                            <h5 className="truncate">Groepsnaam</h5>
                                        </div>
                                        <div className="col s9 m9 l9">
                                            <StyledTextField onChange={this.handleNameChange}
                                                             hint={this.state.group.name}
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
                                        <input name="file"
                                               className="upload-file"
                                               id="file"
                                               onChange={this.handleChangeImage}
                                               encType="multipart/form-data" accept="image/*" type="file"/>
                                        <label>{this.state.fileType}</label>
                                    </div>
                                </div>
                                <div className="divider"></div>
                            </div>

                            <div className="card-action">
                                <Link to="/groups" onClick={this.handleUpdate}
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
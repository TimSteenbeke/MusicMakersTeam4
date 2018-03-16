import React, {Component} from 'react';
import * as GroupService from '../../Services/GroupService.js';
import {black500} from 'material-ui/styles/colors';
import swal from 'sweetalert2'
import * as LoginService from "../../Services/LoginService";
import Link from "react-router-dom/es/Link";
import Redirect from "react-router-dom/es/Redirect";
import Header from "../GeneralComponents/Header";
import * as UserService from "../../Services/UserService";
import {Input, Row} from "react-materialize";
import StyledTextField from "../GeneralComponents/StyledTextField";

export default class GroupUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupid: this.props.match.params.id,
            allUsers: [],
            students: [],
            name: "",
            supervisorId: 1,
            studentIds: [],
            groupimage: "../image/image.jpg"
        }
    }

    addUsers = () => {
        UserService.getAll().then(console.log("----Users---- \n"))
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
        this.setState({supervisorId: value});
        console.log("newsupid: " + this.state.supervisorId);
    };

    handleStudentChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({studentIds: value});
        console.log(this.state.studentIds);
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
            console.log("Uploaded");
        }, 1000);
    };


    componentDidMount() {
        this.addUsers();
        this.addStudents();

        const self = this;
        console.log("newgroupid: " + self.state.groupid);
        GroupService.getGroupFromBackend(self.state.groupid)
            .then(console.log("----Groep met id " + self.state.groupid + "---- \n"))
            .then(loadedGroup => self.setState({
                groupid: loadedGroup.groupid,
                name: loadedGroup.name,
                supervisorId: loadedGroup.supervisorid,
                studentIds: loadedGroup.userids,
                groupimage: loadedGroup.groupimage
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
        GroupService.updateGroup(self.state.groupid, JSON.stringify(
            {
                name: self.state.name,
                supervisorid: self.state.supervisorId,
                userids: self.state.studentIds,
                groupimage: self.state.groupimage
            }
        ));
        console.log("groupId: " + self.state.groupid);
        console.log("groepsnaam: " + self.state.name);
        console.log("supervisorid: " + self.state.supervisorid);
        console.log("supervisornaam: " + self.state.username);
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
                                    src={"data:image;base64," + this.state.groupimage} alt="Groep"
                                    height="300px"/>
                                <span className="card-title white-text"></span>
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
                                    <div className="col s3 m3 l3">
                                        <h5 className="truncate">Groepsnaam</h5>
                                    </div>
                                    <div className="col s9 m9 l9">
                                        <StyledTextField onChange={this.handleNameChange}
                                                         label="Naam"/>
                                    </div>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="section">
                                <div className="row">
                                    <div className="col s3 m3 l3">
                                        <h5 className="truncate">{this.state.supervisorId}</h5>
                                    </div>
                                    <div className="col s9 m9 l9">
                                        <Row>
                                            <Input s={12} multiple={false} type='select'
                                                   onChange={this.handleUserChange}
                                                   label="Begeleider" icon='face'
                                                   defaultValue={this.state.supervisorId}>
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
                                        <h5 className="truncate">{this.state.studentIds}</h5>
                                    </div>
                                    <div className="col s9 m9 l9">
                                        <Row>
                                            <Input s={12} multiple={true} type='select' label="Studenten"
                                                   onChange={this.handleStudentChange}
                                                   icon='child_care' defaultValue={this.state.studentIds}>
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
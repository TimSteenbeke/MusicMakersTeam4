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

export default class MyGroupDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupid: this.props.match.params.id,
            allUsers: [],
            students: [],
            name: "",
            supervisorname: "",
            supervisorlastname: "",
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
                supervisorname: loadedGroup.supervisor.firstname,
                supervisorlastname: loadedGroup.supervisor.lastname,
                studentIds: loadedGroup.userids,
                groupimage: loadedGroup.groupimage
            }));
    }

    componentWillMount() {
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }

    render() {

        let redirecter = null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return (
            <div className="Homepage">
                {redirecter}
                <Header name="Groepdetails"/>

                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m12 l12 center">
                            <h4>{this.state.name}</h4>
                        </div>
                        <div className="col s12 m12 l12">
                            <h5>Begeleider:</h5>
                        </div>
                        <div className="col s12 m12 l12">
                            <span>{this.state.supervisorname} {this.state.supervisorlastname}</span>
                        </div>
                        <br/>
                        <div className="col s12 m12 l12">
                            <h5>Leden:</h5>
                        </div>
                        <div className="col s12 m12 l12">
                            {this.state.students.map((student, index) => (
                                <p><i className="material-icons">person</i> {student.firstname} {student.lastname}<br/></p>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
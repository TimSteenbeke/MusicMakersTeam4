import React, {Component} from 'react';
import * as GroupService from '../../Services/GroupService.js';
import Header from "../GeneralComponents/Header";
import * as UserService from "../../Services/UserService";
import './MyGroupDetails.css';
import {Card,CardTitle } from 'react-materialize';
import MomentJs from "moment";

export default class MyGroupDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupid: this.props.match.params.id,
            allUsers: [],
            students: [],
            newsitems: [],
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
        GroupService.getGroupFromBackend(self.state.groupid)
            .then(console.log("----Groep met id " + self.state.groupid + "---- \n"))
            .then(loadedGroup => self.setState({
                groupid: loadedGroup.groupid,
                name: loadedGroup.name,
                supervisorname: loadedGroup.supervisor.firstname,
                supervisorlastname: loadedGroup.supervisor.lastname,
                studentIds: loadedGroup.userids,
                groupimage: loadedGroup.groupimage,
                students: loadedGroup.users,
                newsitems: loadedGroup.newsItems,

            })).then(loadedgroup => console.log(loadedgroup));
        console.log("studenids huidige groep");
        console.log(this.state.students);
    }

    render() {

        return (
            <div className="Homepage">
                <Header name="Groepdetails"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m10 offset-m1 l10 offset-l1">
                            <div className="center">
                                <h3 className="center">{this.state.name}</h3>
                                <span className="center">Begeleider: {this.state.supervisorname}</span>
                            </div>
                            <div className="divider" style={{marginTop:20}}></div>
                            <div>
                                <h4>Meldingen</h4>
                                { this.state.newsitems && this.state.newsitems.length > 0 ?
                                    this.state.newsitems.map(( newsitem, index) => (
                                        <div className="collection" style={{padding:10}}>
                                            <div className="collection-item">
                                            <h5> {newsitem.title}</h5>
                                            <small>{MomentJs(newsitem.date).utc().format('YYYY-MM-DD')} - {newsitem.editor}</small>
                                            <p>{newsitem.message}</p>
                                            </div>
                                        </div>
                                    ))
                                    :  <div className="collection"><a className="collection-item">Geen meldingen!</a></div>
                                }
                            </div>
                            <div className="divider" style={{marginTop:20}}></div>
                            <div>
                                <h4>Leden</h4>
                                { this.state.students && this.state.students.length > 0 ?
                                    this.state.students.map((student, index) => (
                                        <div className="collection">
                                            <a  className="collection-item" style={{padding:5}}><img src={"data:image;base64," + student.userImage} alt={student.firstname} height="50px" width="50px"/>{student.firstname} {student.lastname}</a>
                                        </div>
                                    ))
                                    :  <div className="collection"><a className="collection-item">Geen meldingen!</a></div>
                                }

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
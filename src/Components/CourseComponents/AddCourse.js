import React, {Component} from 'react';
import * as CourseService from '../../Services/CourseService.js';
import Header from '../GeneralComponents/Header';
import StyledTextField from '../GeneralComponents/StyledTextField';
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize';
import swal from 'sweetalert2';
import * as UserService from '../../Services/UserService';

class AddCourse extends Component {

    constructor(props) {
        super(props);
        console.log("Constructed");
        this.state = {
            beschrijving: "",
            teacherids: [],
            studentids: [],
            teachers: [],
            students: [],
        };

    }

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Course Added',
            showConfirmButton: false,
            timer: 1500
        });
        console.log("Beschrijving: " + this.state.beschrijving);
        console.log("studentIds: " + this.state.userids);
        console.log("teacherIds: " + this.state.teacherids);

        CourseService.postCourse(JSON.stringify(
            {
                coursebeschrijving: this.state.beschrijving,
                teacherids: this.state.teacherids,
                userids: this.state.userids,
                prijs: 1
            }
        ));
    };

    componentDidMount() {
        this.addStudents();
        this.addTeachers();
    }

    addTeachers = () => {
        UserService.getStudents().then(console.log("----Students---- \n"))
            .then(students => {
                this.setState({users: students.users}, console.log(students.users));
            });
    };

    addStudents = () => {
        UserService.getTeachers().then(console.log("----Teachers---- \n"))
            .then(teachers => {
                this.setState({teachers: teachers.users}, console.log(teachers.users));
            });

    };

    onChangeDescription = (e) => {
        this.setState({beschrijving: e.target.value});
        console.log("beschrijving:" + e.target.value)
    };


    handleTeacherChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({teacherids: value});
        console.log(this.state.teacherids);
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

    render() {
        return (
            <div className="Homepage">
                <Header name="Add Course"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable">
                                <div className="card-content">
                                    <form className="addCourse" action="/" method="POST" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5 className="truncate">Beschrijving</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeDescription}
                                                                     hint="Geef een beschrijving in..."
                                                                     label="Beschrijving"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5 className="truncate">Leerkrachten</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <Row>
                                                        <Input s={12} multiple={true} type='select'
                                                               onChange={this.handleTeacherChange}
                                                               label="Leerkrachten" icon='face' defaultValue='1'>
                                                            <option key="" value="" disabled>Kies de leerkrachten
                                                            </option>
                                                            {this.state.teachers.map((teacher, index) => (
                                                                <option key={teacher.userid}
                                                                        value={teacher.userid}>{teacher.firstname} {teacher.lastname}</option>
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
                                                        <Input s={12} multiple={true} type='select' label="Studenten" onChange={this.handleStudentChange}
                                                               icon='child_care' defaultValue='1'>
                                                            <option key="" value="" disabled>Kies de studenten</option>
                                                            {this.state.users.map((student, index) => (
                                                                <option key={student.userid}
                                                                        value={student.userid}>{student.firstname} {student.lastname}</option>
                                                            ))}
                                                        </Input>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                    </form>

                                </div>

                                <div className="card-action">
                                    <Link to="/courses" onClick={this.handleClick}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                        <i
                                            className="material-icons">done</i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col s0 m2 l2"/>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddCourse;


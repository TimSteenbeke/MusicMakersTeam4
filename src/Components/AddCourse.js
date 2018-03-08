/**
 * Created by Ben on 27/02/2018.
 */
import React, {Component} from 'react';
import * as CourseService from '../Services/CourseService.js'
import Header from './Header'
import StyledTextField from './StyledTextField'
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize'
import swal from 'sweetalert2'
import * as UserService from '../Services/UserService'

class AddCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            beschrijving: "",
            prijs: 0,
            selectedteacherids: [],
            selectedstudentids: [],
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
        CourseService.postCourse(JSON.stringify(
            {
                beschrijving: this.state.beschrijving,
                teacherids: this.state.selectedteacherids,
                studentids: this.state.selectedstudentids
            }
        ));
    };

    componentDidMount() {
        this.addStudents();
        this.addTeachers();
    }

    addTeachers() {
        UserService.getStudents().then(console.log("----Students---- \n"))
            .then(students => {
                this.setState({students: students.users}, console.log(students.users));
            });
    }

    addStudents() {
        UserService.getTeachers().then(console.log("----Teachers---- \n"))
            .then(teachers => {
                this.setState({teachers: teachers.users}, console.log(teachers.users));
            });

    }

    onChangeDescription = (e) => {
        this.setState({beschrijving: e.target.value});
        console.log("beschrijving:" + e.target.value)
    };

    handleChange = (event, value) => {
        this.setState({value});
        console.log(value)
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
                                                               label="Leerkrachten" icon='face' defaultValue='1'>
                                                            <option key="" value="" disabled>Kies de leerkrachten</option>
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
                                                        <Input s={12} multiple={true} type='select' label="Studenten"
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


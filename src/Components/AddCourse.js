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
import * as CourseTypeService from '../Services/CourseTypeService.js'

class AddCourse extends Component {

    constructor(props) {
        super(props);
        console.log("Constructed");
        this.state = {
            beschrijving: "",
            teacherids: [],
            studentids: [],
            courseTypeId: 0,
            teachers: [],
            students: [],
            courseTypes: []
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
                courseTypeId: this.state.courseTypeId,
                teacherids: this.state.teacherids,
                studentids: this.state.studentids
            }
        ));
    };

    componentDidMount() {
        this.addCourseTypes();
        this.addStudents();
        this.addTeachers();
    }

    addCourseTypes = () => {
        CourseTypeService.getCourseTypesFromBackend().then(console.log("-----CourseTypes------"))
            .then(courseTypes => {
                this.setState({courseTypes: courseTypes});
                console.log(courseTypes);
            })
    }

    addStudents = () => {
        UserService.getStudents().then(console.log("----students---- \n"))
            .then(students => {
                this.setState({students: students.users}, console.log(students.users));
                console.log(students);
            });
        console.log("this state");
        console.log(this.state.students);
    };

    addTeachers = () => {
        UserService.getTeachers().then(console.log("----teachers---- \n"))
            .then(teachers => {
                this.setState({teachers: teachers.users}, console.log(teachers.users));
                console.log('teachers');
                console.log(teachers);
            });

    };

    onChangeDescription = (e) => {
        this.setState({beschrijving: e.target.value});
        console.log("beschrijving:" + e.target.value)
    };

    handleCourseTypeChange = (e, value) => {

        this.setState({courseTypeId: value});
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
        this.setState({studentids: value});
        console.log(this.state.studentids);
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
                                                    <Row>
                                                        <Input s={12} multiple={false} type='select'
                                                               onChange={this.handleCourseTypeChange}
                                                               label="Leerkrachten" icon='face' defaultValue='1'>
                                                            <option key="" value="" disabled>Kies lesType
                                                            </option>
                                                            {this.state.courseTypes.map((courseType, index) => (
                                                                <option key={courseType.courseTypeId}
                                                                        value={courseType.courseTypeId}>{courseType.description}</option>
                                                            ))}
                                                        </Input>
                                                    </Row>
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


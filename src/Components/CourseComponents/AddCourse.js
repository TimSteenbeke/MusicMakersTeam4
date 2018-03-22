import React, {Component} from 'react';
import * as CourseService from '../../Services/CourseService.js'
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize'
import swal from 'sweetalert2'
import * as UserService from '../../Services/UserService'
import * as CourseTypeService from '../../Services/CourseTypeService.js'

export default class AddCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: "",
            teacherIds: [],
            studentIds: [],
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
            title: 'Cursus toegevoegd',
            showConfirmButton: false,
            timer: 1500
        });

        CourseService.postCourse(JSON.stringify(
            {
                courseTypeId: this.state.courseTypeId,
                teacherids: this.state.teacherIds,
                studentids: this.state.studentIds
            }
        ));
    };

    componentDidMount() {
        this.addCourseTypes();
        this.addStudents();
        this.addTeachers();
    }

    addCourseTypes = () => {
        CourseTypeService.getCourseTypesFromBackend()
            .then(courseTypes => {
                this.setState({courseTypes: courseTypes});
            })
    };

    addStudents = () => {
        UserService.getStudents().then(students => {
                this.setState({students: students.users});
            });
    };

    addTeachers = () => {
        UserService.getTeachers()
            .then(teachers => {
                this.setState({teachers: teachers.users});
            });

    };

    onChangeDescription = (e) => {
        this.setState({description: e.target.value});
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
        this.setState({teacherIds: value});
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
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Cursus toevoegen"/>
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
                                                    <h5 className="truncate">Type</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <Row>
                                                        <Input s={12} multiple={false} type='select'
                                                               onChange={this.handleCourseTypeChange}
                                                               label="Type" icon='face' defaultValue='1'>
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


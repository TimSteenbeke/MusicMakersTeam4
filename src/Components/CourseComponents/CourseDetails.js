import React, {Component} from 'react';
import * as CourseService from '../../Services/CourseService.js'
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize'
import swal from 'sweetalert2'
import * as CourseTypeService from "../../Services/CourseTypeService";
import * as UserService from "../../Services/UserService";

export default class CoursesDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: this.props.match.params.id,
            courseTypes: [],
            teachers : [],
            students: [],

            selectedTeachers :[],
            selectedStudents :[],
            selectedCourseType: 0
        }

    }


    componentDidMount() {

        let self = this;
        CourseService.getCourseFromBackend(self.state.courseId)
            .then(course => {
                self.setState({
                    courseId: this.props.match.params.id,
                    selectedCourseType: course.courseType.courseTypeId,
                    selectedTeachers:  course.teachers.map( teacher => teacher.id),
                    selectedStudents: course.students.map( student => student.id),



                });
            }).catch((error) => {
            console.log(error);
        });

        this.addCourseTypes();
        this.addStudents();
        this.addTeachers();
    }

    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Cursus geupdate',
            showConfirmButton: false,
            timer: 1500
        });
        let self = this;
        CourseService.updateCourse(self.state.courseId, JSON.stringify(
            {
                description: self.state.description,
            }
        ));

    };



    addCourseTypes = () => {
        CourseTypeService.getCourseTypesFromBackend().then(courseTypes => {
                this.setState({courseTypes: courseTypes});
            })
    }

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

    handleCourseTypeChange = (e, value) => {

        this.setState({selectedCourseType: value});
    };

    handleTeacherChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({selectedTeachers: value});
    };

    handleStudentChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({selectedStudents: value});
    };

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Cursus geupdate',
            showConfirmButton: false,
            timer: 1500
        });

        CourseService.updateCourse(this.state.courseId, JSON.stringify(
            {
                courseTypeId: this.state.selectedCourseType,
                teacherIds: this.state.selectedTeachers,
                studentIds: this.state.selectedStudents
            }
        ));
    };




    render() {
        return (
            <div className="Homepage">
                <Header name="Cursus updaten"/>
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
                                                               label="Leerkrachten" icon='face' value={this.state.selectedCourseType}>
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
                                                               label="Leerkrachten" icon='face' value={this.state.selectedTeachers}>
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
                                                               icon='child_care' value={this.state.selectedStudents}>
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

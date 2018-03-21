import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";
import Header from "../GeneralComponents/Header";
import * as CourseService from "../../Services/CourseService";
import './MyCourseDetails.css';

export default class MyCourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: this.props.match.params.id,
            beschrijving: "string",
            students: [],
            teachers: [],

            lessons: []

        };
    }

    componentDidMount() {
        let self = this;
        CourseService.getCourseFromBackend(self.state.courseId)
            .then(course => {
                self.setState({
                    courseId: this.props.match.params.id,
                    beschrijving: course.description,
                    students: course.students,
                    teachers: course.teachers
                });
            }).catch((error) => {
            console.log(error);
        });
        this.retrieveLessons(self.state.courseId);
    }

    retrieveLessons(courseId) {
        CourseService.getLessonsFromCourse(courseId)
            .then(lessons => {
                this.setState({lessons: lessons.lessonResources});
            })
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Course details"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m12 l12 center">
                            <h4>{this.state.beschrijving}</h4>
                        </div>
                        <div className="col s12 m12 l12">
                            <h5>Begeleiders:</h5>
                        </div>
                        <div className="col s12 m12 l12">
                            {this.state.teachers.map((teacher, index) => (
                                <p><i className="material-icons">person</i> {teacher.firstname + " " + teacher.lastname}<br/></p>
                            ))}
                        </div>
                        <div className="col s12 m12 l12">
                            <h5>Leden:</h5>
                        </div>
                        <div className="col s12 m12 l12">
                            {this.state.students.map((student, index) => (
                                <p><i className="material-icons">person</i> {student.firstname + " " + student.lastname}<br/></p>
                            ))}
                        </div>
                        <div className="col s12 m12 l12">
                            <div className="fixed-action-btn">
                                <Link to="/addLesson" className="btn-floating btn-large deep-orange darken-4">
                                    <i className="large material-icons">add</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>Lessen:</h5>
                        {this.state.lessons.map((lesson, index) => (
                          <section>
                              <div>
                                  <p>Les: {index+1}</p>
                                  <div> {new Date(lesson.startdatetime).toLocaleString()} / {new Date(lesson.enddatetime).toLocaleString()}</div>
                                  <div>
                                      <p>Afwezigen: </p>
                                    <div>{lesson.absentStudents.map((absentStudent, index) => {return <p><i className="material-icons">person</i> {absentStudent.firstname + " " + absentStudent.lastname}<br/></p>})}</div>
                                  </div>
                                  <div>
                                      <p>Geen status:</p>
                                     <div>{lesson.noStatusStudents.map((noStatusStudent, index) => {return  <p><i className="material-icons">person</i> {noStatusStudent.firstname + " " + noStatusStudent.lastname}<br/></p>})}</div>
                                  </div>
                                  <div>
                                      <p>Aanwezigen: </p>
                                     <div>{lesson.presentStudents.map((presentStudent) => { return <p><i className="material-icons">person</i> {presentStudent.firstname + " " + presentStudent.lastname}<br/></p>})}</div>
                                  </div>
                                  </div>
                          </section>
                        ))}

                    </div>
                    </div>
                </section>
            </div>
        );
    }
}
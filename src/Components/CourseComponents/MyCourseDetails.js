import React, {Component} from 'react';
import {black500} from 'material-ui/styles/colors';
import * as LoginService from "../../Services/LoginService";
import Link from "react-router-dom/es/Link";
import Redirect from "react-router-dom/es/Redirect";
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
        };
    }

    componentDidMount() {
        let self = this;
        CourseService.getCourseFromBackend(self.state.courseId)
            .then(console.log("----Course met id " + self.state.courseId + "---- \n"))
            .then(course => {
                self.setState({
                    courseId: this.props.match.params.id,
                    beschrijving: course.description,
                    students: course.students,
                    teachers: course.teachers
                });
                console.log(self.state.beschrijving);
                console.log(course.users);
                console.log(course);
            }).catch((error) => {
            console.log(error);
        });
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
                                <Link to="/addgroup" className="btn-floating btn-large deep-orange darken-4">
                                    <i className="large material-icons">add</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
/**
 * Created by Ben on 27/02/2018.
 */
import React, {Component} from 'react';
import * as CourseService from '../Services/CourseService'
import RaisedButton from 'material-ui/RaisedButton';
import Header from './Header'
import {Link} from 'react-router-dom';


class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            selectedIndex: 0,
        }

        ;
    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses() {
        CourseService.getCoursesFromBackend().then(courses => {
            this.setState({courses: courses});
        });
    }

    handleDelete = () => {
        CourseService.deleteCourse(this.state.selectedIndex);
    };


    componentWillUpdate() {
        CourseService.getCoursesFromBackend().then(courses => {
            this.setState({courses: courses});
        });
    }


    render() {

        const actionsUpdate = [
            <RaisedButton label="Close" onClick={this.handleCloseUpdate} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>,
        ];

        return (

            <div className="Homepage">
                <Header name="Courses"/>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Course</th>
                            <th>Prijs</th>
                            <th>Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.courses.map((course, index) => (
                            <tr key={course.courseId} id={course.courseId}>
                                <td>{course.courseId}</td>
                                <td>{course.beschrijving}</td>
                                <td>{course.prijs}</td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator"
                                          to={`/coursedetails/${course.courseId}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn"
                                       onClick={(e) => this.handleDelete(course.courseId, e)}><i
                                        className="material-icons">delete
                                    </i></a>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </section>
            </div>
        );
    }
}

export default Courses;

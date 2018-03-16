import React, {Component} from 'react';
import * as CourseService from '../../Services/CourseService';
import {Link} from 'react-router-dom';
import Header from '../GeneralComponents/Header';
import {black500} from 'material-ui/styles/colors';
import './MyCourses.css';

export default class MyCourses extends Component {
    constructor(props) {
        super(props);
        console.log("Constructed");
        this.state = {
            courses: [],
            selectedIndex: 0,
        };
    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses() {
        CourseService.getCoursesFromBackend().then(courses => {
            this.setState({courses: courses});
        });
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Mijn vakken"/>
                <section className="containerCss">
                    <table className="black-text bordered responsive-table centered">
                        <colgroup>
                            <col style={{width:33}}/>
                            <col style={{width:33}}/>
                            <col style={{width:33}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th className="center">Vak</th>
                            <th className="center">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.courses.map((course, index) => (
                            <tr key={index} id={course.courseId}>
                                <td>{course.beschrijving}</td>
                                <td>
                                    <Link className="waves-effect white-text red darken-4 btn marginator" to={`/mycoursedetails/${course.courseId}`}>Details</Link>
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
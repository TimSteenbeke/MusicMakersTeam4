import React, {Component} from 'react';
import * as CourseService from '../../Services/CourseService.js'
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2'


export default class Courses extends Component {
    constructor(props) {
        super(props);
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

    handleDelete = (id, e) => {
        swal({
            title: 'Bent je zeker?',
            text: "Dit kan niet ongedaan gemaakt worden!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Verwijder!',
            cancelButtonText: 'Annuleer!',
            confirmButtonClass: 'btn red',
            cancelButtonClass: 'btn green marginator',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                CourseService.deleteCourse(id);
                swal(
                    'Verwijderen!',
                    'Cursus werd verwijderd.',
                    'success'
                ).then(() => {
                    this.props.history.push("/courses");
                });

            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Gestopt',
                    'Cursus werd niet verwijderd',
                    'error'
                )
            }
        })
    };



    render() {

        return (

            <div className="Homepage">
                <Header name="Cursussen"/>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Cursus</th>
                            <th>Prijs</th>
                            <th>Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.courses.map((course, index) => (
                            <tr key={course.courseId} id={course.courseId}>
                                <td>{course.courseId}</td>
                                <td>{course.courseType.description}</td>
                                <td>{course.courseType.price}</td>
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
                    <div className="fixed-action-btn">
                        <Link to="/addCourse" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}

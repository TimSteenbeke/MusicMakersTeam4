import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as LesService from '../../Services/LesService'
import swal from "sweetalert2";
import Header from '../GeneralComponents/Header';
import './AddLesson.css';

export default class Lessons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
        };
    }

    componentDidMount() {
        this.getLessons();
    }

    getLessons() {
        LesService.getLessons().then(lessons => {
            this.setState({lessons: lessons});
        });
    }

    handleDelete = (id, e) => {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn red',
            cancelButtonClass: 'btn green marginator',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    'Lesson has been deleted.',
                    'success'
                );
                LesService.deleteLesson(id);
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Cancelled',
                    'Lesson was not deleted',
                    'error'
                )
            }
        });
    };

    render() {

        return (

            <div className="Homepage">
                <Header name="Lessen"/>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Beschrijving</th>
                            <th>Begindatum</th>
                            <th>Einddatum</th>
                            <th>Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.lessons.map((les, index) => (
                            <tr key={index} id={les.id}>
                                <td>{les.course.description}</td>
                                <td>{les.startdatetime}</td>
                                <td>{les.enddatetime}</td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator"
                                          to={`/lessonDetails/${les.id}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn"
                                       onClick={(e) => this.handleDelete(les.id, e)}><i
                                        className="material-icons">delete
                                    </i></a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link to="/addLesson" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}
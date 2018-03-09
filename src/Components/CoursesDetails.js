/**
 * Created by jariv on 28/02/2018.
 */
/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import * as CourseService from '../Services/CourseService'
import Header from './Header'
import StyledTextField from './StyledTextField'
import {Link} from 'react-router-dom';
import swal from 'sweetalert2'

class CoursesDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: this.props.match.params.id,
            beschrijving: "string",
        }

    }


    componentDidMount() {
        let self = this;
        CourseService.getCourseFromBackend(self.state.courseId)
            .then(console.log("----Course met id " + self.state.courseId + "---- \n"))
            .then(course => {
                self.setState({
                    courseId: this.props.match.params.id,
                    beschrijving: course.description,
                });
                console.log(self.state.beschrijving);
                console.log(course.users);
            }).catch((error) => {
            console.log(error);
        });
    }

    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Course Edited',
            showConfirmButton: false,
            timer: 1500
        });
        let self = this;
        CourseService.updateCourse(self.state.courseId, JSON.stringify(
            {
                beschrijving: self.state.beschrijving,
                prijs: self.state.prijs
            }
        ));
        console.log("coursebeschrijving: " + self.state.beschrijving);
        console.log("prijs: " + self.state.prijs);

    };


    render() {
        return (
            <div className="Homepage">
                <Header name={"Course " + this.state.courseId}/>

                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable z-depth-3">
                                <div className="card-content">
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5 className="truncate">{this.state.beschrijving}</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <StyledTextField hint="Geef nieuw coursebeschrijving in..."
                                                                 label="Coursebeschrijving"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <Link to="/courses" onClick={this.handleUpdate}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse"><i
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

export default CoursesDetails;


import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header'
import swal from 'sweetalert2'
import * as CourseTypeService from "../Services/CourseTypeService";


class CourseTypes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseTypes: [""],
            selectedIndex: 0,
        };
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
                    'CourseType has been deleted.',
                    'success'
                );
                CourseTypeService.deleteCourseType(id);
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Cancelled',
                    'CourseType was not deleted',
                    'error'
                )
            }
        });
    };

    getCourseTypes() {
        CourseTypeService.getCourseTypesFromBackend().then(courseTypes => {
            console.log(courseTypes);
            this.setState({courseTypes: courseTypes});
        });
    }

    componentDidMount(){
        this.getCourseTypes();
    }




    render() {

        return (
            <div className="Homepage">
                <Header name="CourseTypes" />

                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Beschrijving</th>
                            <th>Prijs</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.courseTypes.map((courseType, index) => (
                            <tr key={index} id={courseType.courseTypeId}>
                                <td>{courseType.description}</td>
                                <td>{courseType.price}</td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator" to={`/coursetypedetails/${courseType.courseTypeId}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn" onClick={(e) => this.handleDelete(courseType.courseTypeId, e)}><i className="material-icons">delete
                                    </i></a>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link to="/addcoursetype" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}

export default CourseTypes;


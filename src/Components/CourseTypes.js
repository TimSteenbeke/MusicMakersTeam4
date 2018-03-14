/**
 * Created by jariv on 9/02/2018.
 */
import React, {Component} from 'react';
import * as InstrumentenService from '../Services/InstrumentService.js'
import {Link} from 'react-router-dom';
import Header from './Header'
import swal from 'sweetalert2'


class Instrumenten extends Component {

    constructor(props) {
        super(props);
        console.log("Constructed");
        this.state = {
            instrumenten: [],
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
                    'Instrument has been deleted.',
                    'success'
                );
                InstrumentenService.deleteInstrument(id);
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Cancelled',
                    'Instrument was not deleted',
                    'error'
                )
            }
        });

    };

    getInstrumenten() {
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }


    componentWillUpdate() {
        this.getInstrumenten();
    }


    componentDidMount() {
        this.getInstrumenten();
    }


    render() {

        return (
            <div className="Homepage">
                <Header name="Instrumenten" />

                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Beschrijving</th>
                            <th>Prijs</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.instrumenten.map((courseType, index) => (
                            <tr key={index} id={courseType.courseTypeId}>
                                <td>{courseType.courseTypeDescription}</td>
                                <td>{courseType.price}</td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator" to={`/instrumentdetails/${courseType.instrumentId}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn" onClick={(e) => this.handleDelete(courseType.instrumentId, e)}><i className="material-icons">delete
                                    </i></a>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link to="/addInstrument" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}

export default CourseType;


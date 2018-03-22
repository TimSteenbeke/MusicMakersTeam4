import React, {Component} from 'react';
import * as InstrumentService from '../../Services/InstrumentService.js';
import {Link} from 'react-router-dom';
import Header from '../GeneralComponents/Header';
import swal from 'sweetalert2';
import './Instruments.css';

export default class Instruments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
            selectedIndex: 0,
        };
    }

    handleDelete = (id, e) => {
        swal({
            title: 'Ben je zeker?',
            text: "Je kan dit niet terugdraaien!",
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
                InstrumentService.deleteInstrument(id);
                swal(
                    'Deleted!',
                    'Instrument has been deleted.',
                    'success'
                ).then(() => {
                    this.getInstrumenten();
                });

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

    componentWillReceiveProps() {
        this.getInstrumenten();
    }

    getInstrumenten() {
        InstrumentService.getInstrumentenFromBackend().then(Instruments => {
            this.setState({instruments: Instruments});
        });
    }


    componentDidMount() {
        this.getInstrumenten();
    }

    render() {
            return (
                <div className="Homepage">
                    <Header name="Instrumenten"/>
                    <section className="containerCss">
                        <table className="highlight striped black-text bordered responsive-table centered">
                            <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Type</th>
                                <th>Uitvoering</th>
                                <th>Acties</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.instruments.map((instrument, index) => (
                                <tr key={index} id={instrument.instrumentid}>

                                    <td>{instrument.instrumentname}</td>

                                    <td>{instrument.type}</td>
                                    <td>{instrument.details}</td>
                                    <td>
                                        <Link className="waves-effect white-text deep-orange darken-4 btn marginator"
                                              to={`/instrumentdetails/${instrument.instrumentid}` }>
                                            <i className="material-icons">edit
                                            </i>
                                        </Link>
                                        <a className="waves-effect white-text deep-orange darken-4 btn"
                                           onClick={(e) => this.handleDelete(instrument.instrumentid, e)}><i
                                            className="material-icons">delete
                                        </i></a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="fixed-action-btn">
                            <Link to="/addinstrument" className="btn-floating btn-large deep-orange darken-4">
                                <i className="large material-icons">add</i>
                            </Link>
                        </div>
                    </section>
                </div>

            );
    }
}


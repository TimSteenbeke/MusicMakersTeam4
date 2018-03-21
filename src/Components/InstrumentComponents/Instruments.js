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
            Instruments: [],
            selectedIndex: 0,
        };
    }

    handleDelete = (id, e) => {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                InstrumentService.deleteInstrument(id);
                swal({
                    title: "Deleted!",
                    text: "Instrument has been deleted!",
                    type: "success"
                }).then(() => {
                    this.props.history.push("/instrumenten");
                });

                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swal(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    };

    componentWillReceiveProps() {
        this.getInstrumenten();
    }

    getInstrumenten() {
        InstrumentService.getInstrumentenFromBackend().then(Instruments => {
            this.setState({Instruments: Instruments});
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
                            {this.state.Instruments.map((instrument, index) => (
                                <tr key={index} id={instrument.instrumentId}>

                                    <td>{instrument.instrumentname}</td>

                                    <td>{instrument.type}</td>
                                    <td>{instrument.details}</td>
                                    <td>
                                        <Link className="waves-effect white-text deep-orange darken-4 btn marginator"
                                              to={`/instrumentdetails/${instrument.instrumentId}` }>
                                            <i className="material-icons">edit
                                            </i>
                                        </Link>
                                        <a className="waves-effect white-text deep-orange darken-4 btn"
                                           onClick={(e) => this.handleDelete(instrument.instrumentId, e)}><i
                                            className="material-icons">delete
                                        </i></a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="fixed-action-btn">
                            <Link to="/addinstrumentlevel" className="btn-floating btn-large deep-orange darken-4">
                                <i className="large material-icons">add</i>
                            </Link>
                        </div>
                    </section>
                </div>

            );
    }
}


import React, {Component} from 'react';
import * as InstrumentService from '../../Services/InstrumentService.js';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';

export default class InstrumentLevels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instrumentlevels: [],
            selectedIndex: 0,
        };
    }

    componentWillReceiveProps() {
        this.getInstrumentLevels();
    }

    getInstrumentLevels() {
        InstrumentService.getInstrumentenLevelsFromBackend().then(levels => {
            this.setState({instrumentlevels: levels});
        });
        console.log(this.state.instrumentlevels);
    }

    componentDidMount() {
        this.getInstrumentLevels();
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
                    text: "Instrumentlevel has been deleted!",
                    type: "success"
                }).then(() => {
                    this.props.history.push("/instrumentlevels");
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

    render() {
        return (
            <div className="Homepage">
                <Header name="Instrument levels"/>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Gebruiker</th>
                            <th>Instrument</th>
                            <th>Niveau</th>
                            <th>Maximum niveau</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.instrumentlevels.map((level, index) => (
                            <tr key={index} id={level.instrumentLevelId}>
                                <td>{level.user.firstname}</td>
                                <td>{level.instrument.instrumentName}</td>
                                <td>{level.level}</td>
                                <td>{level.maxLevel}</td>
                                <td>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link  to="/addinstrumentlevel" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>

        );
    }
}


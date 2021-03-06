import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as PerformanceService from '../../Services/PerformanceService';
import swal from "sweetalert2";
import Header from '../GeneralComponents/Header';
import './AddPerformance.css';

export default class Performance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performances: [],
        };
    }

    componentDidMount() {
        this.getPerformances();
    }

    getPerformances() {
        PerformanceService.getAllPerformances().then(performances => {
            let perfs = performances;
            perfs.forEach(perf => {
                perf.startdatetime = new Date(perf.startdatetime);
                perf.enddatetime = new Date(perf.enddatetime);
                if (perf.group == null) {
                    perf.group = {name: "Eigen optreden"}
                }
            });
            this.setState({performances: perfs});
        });
    }

    handleDelete = (id, e) => {
        swal({
            title: 'Bent u zeker?',
            text: "U kan dit niet ongedaan maken!",
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
                PerformanceService.deletePerformance(id);
                swal(
                    'Verwijderd!',
                    'Performance werd verwijderd.',
                    'success'
                ).then(() => {
                    this.props.history.push("/performance");
                });
            } else if (
                result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Gestopt',
                    'Preformance werd niet verwijderd',
                    'error'
                )
            }
        });
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Optreden"/>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Groep</th>
                            <th>Beschrijving</th>
                            <th>Begindatum</th>
                            <th>Einddatum</th>
                            <th>Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.performances.map((performance, index) => (
                            <tr key={index} id={performance.id}>
                                <td>{performance.group.name}</td>
                                <td>{performance.description}</td>
                                <td>{performance.startdatetime.toUTCString()}</td>
                                <td>{performance.enddatetime.toUTCString()}</td>
                                <td>
                                    <div className="row">
                                        <div className="col s6">
                                            <Link
                                                className="waves-effect white-text deep-orange darken-4 btn"
                                                to={`/performanceDetails/${performance.id}`}>
                                                <i className="material-icons">edit
                                                </i>
                                            </Link>
                                        </div>
                                        <div className="col s6">
                                            <a className="waves-effect white-text deep-orange darken-4 btn"
                                               onClick={(e) => this.handleDelete(performance.id, e)}><i
                                                className="material-icons">delete
                                            </i></a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link to="/addPerformance" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}
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
            perfs.forEach(perf=>{
                if(perf.group == null){
                    perf.group= {name:"Eigen optreeden"}
                }
            });
            this.setState({performances: perfs});
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
                    'Performance has been deleted.',
                    'success'
                );
                PerformanceService.deletePerformance(id);
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Cancelled',
                    'Preformance was not deleted',
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
                                <td>{performance.startdatetime}</td>
                                <td>{performance.enddatetime}</td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator"
                                          to={`/performanceDetails/${performance.id}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn"
                                       onClick={(e) => this.handleDelete(performance.id, e)}><i
                                        className="material-icons">delete
                                    </i></a>
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
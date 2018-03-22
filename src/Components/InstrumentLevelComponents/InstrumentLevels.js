import React, {Component} from 'react';
import * as InstrumentLevelService from '../../Services/InstrumentLevelService';
import * as InstrumentService from '../../Services/InstrumentService';

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
            console.log(levels);
            this.setState({instrumentlevels: levels});
        });
        console.log(this.state.instrumentlevels);

    }

    handleDelete = (id, e) => {
        console.log(id);
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
                InstrumentLevelService.deleteInstrumentLevel(id);
                swal({
                    title: "Verwijderd!",
                    text: "Instrument niveau is verwijderd!",
                    type: "success"
                }).then(() => {
                    this.getInstrumentLevels();
                });
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swal(
                    'Gestopt',
                    'Item is behouden',
                    'error'
                )
            }
        })
    };

    showUpdate = () =>{
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Niveau aangepast!',
            showConfirmButton: false,
            timer: 500
        });
    };

    upLevel = (id, e) => {
        InstrumentLevelService.increaseLevel(id).then(() =>
            this.getInstrumentLevels()
        );

        this.showUpdate();

    };

    lowerLevel = (id, e) => {
        InstrumentLevelService.decreaseLevel(id).then(() =>
            this.getInstrumentLevels()
        );

        this.showUpdate();
    };

    componentDidMount() {
        this.getInstrumentLevels();
    }

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
                            <tr key={index} id={level.instrumentlevelid}>
                                <td>{level.user.firstname}</td>
                                <td>{level.instrument.instrumentName}</td>
                                <td><button onClick={(e) => this.upLevel(level.instrumentlevelid, e)} className="btn-floating deep-orange darken-4">+</button> {level.level} <button onClick={(e) => this.lowerLevel(level.instrumentlevelid, e)} className="btn-floating deep-orange darken-4">-</button></td>
                                <td>{level.maxLevel}</td>
                                <td>
                                        <div className="col s6 m6 l6">
                                            <a className="waves-effect white-text deep-orange darken-4 btn"
                                               onClick={(e) => this.handleDelete(level.instrumentlevelid, e)}>
                                                <i className="material-icons">delete
                                                </i>
                                            </a>
                                        </div>
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


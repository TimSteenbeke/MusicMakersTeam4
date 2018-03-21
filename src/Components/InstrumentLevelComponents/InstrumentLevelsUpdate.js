import React, {Component} from 'react';
import * as InstrumentService from '../../Services/InstrumentService.js';
import Header from '../GeneralComponents/Header';
import StyledTextField from '../GeneralComponents/StyledTextField';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import {Row, Input} from 'react-materialize';

export default class InstrumentLevelsUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instrumentLevelId: this.props.match.params.id,
            user: [],
            instrument: [],
            level: "",
            maxlevel: "",
        }
    }

    componentDidMount() {
        let self = this;
        InstrumentService.getInstrumentenLevelFromBackend(self.state.instrumentLevelId)
            .then(level => {
                self.setState({
                    user: level.user,
                    instrument: level.instrument,
                    level: level.level,
                    maxlevel: level.maxlevel
                });
            }).catch((error) => {
            console.log(error);
        });
    }

    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Instrument Edited',
            showConfirmButton: false,
            timer: 1500
        });
        let self = this;
        InstrumentService.UpdateInstrumentLevel(self.state.instrumentLevelId, JSON.stringify(
            {
                level: this.state.level,
                maxlevel: this.state.maxlevel,
            }
        ));
    };

    setLevel = event => {
        let value = event.target.value;
        return this.setState({level: value})
    };

    setMaxLevel = event => {
        let value = event.target.value;
        return this.setState({maxlevel: value})
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="InstrumentLevel bewerken"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-l2">
                        <div className="card hoverable z-depth-3">
                             <div className="card-content">
                                <div className="divider"></div>
                                <div className="section">
                                    <div className="row">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField disabled value={this.state.user.userName} defaultValue={this.state.user.userName}  label="Gebruiker"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="section">
                                    <div className="row">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField disabled value={this.state.instrument.instrumentName} defaultValue={this.state.instrument.instrumentName} label="Instrument"/>

                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="section">
                                    <div className="row">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField value={this.state.level} defaultValue={this.state.level} onChange={this.setLevel} label="Level" placeholder="Geef een level in..."/>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="section">
                                    <div className="row">
                                        <div className="col s12 m12 l12">
                                            <StyledTextField value={this.state.maxlevel} defaultValue={this.state.maxlevel} onChange={this.setMaxLevel} label="Maximum level" placeholder="Geef een maximum level in..."/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <Link to="/instrumenten" onClick={this.handleUpdate}
                                      className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse"><i
                                    className="material-icons">done</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

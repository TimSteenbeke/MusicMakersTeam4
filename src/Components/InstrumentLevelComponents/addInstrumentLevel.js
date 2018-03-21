/**
 * Created by Ben on 21/03/2018.
 */
import React, {Component} from 'react';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize'
import swal from 'sweetalert2'
import * as UserService from '../../Services/UserService'
import * as InstrumentLevelService from '../../Services/InstrumentLevelService'
import * as InstrumentService from '../../Services/InstrumentService'
import StyledTextField from '../GeneralComponents/StyledTextField';

/*
 private int userid;
 private int maxlevel;
 private int level;
 private int instrumentid;
 */

export default class addInstrumentLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
            students: [],
            userid: "",
            instrumentid: "",
            level: 0,
            maxlevel: 0
        };
    }

    componentDidMount() {
        InstrumentService.getInstrumentenFromBackend().then(Instruments => {
            this.setState({instruments: Instruments});
        });
        this.addStudents();

    }

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Instrument niveau toegevoegd',
            showConfirmButton: false,
            timer: 1500
        });

        InstrumentLevelService.postInstrumentLevel(JSON.stringify(
            {
                userid: this.state.userid,
                maxlevel: this.state.maxlevel,
                level: this.state.level,
                instrumentid: this.state.instrumentid,

            }
        ));
    };


    handleStudentChange = (e) => {
        let options = e.target.options;
        let value = 1;
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value = options[i].value;
            }
        }

        this.setState({userid: value});
    };

    handleInstrumentChange = (e) => {
        let options = e.target.options;
        let value = 1;
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value = options[i].value;
            }
        }
        this.setState({instrumentid: value});
    };

    changeLevel = event => {
        let value = event.target.value;
        this.setState({level: value});
    };

    changeMaxLevel = event => {
        let value = event.target.value;
        this.setState({maxlevel: value});

    };

    addStudents = () => {
        UserService.getStudents().then(students =>
        {
            this.setState({students: students.users});
        });
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Add Course"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable">
                                <div className="card-content">
                                    <form className="addCourse" action="/" method="POST" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5 className="truncate">Studenten</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <Row>
                                                        <Input s={12} multiple={false} type='select'
                                                               onChange={this.handleStudentChange}
                                                               label="Studenten" icon='face' defaultValue='1'>
                                                            <option key="" value="" disabled>Kies student
                                                            </option>
                                                            {this.state.students.map((student, index) => (
                                                                <option key={student.userid}
                                                                        value={student.userid}>{student.firstname}</option>
                                                            ))}
                                                        </Input>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5 className="truncate">Leerkrachten</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <Row>
                                                        <Input s={12} multiple={false} type='select'
                                                               onChange={this.handleInstrumentChange}
                                                               label="Instrumenten" icon='face' defaultValue='1'>
                                                            <option key="" value="" disabled>Kies het instrument
                                                            </option>
                                                            {this.state.instruments.map((instrument, index) => (
                                                                <option key={instrument.instrumentid}
                                                                        value={instrument.instrumentid}>{instrument.instrumentname}</option>
                                                            ))}
                                                        </Input>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="divider"></div>
                                    </form>
                                <StyledTextField onChange={this.changeLevel} label="Instrumentscore (0-10)" required={true}/>
                                </div>

                                <StyledTextField onChange={this.changeMaxLevel} label="Maxlevel (0-10)" required={true}/>

                                <div className="card-action">
                                    <Link to="/courses" onClick={this.handleClick}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                        <i
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
import React, {Component} from 'react';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize'
import swal from 'sweetalert2'
import * as UserService from '../../Services/UserService'
import * as InstrumentLevelService from '../../Services/InstrumentLevelService'
import * as InstrumentService from '../../Services/InstrumentService'
import StyledTextField from '../GeneralComponents/StyledTextField';


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
        console.log(this.state.instruments);
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

        this.prop.history.push("/instrumentlevels");
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
                <Header name="Instrumentlevel toewijzen"/>
                <section className="containerCss">
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable">
                                <div className="card-content">
                                    <h4 className="center">Instrumentlevel toewijzen</h4>
                                    <form className="addCourse" action="/" method="POST" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s12 m12 l12">
                                                    <Row>
                                                        <Input required s={12} multiple={false} type='select'
                                                               onChange={this.handleStudentChange}
                                                               label="Student" icon='person' defaultValue='1'>
                                                            <option key="" value="" disabled>Selecteer een student...
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
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s12 m12 l12">
                                                    <Row>
                                                        <Input required s={12} multiple={false} type='select'
                                                               onChange={this.handleInstrumentChange}
                                                               label="Instrumenten" icon='person' defaultValue='1'>
                                                            <option key="" value="" disabled>Selecteer een instrument...</option>
                                                            {this.state.instruments.map((instrument, index) => (
                                                                <option key={instrument.instrumentid}
                                                                        value={instrument.instrumentid}>{instrument.instrumentname}</option>
                                                            ))}
                                                        </Input>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="section">
                                                <div className="col s12 m12 l12">
                                                    <StyledTextField  type="number" min="0" max="10" onChange={this.changeLevel} label="Instrumentscore (0-10)" placeholder="Geef een score tussen 0 en 10..." required/>
                                                </div>
                                            </div>
                                        <div className="section">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField type="number" min="0" max="10" onChange={this.changeMaxLevel} label="Maxlevel (0-10)" placeholder="Geef een score tussen 0 en 10..." required/>
                                            </div>
                                        </div>
                                        <div className="section">
                                            <div className="col s12 m12 l12 center">
                                                <input type="submit" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle" value="Opslaan"/>
                                                <Link to="/instrumentlevels" type="button" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle">Terug</Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                </section>
            </div>
        );
    }


}
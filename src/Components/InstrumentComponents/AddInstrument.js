import React, {Component} from 'react';
import * as InstrumentenService from '../../Services/InstrumentService.js';
import Header from '../GeneralComponents/Header';
import StyledTextField from '../GeneralComponents/StyledTextField';
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize';
import swal from 'sweetalert2';
import './AddInstrument.css';

export default class AddInstrument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            soorten: [],
            open: false,
            typedName: "",
            typedType: "",
            typedVersion: "",
            image: "..image/image.jpg",
            bestandType: "",
        };
    }

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Instrument Added!',
            showConfirmButton: false,
            timer: 1500
        });
        InstrumentenService.postInstrument(JSON.stringify(
            {
                afbeelding: this.state.image,
                instrumentsoortid: this.state.value,
                naam: this.state.typedName,
                type: this.state.typedType,
                uitvoering: this.state.typedVersion
            }
        ));

    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    componentDidMount() {
        InstrumentenService.getInstrumentSoortenFromBackend()
            .then(console.log("----soorten---- \n"))
            .then(soorten => {
                this.setState({soorten: soorten}, console.log(soorten));
            });
    }

    onChangeType = (e) => {
        this.setState({typedType: e.target.value});
    };

    onChangeNaam = (e) => {
        this.setState({typedName: e.target.value});
    };

    onChangeVersion = (e) => {
        this.setState({typedVersion:  e.target.value});
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                image: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("successfully Uploaded");
        }, 1000);
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Add Instrument"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable">
                                <div className="card-image">
                                    <img
                                        src={"data:image;base64," + this.state.image} alt="Instrument"
                                        height="300px"/>
                                    <span className="card-title white-text">{this.state.naam}</span>
                                    <form action="#">
                                        <div className="file-field input-field">
                                            <div
                                                className="btn-floating halfway-fab waves-effect waves-light deep-orange darken-4 pulse">
                                                <i className="material-icons">attach_file</i>
                                                <input name="file"
                                                       className="upload-file"
                                                       id="file"
                                                       onChange={this.handleChangeImage}
                                                       encType="multipart/form-data" accept="image/*" type="file"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-content">
                                    <form className="addInstrument" action="/" method="POST" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Soort</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <Row>
                                                        <Input s={12} onChange={this.handleChange} type='select' label="Soort" icon='library_music' defaultValue='1'>
                                                            {this.state.soorten.map((soort, index) => (
                                                                <option key={soort.instrumentSoortId}
                                                                        value={soort.instrumentSoortId}>{soort.soortNaam}</option>
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
                                                    <h5>Naam</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeNaam} hint="Geef naam in..."
                                                                     label="Naam"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Type</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeType} hint="Geef type in..."
                                                                     label="Type"/><br />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Uitvoering</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeVersion}
                                                                     hint="Geef uitvoering in..." label="Uitvoering"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                    </form>

                                </div>
                                <div className="card-action">
                                    <Link to="/instrumenten" onClick={this.handleClick}
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

import React, {Component} from 'react';
import * as InstrumentenService from '../../Services/InstrumentService.js';
import Header from '../GeneralComponents/Header';
import StyledTextField from '../GeneralComponents/StyledTextField';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import './InstrumentDetails.css';

export default class InstrumentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instrumentId: this.props.match.params.id,
            afbeelding: "",
            instrumentsoortid: 1,
            soortnaam: "",
            naam: "",
            type: "",
            uitvoering: "",
        }
    }

    componentDidMount() {
        let self = this;
        InstrumentenService.getInstrumentFromBackend(self.state.instrumentId)
            .then(console.log("----Instrument met id " + self.state.instrumentId + "---- \n"))
            .then(instrument => {
                self.setState({
                    afbeelding: instrument.afbeelding,
                    instrumentsoortid: instrument.soort.instrumentSoortId,
                    soortnaam: instrument.soort.soortNaam,
                    naam: instrument.naam,
                    type: instrument.type,
                    uitvoering: instrument.uitvoering

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
        InstrumentenService.UpdateInstrument(self.state.instrumentId, JSON.stringify(
            {
                afbeelding: self.state.afbeelding,
                instrumentsoortid: self.state.instrumentsoortid,
                naam: self.state.naam,
                type: self.state.type,
                uitvoering: self.state.uitvoering
            }
        ));
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                afbeelding: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("successfully Uploaded");
        }, 1000);
    };

    setType = event => {
        let value = event.target.value;
        return this.setState({type: value})
    };

    render() {
        return ( <div className="Homepage">
                <Header name={this.state.naam}/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable z-depth-3">
                                <div className="card-image">
                                    <img
                                        src={"data:image;base64," + this.state.afbeelding} alt="Instrument"
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
                                    <div className="section">
                                        <div className="row">
                                        <div className="col s3 m3 l3">
                                            <h5>{this.state.type}</h5>
                                        </div>
                                        <div className="col s9 m9 l9">
                                            <input className="center" type="text" value={this.state.type} label="Type"  onChange={this.setType} placeholder="Geef een type in.."/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">

                                        <div className="col s3 m3 l3">
                                            <h5>{this.state.soortnaam}</h5>
                                        </div>
                                        <div className="col s9 m9 l9">
                                        <StyledTextField disabled={true} hint="Geef nieuwe soortnaam in..." label="Soortnaam"/>
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
                        <div className="col s0 m2 l2"/>
                    </div>
                </section>
            </div>
        );
    }
}
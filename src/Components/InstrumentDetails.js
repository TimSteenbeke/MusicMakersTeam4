/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import * as InstrumentenService from '../Services/InstrumentService.js'
import Header from './Header'
import StyledTextField from './StyledTextField'
import {Link} from 'react-router-dom';

class InstrumentDetails extends Component {

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
                console.log(self.state.naam);
                console.log(self.state.instrumentsoortid);
            }).catch((error) => {
            console.log(error);
        });
    }


    handleUpdate = () => {
        var self = this;
        InstrumentenService.UpdateInstrument(self.state.instrumentId, JSON.stringify(
            {
                afbeelding: self.state.afbeelding,
                instrumentsoortid: self.state.instrumentsoortid,
                naam: self.state.naam,
                type: self.state.type,
                uitvoering: self.state.uitvoering
            }
        ));
        console.log("instrumentId: " + self.state.instrumentId);
        console.log("instrumentsoortid: " + self.state.instrumentsoortid);
        console.log("naam: " + self.state.naam);
        console.log("type: " + self.state.type);
        console.log("uitvoering: " + self.state.uitvoering);
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
            console.log("Uploaded");
        }, 1000);
    };


    render() {
        return (<div className="Homepage">
                <Header name={this.state.naam}/>

                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable">
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
                                                <StyledTextField hint="Geef nieuw type in..." label="Type"/>
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
                                                <StyledTextField disabled={true} hint="Geef nieuwe soortnaam in..."
                                                                 label="Soortnaam"/>
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

export default InstrumentDetails;

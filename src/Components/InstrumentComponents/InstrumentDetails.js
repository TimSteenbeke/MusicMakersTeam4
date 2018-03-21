import React, {Component} from 'react';
import * as InstrumentService from '../../Services/InstrumentService.js';
import Header from '../GeneralComponents/Header';
import StyledTextField from '../GeneralComponents/StyledTextField';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import './InstrumentDetails.css';
import {Row, Input} from 'react-materialize';

export default class InstrumentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instrumentId: this.props.match.params.id,
            instrumentName: "",
            type: "",
            details: "",
            image: "",
            categoryName: "",
            instrumentCategoryId: 1,
            soorten: []
        }
    }

    componentDidMount() {
        InstrumentService.getInstrumentSoortenFromBackend()
            .then(soorten => {
                this.setState({soorten: soorten});
            });

        console.log("soorten");
        console.log(this.state.soorten);
        let self = this;
        InstrumentService.getInstrumentFromBackend(self.state.instrumentId)
            .then(instrument => {
                self.setState({
                    instrumentName: instrument.instrumentName,
                    type: instrument.type,
                    details: instrument.details,
                    image: instrument.image,
                    categoryName: instrument.instrumentCategory.categoryName,
                    instrumentCategoryId: instrument.instrumentCategory.instrumentCategoryId,
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
        InstrumentService.UpdateInstrument(self.state.instrumentId, JSON.stringify(
            {
                name: this.state.instrumentName,
                type: this.state.type,
                details: this.state.details,
                image: this.state.image,
                categoryName: this.state.categoryName,
                instrumentcategoryid: this.state.instrumentCategoryId,
            }
        ));
    };

    handleChangeImage = (evt) => {
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
        }, 1000);
    };

    setName = event => {
        let value = event.target.value;
        return this.setState({instrumentName: value})
    };

    setType = event => {
        let value = event.target.value;
        return this.setState({type: value})
    };

    setDetails = event => {
        let value = event.target.value;
        return this.setState({details: value})
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        return (
            <div className="Homepage">
                <Header name="Instrument bewerken"/>
                <section className="containerCss">
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable z-depth-3">
                                <div className="card-image">
                                    <img
                                        src={"data:image;base64," + this.state.image} alt="Instrument"
                                        height="300px"/>
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
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField value={this.state.instrumentName} defaultValue={this.state.instrumentName} onChange={this.setName} label="Naam" placeholder="Geef naam in..."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField value={this.state.type} defaultValue={this.state.type} onChange={this.setType} label="type" placeholder="Geef type in..."/>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <StyledTextField value={this.state.details} defaultValue={this.state.details} onChange={this.setDetails} label="Uitvoering" placeholder="Geef uitvoering in..."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                        <div className="col s12 m12 l12">
                                            <Row>
                                                <Input s={12} onChange={this.handleChange} type='select' label="Soort" icon='library_music'>
                                                    {this.state.soorten.map((soort, index) => (
                                                        <option key={soort.instrumentCategoryId}
                                                                value={soort.instrumentCategoryId}>{soort.categoryName}</option>
                                                    ))}
                                                </Input>
                                            </Row>
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

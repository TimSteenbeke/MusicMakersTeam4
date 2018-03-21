import React, {Component} from 'react';
import * as CompositionService from '../../Services/CompositionService.js';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import './CompositionUpdate.css';


export default class CompositionUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compositionId: this.props.match.params.id,
            title: "",
            artist: "",
            language: "",
            genre: "",
            subject: "",
            instrumentType: "",
            link: "",
            fileFormat: "",
            content: "",
        };
    }

    componentDidMount() {
        const self = this;
        CompositionService.getCompositionFromBackend(self.state.compositionId)
            .then(composition => self.setState({
                title: composition.title,
                artist: composition.artist,
                language: composition.language,
                genre: composition.genre,
                subject: composition.subject,
                instrumentType: composition.instrumentType,
                link: composition.link,
                fileFormat: composition.fileFormat,
                content: composition.content,
            }))
    }

    handleUpdate = () => {
        const self = this;
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Composition Updated!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            CompositionService.UpdateComposition(self.state.compositionId, JSON.stringify(
                {
                    content: self.state.content,
                    artist: self.state.artist,
                    language: self.state.language,
                    genre: self.state.genre,
                    subject: self.state.subject,
                    instrumentType: self.state.instrumentType,
                    link: self.state.link,
                    fileFormat: self.state.fileFormat,
                    title: self.state.title
                }
            ));
        }).then(() => {
            this.props.history.push("/compositions");
        });

    };

    setTitle = event => {
        let value = event.target.value;
        return this.setState({title: value})
    };

    setArtist = event => {
        let value = event.target.value;
        return this.setState({artist: value})
    };

    setGenre = event => {
        let value = event.target.value;
        return this.setState({genre: value})
    };

    setLanguage = event => {
        let value = event.target.value;
        return this.setState({language: value})
    };

    setSubject = event => {
        let value = event.target.value;
        return this.setState({subject: value})
    };

    setType = event => {
        let value = event.target.value;
        return this.setState({instrumentType: value})
    };

    setLink = event => {
        let value = event.target.value;
        return this.setState({link: value})
    };

    render() {
        return (<div className="Homepage">
                <Header name="Muziekstuk bewerken"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable">
                                <div className="card-content">
                                    <div className="row">
                                        <div className="col s12 m12 l12">
                                            <label>Titel</label>
                                            <input type="text" value={this.state.title} label="Titel"
                                                   onChange={this.setTitle} placeholder="Geef een titel in.."/>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Artiest</label>
                                                <input type="text" value={this.state.artist} onChange={this.setArtist}
                                                       placeholder="Geef een artiest in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Taal</label>
                                                <input type="text" value={this.state.language}
                                                       onChange={this.setLanguage} placeholder="Geef een taal in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Genre</label>
                                                <input type="text" value={this.state.genre} onChange={this.setGenre}
                                                       placeholder="Geef een genre in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Onderwerp</label>
                                                <input type="text" value={this.state.subject} onChange={this.setSubject}
                                                       placeholder="Geef een onderwerp in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Instrumenttype</label>
                                                <input type="text" value={this.state.instrumentType}
                                                       onChange={this.setType} placeholder="Geef een type in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Link</label>
                                                <input type="text" value={this.state.link} onChange={this.setLink}
                                                       placeholder="Geef een link in.."/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <Link to="/compositions" onClick={this.handleUpdate}
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
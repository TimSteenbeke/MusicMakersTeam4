import React, {Component} from 'react';
import * as CompositionService from '../../Services/CompositionService.js'
import * as LoginService from "../../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";
import Header from '../GeneralComponents/Header'
import {Link} from 'react-router-dom';
import swal from 'sweetalert2'



class CompositionUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MuziekstukId: this.props.match.params.id,
            titel: "",
            artist: "",
            language: "",
            genre: "",
            subject: "",
            instrumentType: "",
            link: "",
            fileFormat: "",
            content: "",
        }
    }

    componentDidMount() {
        const self = this;

        CompositionService.getCompositionFromBackend(self.state.MuziekstukId)
            .then(console.log("----Composition with id " + self.state.MuziekstukId + "---- \n"))
            .then(composition => self.setState({
                titel: composition.titel,
                artist: composition.artist,
                language: composition.language,
                genre: composition.genre,
                subject: composition.subject,
                instrumentType: composition.instrumentType,
                link: composition.link,
                fileFormat: composition.fileFormat,
                content: composition.content,
            }, console.log(composition)))
    }

    componentWillMount(){
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }


    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Composition Updated!',
            showConfirmButton: false,
            timer: 1500
        });
        const self = this;
        console.log("link: " + self.state.link);
        CompositionService.UpdateComposition(this.state.MuziekstukId, JSON.stringify(
            {
                content: this.state.content,
                artist: this.state.artist,
                language: this.state.language,
                genre: this.state.genre,
                subject: this.state.subject,
                instrumentType: this.state.instrumentType,
                link: this.state.link,
                fileFormat: this.state.fileFormat,
                titel: this.state.titel
            }
        ));
    };

    setTitle = event => {
        let value = event.target.value;
        return this.setState({titel: value})
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

        let redirecter = null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return (<div className="Homepage">
                {redirecter}
                <Header name={this.state.titel}/>

                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable">
                                <div className="card-image">
                                    <span className="card-title white-text">{this.state.titel}</span>
                                </div>
                                <div className="card-content">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Titel</label>
                                                <input type="text" value={this.state.titel} label="Titel"  onChange={this.setTitle} placeholder="Geef een titel in.."/>
                                            </div>
                                        </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Artiest</label>
                                                <input type="text" value={this.state.artist}  onChange={this.setArtist} placeholder="Geef een artiest in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Taal</label>
                                                <input type="text" value={this.state.language} onChange={this.setLanguage} placeholder="Geef een taal in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Genre</label>
                                                <input type="text" value={this.state.genre}  onChange={this.setGenre} placeholder="Geef een genre in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Onderwerp</label>
                                                <input type="text" value={this.state.subject}  onChange={this.setSubject} placeholder="Geef een onderwerp in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Instrumenttype</label>
                                                <input type="text" value={this.state.instrumentType}  onChange={this.setType} placeholder="Geef een type in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Link</label>
                                                <input type="text" value={this.state.link}  onChange={this.setLink} placeholder="Geef een link in.."/>
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

export default CompositionUpdate;
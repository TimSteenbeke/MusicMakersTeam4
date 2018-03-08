import React, {Component} from 'react';
import * as CompositionService from '../Services/CompositionService.js'
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";
import Header from './Header'
import StyledTextField from './StyledTextField'
import {Link} from 'react-router-dom';

class CompositionUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MuziekstukId: this.props.match.params.id,
            title: "",
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
                title: composition.title,
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
        const self = this;
        console.log("compid: " + self.state.MuziekstukId);
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
                title: this.state.title
            }
        ));
    };

    render() {
        let redirecter = null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return (<div className="Homepage">
                {redirecter}
                <Header name={this.state.title}/>

                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable">
                                <div className="card-image">
                                    <span className="card-title white-text">{this.state.title}</span>
                                </div>
                                <div className="card-content">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <input type="text"  placeholder="Geef een titel in.."/>
                                            </div>
                                        </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <input type="text" placeholder="Geef een artiest in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <input type="text" placeholder="Geef een taal in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <input type="text" placeholder="Geef een genre in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <input type="text" placeholder="Geef een onderworp in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <input type="text" placeholder="Geef een type in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <input type="text" placeholder="Geef een link in.."/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <Link to="/muziekstukken" onClick={this.handleUpdate}
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
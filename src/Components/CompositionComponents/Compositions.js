import React, {Component} from 'react';
import * as CompositionService from '../../Services/CompositionService.js';
import swal from 'sweetalert2';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import './Compositions.css';


export default class Compositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compositions: [],
            selectedIndex: 0,
            selected: [],
            openDetails: false,
            openUpdate: false,
            search: "",
        };
    }

    handleDelete = (id, e) => {
        swal({
            title: 'Ben je zeker?',
            text: "Je kan dit niet ongedaan maken!",
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Verwijderen!',
            cancelButtonText: 'Behouden!'
        }).then((result) => {
            if (result.value) {
                CompositionService.deleteComposition(id);
                swal({
                    title: "Verwijderd!",
                    text: "Muziekstuk is verwijderd!",
                    type: "success"
                }).then(() => {
                    this.props.history.push("/compositions");
                });
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swal(
                    'Gestopt',
                    'Item is behouden',
                    'error'
                )
            }
        })
    };

    componentDidMount() {
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    }

    setSearch = event => {
        this.setState({compositions: []});
        let value = event.target.value;

        this.setState({search: value});

        if (value === "" || value === null) {
            CompositionService.getCompositionsFromBackend().then(compositions => {
                this.setState({compositions: compositions});
            });
        } else {
            CompositionService.filterCompositions(value).then(compositions => {
                this.setState({compositions: compositions});
            });
        }
    };

    assignItem = (item, indx) => { // bound arrow function handler
        const sampleBytes = Compositions.base64ToArrayBuffer(item);
        this.saveByteArray([sampleBytes], this.state.compositions[indx].fileFormat);
    };

    static base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    saveByteArray = (function () {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, name) {
            const blob = new Blob(data, {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    addToPlaylist = (compositionId) => {


        swal({
            position: 'top-end',
            type: 'success',
            title: 'Muziekstuk aan je playlist toegevoegd!',
            showConfirmButton: false,
            timer: 1500
        });
        CompositionService.addCompositionToMyPlaylist(compositionId);

    };


    render() {

        return (
            <div className="Homepage">
                <Header name="Muziekstukken"/>
                <div className="section">
                    <div className="row">
                        <div className="col s12 m6 offset-m3 l6 offset-l3 center">
                            <input type="text" placeholder="Geef een zoekopdracht in..." name="filter"
                                   onChange={this.setSearch} style={{textAlign: "center"}}/>
                        </div>
                    </div>
                </div>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Titel</th>
                            <th>Artiest</th>
                            <th>Genre</th>
                            <th>Onderwerp</th>
                            <th>Instrumenttype</th>
                            <th>Bestand</th>
                            <th>Acties</th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.state.compositions.map((composition, index) => (
                            <tr key={index} id={composition.compositionId}>
                                <td>{composition.compositionId}</td>
                                <td>{composition.title}</td>
                                <td>{composition.artist}</td>
                                <td>{composition.genre}</td>
                                <td>{composition.subject}</td>
                                <td>{composition.instrumentType}</td>
                                <td>{composition.fileFormat !== null ? composition.fileFormat : "No file"}</td>
                                <td>
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <a title="Bestand downloaden" className="waves-effect white-text deep-orange darken-4 btn"
                                               onClick={e => this.assignItem(composition.content, index)}>
                                                <i className="material-icons">file_download</i>
                                            </a></div>
                                        <div className="col s6 m6 l6">
                                            <Link title="Afspelen" className="waves-effect white-text deep-orange darken-4 btn"
                                                  to={`/play/${composition.compositionId}`}>
                                                <i className="material-icons">play_arrow</i>
                                            </Link>
                                            <Link title="Aan afspeellijst toevoegen" to={`/myplaylist`} className="waves-effect white-text deep-orange darken-4 btn" onClick={ e => this.addToPlaylist(composition.compositionId)}>
                                                <i className="material-icons">format_list_bulleted</i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <Link title="Bewerken" className="waves-effect white-text deep-orange darken-4 btn"
                                                  to={`/compositions/${composition.compositionId}`}>
                                                <i className="material-icons">edit</i>
                                            </Link></div>
                                        <div className="col s6 m6 l6">
                                            <a title="Verwijderen" className="waves-effect white-text deep-orange darken-4 btn"
                                               onClick={(e) => this.handleDelete(composition.compositionId, e)}>
                                                <i className="material-icons">delete
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link title="Muziekstuk toevoegen" to="/addcomposition" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>

                </section>
            </div>
        );
    }
}
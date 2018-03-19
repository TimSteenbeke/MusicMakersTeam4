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
            search: ""
        };
    }

    handleDelete = (id, e) => {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn red',
            cancelButtonClass: 'btn green marginator',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    'Composition has been deleted.',
                    'success'
                );
                CompositionService.deleteComposition(id);
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Cancelled',
                    'Composition was not deleted',
                    'error'
                )
            }
        });
    };

    componentDidMount() {
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    }

    /*componentWillUpdate(){
        console.log("upddatte: "+ this.state.search);

        if (this.state.search === "" || this.state.search === null) {
            CompositionService.getCompositionsFromBackend().then(compositions => {
                this.setState({compositions: compositions});
            });
        } else {
            CompositionService.filterCompositions(this.state.search).then(compositions => {
                this.setState({compositions: compositions});
            });
        }
    }*/

    filterCompositions = (e) => {
        const self = this;
        this.setState({compositions: []});

        if (self.state.search === "") {
            CompositionService.getCompositionsFromBackend().then(compositions => {
                this.setState({compositions: [...this.state.compositions, compositions]});
            });
        } else {
            CompositionService.filterCompositions(self.state.search, e.target.id).then(compositions => {
                this.setState({compositions: [...this.state.compositions, compositions]});
            });
        }


    };

    setSearch = event => {
        this.setState({compositions: []});
        let value = event.target.value;

        this.setState({search: value});

        if (value === "" || value === null) {
            CompositionService.getCompositionsFromBackend().then(compositions => {
                this.setState({compositions: [...this.state.compositions,compositions]});
            });
        } else {
            CompositionService.filterCompositions(value).then(compositions => {
                this.setState({compositions: [...this.state.compositions, compositions]});
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
                            <tr key={index} id={composition.muziekstukId}>
                                <td>{composition.muziekstukId}</td>
                                <td>{composition.titel}</td>
                                <td>{composition.artist}</td>
                                <td>{composition.genre}</td>
                                <td>{composition.subject}</td>
                                <td>{composition.instrumentType}</td>
                                <td>{composition.fileFormat !== null ? composition.fileFormat : "No file"}</td>
                                <td>
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <a className="waves-effect white-text deep-orange darken-4 btn"
                                               onClick={e => this.assignItem(composition.content, index)}>
                                                <i className="material-icons">file_download</i>
                                            </a></div>
                                        <div className="col s6 m6 l6">
                                            <Link className="waves-effect white-text deep-orange darken-4 btn"
                                                  to={`/play/${composition.muziekstukId}`}>
                                                <i className="material-icons">play_arrow</i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <Link className="waves-effect white-text deep-orange darken-4 btn"
                                                  to={`/compositions/${composition.muziekstukId}`}>
                                                <i className="material-icons">edit</i>
                                            </Link></div>
                                        <div className="col s6 m6 l6">
                                            <a className="waves-effect white-text deep-orange darken-4 btn"
                                               onClick={(e) => this.handleDelete(composition.muziekstukId, e)}>
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
                        <Link to="/addcomposition" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>

                </section>
            </div>
        );
    }
}
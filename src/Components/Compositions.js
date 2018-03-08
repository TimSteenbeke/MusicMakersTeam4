/**
 * Created by michiel on 25/02/2018.
 */
import React, {Component} from 'react';
import * as CompositionService from '../Services/CompositionService.js'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CompDetails from './CompositionDetails.js';
import CompUpdate from './CompositionUpdate.js';
import Header from './Header'
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";
import {Link} from 'react-router-dom';

class Compositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compositions: [],
            selectedIndex: 0,
            selected: [],
            openDetails: false,
            openUpdate: false,
            search: "empty"
        };
    }
    componentWillMount(){
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }
    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };



    handleClose = () => {
        this.setState({openDetails: false});
    };


    handleCloseUpdate = () => {
        this.setState({openUpdate: false});
    };

    handleDelete = (id, e) => {
        CompositionService.deleteComposition(id);
        this.setState({ compositions: [] });

        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    };

    componentDidMount() {
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    }

    filterCompositions = (e) =>{
        const self = this;
        console.log(e.target.id);
        this.setState({ compositions: [] });

        if(self.state.search === ""){
            CompositionService.getCompositionsFromBackend().then(compositions => {
                this.setState({compositions: compositions});
            });
        } else {
            CompositionService.filterCompositions(self.state.search,e.target.id).then(compositions => {
                this.setState({compositions: compositions});
            });
        }


    };

    setSearch = event => {
        let value = event.target.value;
        console.log(value);
        return this.setState({search: value});
    };



    assignItem = (item,indx) => { // bound arrow function handler
        const sampleBytes = Compositions.base64ToArrayBuffer(item);
        this.saveByteArray([sampleBytes], this.state.compositions[indx].fileFormat);
    };

    static base64ToArrayBuffer(base64) {
        const binaryString =  window.atob(base64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++)        {
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
        let redirecter=null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        const actionsDetails = [
            <RaisedButton label="Close" onClick={this.handleClose} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>,
        ];

        const actionsUpdate = [
            <RaisedButton label="Close" onClick={this.handleCloseUpdate} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>,
        ];

        return (
            <div className="Homepage">
                {redirecter}

                <Header name="Muziekstukken" />

                <div className="section">
                    <div className="row">
                        <div className="col s12 m2 offset-m1 l2 offset-l1  center">
                            <input  type="text" placeholder="titel" name="titel" onChange={this.setSearch} style={{textAlign: "center"}}/>
                            <input type="button" className="btn" id="1" value="Zoeken" onClick={this.filterCompositions}/>
                        </div>
                        <div className="col s12 m2 l2 center">
                            <input  type="text" placeholder="genre" name="titel" onChange={this.setSearch} style={{textAlign: "center"}}/>
                            <input type="button" className="btn" id="2" value="Zoeken" onClick={this.filterCompositions}/>
                        </div>
                        <div className="col s12 m2 l2 center">
                            <input  type="text" placeholder="onderwerp" name="titel" onChange={this.setSearch} style={{textAlign: "center"}}/>
                            <input type="button" className="btn" id="3" value="Zoeken" onClick={this.filterCompositions}/>
                        </div>
                        <div className="col s12 m2 l2 center">
                            <input  type="text" placeholder="intstrumenttype" name="titel" onChange={this.setSearch} style={{textAlign: "center"}}/>
                            <input type="button" className="btn" id="4" value="Zoeken" onClick={this.filterCompositions}/>
                        </div>
                        <div className="col s12 m2 l2 center">
                            <input  type="text" placeholder="formaat" name="titel" onChange={this.setSearch} style={{textAlign: "center"}}/>
                            <input type="button" className="btn" id="5" value="Zoeken" onClick={this.filterCompositions}/>
                        </div>
                    </div>
                </div>
                <section className="containerCss">
                    <table className="white-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Titel</th>
                            <th>Artiest</th>
                            <th>Genre</th>
                            <th>Onderwerp</th>
                            <th>Instrumenttype</th>
                            <th>Bestand</th>
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
                                <td><a href="#" onClick={e => this.assignItem(composition.content,index)}>{composition.fileFormat != null ? composition.fileFormat : "No file"}</a></td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator" to={`/compositiondetails/${composition.muziekstukId}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn" onClick={(e) => this.handleDelete(composition.muziekstukId, e)}><i className="material-icons">delete
                                    </i></a>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </section>


                <Dialog
                    actions={actionsDetails}
                    modal={false}
                    open={this.state.openDetails}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <CompDetails
                        id={(this.state.selectedIndex)}
                    />
                </Dialog>

                <Dialog
                    actions={actionsUpdate}
                    modal={false}
                    open={this.state.openUpdate}
                    onRequestClose={this.handleCloseUpdate}
                    autoScrollBodyContent={true}
                >
                    <CompUpdate
                        id={(this.state.selectedIndex)}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Compositions;
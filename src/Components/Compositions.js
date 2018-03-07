/**
 * Created by michiel on 25/02/2018.
 */
import React, {Component} from 'react';
import * as CompositionService from '../Services/CompositionService.js'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CompDetails from './CompositionDetails.js';
import CompUpdate from './CompositionUpdate.js';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";


const styles = {
    exampleImageInput: {
        margin: 10,
    }
};

class Compositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compositions: [],
            selectedIndex: 0,
            selected: [],
            openDetails: false,
            openUpdate: false,

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

    handleOpen = () => {
        this.setState({openDetails: true});
    };

    handleClose = () => {
        this.setState({openDetails: false});
    };

    handleOpenUpdate = () => {
        this.setState({openUpdate: true});
    };

    handleCloseUpdate = () => {
        this.setState({openUpdate: false});
    };

    handleDelete = () => {
        CompositionService.deleteComposition(this.state.selectedIndex);
    };

    componentWillUpdate(){
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    }

    componentDidMount() {
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    }

    handleCellClick = (rowNumber) => {
        const self = this;

        this.setState({
            selectedIndex: this.state.compositions[rowNumber].muziekstukId
        });

        setTimeout(function () {
            console.log(console.log("Selected Row: " + self.state.selectedIndex));
        }, 1000);
    };

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

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
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Muziekstukken</h1>
                        <Table onRowSelection={this.handleRowSelection} onCellClick={this.handleCellClick}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Titel</TableHeaderColumn>
                                    <TableHeaderColumn>Artiest</TableHeaderColumn>
                                    <TableHeaderColumn>Taal</TableHeaderColumn>
                                    <TableHeaderColumn>Genre</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.compositions.map((composition, index) => (
                                    <TableRow selected={this.isSelected(index)} key={composition.muziekstukId}>
                                        <TableRowColumn>{composition.titel}</TableRowColumn>
                                        <TableRowColumn>{composition.artist}</TableRowColumn>
                                        <TableRowColumn> {composition.language}</TableRowColumn>
                                        <TableRowColumn>{composition.genre}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton style={styles.exampleImageInput} label="Details" onClick={this.handleOpen} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                        <RaisedButton label="Delete"  style={styles.exampleImageInput}  onClick={this.handleDelete} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                        <RaisedButton label="Update"  style={styles.exampleImageInput}  onClick={this.handleOpenUpdate} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                    </div>
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
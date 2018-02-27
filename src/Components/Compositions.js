/**
 * Created by michiel on 25/02/2018.
 */
import React, {Component} from 'react';
import * as CompositionService from '../Services/CompositionService.js'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import MuziekstukDetails from "./MuziekstukDetails";


export default class Compositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compositions: [],
            selectedIndex: 0,
            open: false,
            visible: "hidden"
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    }

    handleCellClick = (rowNumber) => {
        this.setState({
            selectedIndex: this.state.compositions[rowNumber].muziekstukId
        });
        console.log("Selected Row: " + this.state.selectedIndex);
        this.handleOpen();
    };

    render() {
        const actions = [
            <RaisedButton label="Okay" onClick={this.handleClose} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>
        ];

        return (
            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Muziekstukken</h1>
                        <Table onCellClick={this.handleCellClick} selectable={false}>
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
                                    <TableRow key={composition.muziekstukId}>
                                        <TableRowColumn>{composition.titel}</TableRowColumn>
                                        <TableRowColumn>{composition.artist}</TableRowColumn>
                                        <TableRowColumn> {composition.language}</TableRowColumn>
                                        <TableRowColumn>{composition.genre}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <MuziekstukDetails
                        id={(this.state.selectedIndex)}
                    />
                </Dialog>
            </div>
        );
    }
}



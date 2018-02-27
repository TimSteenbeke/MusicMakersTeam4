/**
 * Created by jariv on 9/02/2018.
 */
import React, {Component} from 'react';
import * as InstrumentenService from '../Services/InstrumentService.js'
import InstrumentDetails from './InstrumentDetails.js'
import InstrumentUpdate from './InstrumentUpdate.js'

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

const styles = {
    exampleImageInput: {
        margin: 10,
    }
}

class Instrumenten extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrumenten: [],
            selectedIndex: 0,
            openDetails: false,
            openUpdate: false,
            selected: [],
        };
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
        InstrumentenService.deleteInstrument(this.state.selectedIndex);
    };


    componentWillUpdate(){
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }


    componentDidMount() {
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }


    handleCellClick = (rowNumber) => {
        var self = this;

        this.setState({
            selectedIndex: this.state.instrumenten[rowNumber].instrumentId
        });

        setTimeout(function () {
            console.log(console.log("Selected Row: " + self.state.selectedIndex));
        }, 1000);

    };

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };



    render() {
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
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Instrumenten</h1>
                        <Table onRowSelection={this.handleRowSelection} onCellClick={this.handleCellClick}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Id</TableHeaderColumn>
                                    <TableHeaderColumn>Naam</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Uitvoering</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.instrumenten.map((instrument, index) => (
                                    <TableRow selected={this.isSelected(index)} key={instrument.instrumentId}>
                                        <TableRowColumn>{instrument.instrumentId}</TableRowColumn>
                                        <TableRowColumn>{instrument.naam}</TableRowColumn>
                                        <TableRowColumn>{instrument.type}</TableRowColumn>
                                        <TableRowColumn> {instrument.uitvoering}</TableRowColumn>
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
                    <InstrumentDetails
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
                    <InstrumentUpdate
                        id={(this.state.selectedIndex)}
                    />
                </Dialog>

            </div>
        );
    }
}

export default Instrumenten;


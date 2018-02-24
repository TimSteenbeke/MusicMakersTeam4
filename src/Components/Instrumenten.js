/**
 * Created by jariv on 9/02/2018.
 */
import React, {Component} from 'react';
import * as InstrumentenService from '../Services/InstrumentService.js'
import InstrumentDetails from './InstrumentDetails.js'
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
            open: false,
            selected: [],
        };
    }

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleDelete = () => {
        InstrumentenService.deleteInstrument(this.state.selectedIndex)
    };

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
        const actions = [
            <RaisedButton label="Close" onClick={this.handleClose} backgroundColor="#DD2C00"
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
                                    <TableHeaderColumn>Naam</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Uitvoering</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.instrumenten.map((instrument, index) => (
                                    <TableRow selected={this.isSelected(index)} key={instrument.instrumentId}>
                                        <TableRowColumn>{instrument.naam}</TableRowColumn>
                                        <TableRowColumn>{instrument.type}</TableRowColumn>
                                        <TableRowColumn> {instrument.uitvoering}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton style={styles.exampleImageInput} label="Details" onClick={this.handleOpen} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                        <RaisedButton label="Delete" onClick={this.handleDelete} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                    </div>
                </section>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <InstrumentDetails
                        id={(this.state.selectedIndex)}
                    />
                </Dialog>

            </div>
        );
    }
}

export default Instrumenten;


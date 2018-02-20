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

class Instrumenten extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrumenten: [],
            selectedIndex: {},
            open: false,
        }

        ;
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }

    handleRowSelection = (selectedRow) => {
        this.setState({
            selectedIndex: selectedRow,
    });
        console.log(selectedRow);
        this.handleOpen()
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
                        <h1 className="header">Instrumenten</h1>
                        <Table onRowSelection={this.handleRowSelection} selectable={true}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Naam</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Uitvoering</TableHeaderColumn>
                                    <TableHeaderColumn>Afbeelding</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.instrumenten.map((instrument, index) => (
                                <TableRow key={instrument.instrumentId}>
                                    <TableRowColumn>{instrument.naam}</TableRowColumn>
                                    <TableRowColumn>{instrument.type}</TableRowColumn>
                                    <TableRowColumn> {instrument.uitvoering}</TableRowColumn>
                                    <TableRowColumn>{instrument.afbeelding}</TableRowColumn>
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
                    <InstrumentDetails
                        id={(this.state.selectedIndex[0] +1)}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Instrumenten;


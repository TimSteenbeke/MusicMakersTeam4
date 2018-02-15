/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import * as InstrumentenService from '../Services/InstrumentService.js'
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
            instrumenten: []
        };
    }

    componentDidMount() {
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }

    render() {
        return (
            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Instrumenten</h1>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Naam</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Uitvoering</TableHeaderColumn>
                                    <TableHeaderColumn>Afbeelding</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.instrumenten.map((instrument, i) => (
                                <TableRow key={i}>
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
            </div>
        );
    }
}

export default Instrumenten;


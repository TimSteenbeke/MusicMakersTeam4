import React, {Component} from 'react';
<<<<<<< HEAD:src/Components/InstrumentComponents/Instrumenten.js
import * as InstrumentenService from '../../Services/InstrumentService.js'
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

=======
import * as InstrumentenService from '../Services/InstrumentService.js'
import {Link} from 'react-router-dom';
import Header from './Header'
>>>>>>> master:src/Components/Instrumenten.js
class Instrumenten extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instrumenten: [],
            selectedIndex: 0,
            selected: [],
        };
    }

    handleDelete = (id, e) => {
        InstrumentenService.deleteInstrument(id);
    };


    componentWillUpdate() {
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }


    componentDidMount() {
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }

<<<<<<< HEAD:src/Components/InstrumentComponents/Instrumenten.js
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

=======
>>>>>>> master:src/Components/Instrumenten.js

    render() {

        return (
            <div className="Homepage">
<<<<<<< HEAD:src/Components/InstrumentComponents/Instrumenten.js
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
                        <RaisedButton style={styles.exampleImageInput} label="Details" onClick={this.handleOpen}
                                      backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                        <RaisedButton label="Delete" style={styles.exampleImageInput} onClick={this.handleDelete}
                                      backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                        <RaisedButton label="Update" style={styles.exampleImageInput} onClick={this.handleOpenUpdate}
                                      backgroundColor="#DD2C00"
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
=======
                <Header name="Instrumenten" />

                <section className="containerCss">
                    <table className="white-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Naam</th>
                            <th>Type</th>
                            <th>Uitvoering</th>
                            <th>Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.instrumenten.map((instrument, index) => (
                            <tr key={index} id={instrument.instrumentId}>
                                <td>{instrument.instrumentId}</td>
                                <td>{instrument.naam}</td>
                                <td>{instrument.type}</td>
                                <td>{instrument.uitvoering}</td>
                                <td>
                                    <Link className="waves-effect white-text red darken-4 btn marginator" to={`/instrumentdetails/${instrument.instrumentId}` }>
                                        <i className="material-icons">edit
                                    </i>
                                    </Link>
                                    <a className="waves-effect white-text red darken-4 btn" onClick={(e) => this.handleDelete(instrument.instrumentId, e)}><i className="material-icons">delete
                                    </i></a>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
>>>>>>> master:src/Components/Instrumenten.js

                </section>
            </div>
        );
    }
}

export default Instrumenten;


/**
 * Created by jariv on 9/02/2018.
 */
import React, {Component} from 'react';
import * as InstrumentenService from '../Services/InstrumentService.js'
import {Link} from 'react-router-dom';
import Header from './Header'
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


    render() {

        return (
            <div className="Homepage">
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

                </section>
            </div>
        );
    }
}

export default Instrumenten;


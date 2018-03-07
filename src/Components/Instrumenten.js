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
        };
    }

    handleDelete = (id, e) => {
        InstrumentenService.deleteInstrument(id);
    };

    getInstrumenten() {
        InstrumentenService.getInstrumentenFromBackend().then(instrumenten => {
            this.setState({instrumenten: instrumenten});
        });
    }


    componentWillUpdate() {
        this.getInstrumenten();
    }


    componentDidMount() {
       this.getInstrumenten();
    }


    render() {

        return (
            <div className="Homepage">
                <Header name="Instrumenten" />

                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
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
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator" to={`/instrumentdetails/${instrument.instrumentId}` }>
                                        <i className="material-icons">edit
                                    </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn" onClick={(e) => this.handleDelete(instrument.instrumentId, e)}><i className="material-icons">delete
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


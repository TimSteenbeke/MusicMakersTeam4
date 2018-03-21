import React, {Component} from 'react';
import * as InstrumentService from '../../Services/InstrumentService.js';
import Header from '../GeneralComponents/Header';

export default class InstrumentLevels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instrumentlevels: [],
            selectedIndex: 0,
        };
    }

    componentWillReceiveProps() {
        this.getInstrumentLevels();
    }

    getInstrumentLevels() {
        InstrumentService.getMyInstrumentenLevelsFromBackend().then(levels => {
            this.setState({instrumentlevels: levels});
        });
    }

    componentDidMount() {
        this.getInstrumentLevels();
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Mijn instrumenten"/>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Niveau</th>
                            <th>Maximum niveau</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.instrumentlevels.map((level, index) => (
                            <tr key={index} id={level.instrumentLevelId}>
                                <td>{level.instrument.instrumentName}</td>
                                <td>{level.level}</td>
                                <td>{level.maxLevel}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </div>

        );
    }
}


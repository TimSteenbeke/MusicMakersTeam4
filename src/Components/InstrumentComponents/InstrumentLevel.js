import React, {Component} from 'react';
import * as InstrumentService from '../../Services/InstrumentService.js';
import Header from '../GeneralComponents/Header';
import './InstrumentLevel.css';

export default class InstrumentLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: [],
            selectedIndex: 0,
        };
    }

    getLevels() {
        InstrumentService.getLevelsFromBackend().then(levels => {
            this.setState({levels: levels});
        });
    }


    componentDidMount() {
        this.getLevels();

    }

    render() {

        return (
            <div className="Homepage">
                <Header name="InstrumentLevel"/>
            </div>
        )
    }
}

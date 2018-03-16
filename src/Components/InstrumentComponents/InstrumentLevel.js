import React, {Component} from 'react';
import * as InstrumentenService from '../../Services/InstrumentService.js';
import Header from '../GeneralComponents/Header';


class InstrumentLevel extends Component {
    constructor(props) {
        super(props);
        console.log("Constructed");
        this.state = {
            levels: [],
            selectedIndex: 0,
        };
    }

    getLevels() {
        InstrumentenService.getLevelsFromBackend().then(levels => {
            this.setState({levels: levels});
        });
        {{console.log(this.state.levels)}}
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
export default InstrumentLevel;

import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div className="container">
            <div className="whiteBox">
                <h1>Home page header</h1>
                <p>Test paragraphe</p>
            </div>

        </div>);
    }
}
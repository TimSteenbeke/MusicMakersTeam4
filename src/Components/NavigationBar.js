import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';


export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (<div>
            <ul className="navigation">
                <li><a href="/">Home</a></li>
                <li><a href="/instrumenten">instrumenten</a></li>
                <li><a href="/notifications">notifications</a></li>
            </ul>
        </div>);
    }
}
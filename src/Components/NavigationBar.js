import React, {Component} from 'react';
import '../../CSS/Notification.css';
import Instrumenten from "./InstrumentComponents/Instrumenten";
import AddInstrument from "./InstrumentComponents/AddInstrument";
import InstrumentDetails from "./InstrumentComponents/InstrumentDetails";
import NotificationScreen from "./NotificationComponents/NotificationScreen";
import Login from "./Login";



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
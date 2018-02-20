import React, {Component} from 'react';
import Home from './Components/Home';
import Login from './Components/Login.js';
import AddInstrument from './Components/AddInstrument.js';
import InstrumentDetails from './Components/InstrumentDetails';
import Instrumenten from './Components/Instrumenten.js';
import Agenda from './Components/Agenda.js'
import {Route} from 'react-router'
import './CSS/GlobalStylesheet.css';
import Group from "./Components/Group";
import AddGroup from "./Components/AddGroup"
import EditGroup from "./Components/EditGroup";


class App extends Component {

    render() {
        return (
                <div>
                    <Route path="/" component={Home}/>
                    <Route exact path="/Login" component={Login}/>
                    <Route path="/addinstrument" component={AddInstrument}/>
                    <Route path="/instrumenten" component={Instrumenten}/>
                    <Route path="/instrumentdetails/:id" component={InstrumentDetails}/>
                    <Route path="/agenda" component={Agenda}/>
                    <Route path="/groups" component={Group}/>
                    <Route path="/addgroup" component={AddGroup}/>
                    <Route path="/editGroup" component={EditGroup}/>
                </div>
        );
    }
}

export default App;

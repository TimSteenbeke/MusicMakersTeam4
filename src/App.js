import React, {Component} from 'react';
import Login from './Components/Login.js';
import AddInstrument from './Components/AddInstrument.js';
import InstrumentDetails from './Components/InstrumentDetails';
import Instrumenten from './Components/Instrumenten.js';
import Agenda from './Components/Agenda.js'
import {Route} from 'react-router'
import './CSS/GlobalStylesheet.css';



class App extends Component {


    render() {
        return (
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route path="/addinstrument" component={AddInstrument}/>
                    <Route path="/instrumenten" component={Instrumenten}/>
                    <Route path="/instrumentdetails/:id" component={InstrumentDetails}/>
                    <Route path="/agenda" component={Agenda}/>
                </div>
        );
    }
}

export default App;

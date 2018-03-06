import React, {Component} from 'react';
import Home from './Components/Home';
import Login from './Components/Login.js';
import AddInstrument from './Components/AddInstrument.js';
import InstrumentDetails from './Components/InstrumentDetails';
import Instrumenten from './Components/Instrumenten.js';
import AddCourse from './Components/AddCourse.js'
import Courses from './Components/Courses.js'
import Agenda from './Components/Agenda.js'
import {Route} from 'react-router'
import './CSS/GlobalStylesheet.css';
import Compositions from "./Components/Compositions.js";
import CompositionDetails from "./Components/CompositionDetails.js";
import AddMuziekstuk from "./Components/AddMuziekstuk";



class App extends Component {


    render() {
        return (
            <div>
                <Route name="home" exact path="/" component={Home}/>
                <Route name="login" path="/login" component={Login}/>
                <Route name="addInstrument" path="/addinstrument" component={AddInstrument}/>
                <Route name="instrument" path="/instrumenten" component={Instrumenten}/>
                <Route name="instrumentDetails" path="/instrumentdetails/:id" component={InstrumentDetails}/>
                <Route name="agenda" path="/agenda" component={Agenda}/>
                <Route name="courses" path="/courses" component={Courses}/>
                <Route name="addCourse" path="/addcourse" component={AddCourse} />
                    <Route name="login" path="/login" component={Login}/>
                    <Route name="addInstrument" path="/addinstrument" component={AddInstrument}/>
                    <Route name="instrument" path="/instrumenten" component={Instrumenten}/>
                    <Route name="instrumentDetails" path="/instrumentdetails/:id" component={InstrumentDetails}/>
                    <Route name="agenda" path="/agenda" component={Agenda}/>
                    <Route name="muziekStukken" path = "/muziekstukken" component={Compositions}/>
                    <Route name="muziekstukDetails" path="/muziekstukdetails/:id" component = {CompositionDetails}/>
                    <Route name="addMuziekstuk" path="/addmuziekstuk" component={AddMuziekstuk}/>
            </div>
        );
    }
}

export default App;

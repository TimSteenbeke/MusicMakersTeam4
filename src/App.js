import React, {Component} from 'react';
import Home from './Components/Home';
import Login from './Components/Login.js';
import AddInstrument from './Components/InstrumentComponents/AddInstrument.js';
import InstrumentDetails from './Components/InstrumentComponents/InstrumentDetails';
import Instrumenten from './Components/InstrumentComponents/Instrumenten.js';
import AddCourse from './Components/CourseComponents/AddCourse.js'
import Courses from './Components/CourseComponents/Courses.js'
import Agenda from './Components/Agenda.js'
import {Route} from 'react-router'
import './CSS/GlobalStylesheet.css';
import Group from "./Components/GroupComponents/Group";
import AddGroup from "./Components/GroupComponents/AddGroup"
import EditGroup from "./Components/GroupComponents/EditGroup";
import Compositions from "./Components/CompositionComponents/Compositions.js";
import MuziekstukDetails from "./Components/MuziekstukDetails/MuziekstukDetails.js";
import AddMuziekstuk from "./Components/MuziekstukDetails/AddMuziekstuk";


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
                <Route name="addCourse" path="/addcourse" component={AddCourse}/>
                <Route name="login" path="/login" component={Login}/>
                <Route name="addInstrument" path="/addinstrument" component={AddInstrument}/>
                <Route name="instrument" path="/instrumenten" component={Instrumenten}/>
                <Route name="instrumentDetails" path="/instrumentdetails/:id" component={InstrumentDetails}/>
                <Route name="agenda" path="/agenda" component={Agenda}/>
                <Route name="muziekStukken" path="/muziekstukken" component={Compositions}/>
                <Route name="muziekstukDetails" path="/muziekstukdetails/:id" component={MuziekstukDetails}/>
                <Route name="addMuziekstuk" path="/addmuziekstuk" component={AddMuziekstuk}/>
                <Route path="/groups" component={Group}/>
                <Route path="/addgroup" component={AddGroup}/>
                <Route path="/editGroup" component={EditGroup}/>
            </div>
        );
    }
}

export default App;

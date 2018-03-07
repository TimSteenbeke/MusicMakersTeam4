import React, {Component} from 'react';
import Home from './Components/Home';
import Login from './Components/Login.js';
import AddInstrument from './Components/AddInstrument.js';
import Instrumenten from './Components/Instrumenten.js';
import InstrumentDetails from './Components/InstrumentDetails.js';
import CourseDetails from './Components/CoursesDetails.js';
import AddCourse from './Components/AddCourse.js'
import Courses from './Components/Courses.js'
import Agenda from './Components/Agenda.js'
import {Route} from 'react-router'
import './CSS/GlobalStylesheet.css';
import Group from "./Components/Group";
import AddGroup from "./Components/AddGroup"
import EditGroup from "./Components/EditGroup";
import Compositions from "./Components/Compositions.js";
// import MuziekstukDetails from "./Components/MuziekstukDetails.js";
import AddMuziekstuk from "./Components/AddMuziekstuk";
import PlayMusic from './Components/PlayMusic.js'


class App extends Component {


    render() {
        return (
            <section>
                <Route name="home" exact path="/" component={Home}/>
                <Route name="login" path="/login" component={Login}/>
                <Route name="addInstrument" path="/addinstrument" component={AddInstrument}/>
                <Route name="instrument" path="/instrumenten" component={Instrumenten}/>
                <Route name="instrumentDetails" path="/instrumentdetails/:id" component={InstrumentDetails}/>
                <Route name="instrumentDetails" path="/coursedetails/:id" component={CourseDetails}/>
                <Route name="agenda" path="/agenda" component={Agenda}/>
                <Route name="courses" path="/courses" component={Courses}/>
                <Route name="addCourse" path="/addcourse" component={AddCourse}/>
                <Route name="muziekStukken" path="/muziekstukken" component={Compositions}/>
                {/*<Route name="muziekstukDetails" path="/muziekstukdetails/:id" component={MuziekstukDetails}/>*/}
                <Route name="addMuziekstuk" path="/addmuziekstuk" component={AddMuziekstuk}/>
                <Route name="groups" path="/groups" component={Group}/>
                <Route name="addGroup" path="/addgroup" component={AddGroup}/>
                <Route name="editGroup" path="/editGroup" component={EditGroup}/>
                <Route name="playPartituur" path="/playpartituur" component={PlayMusic}/>
            </section>


            
        );
    }
}

export default App;

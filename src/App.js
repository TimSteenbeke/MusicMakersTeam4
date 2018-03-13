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
import {Route, Switch} from 'react-router'
import './CSS/GlobalStylesheet.css';
import Group from "./Components/Group";
import AddGroup from "./Components/AddGroup"
import EditGroup from "./Components/EditGroup";
import Compositions from "./Components/Compositions.js";
import AddComposition from "./Components/AddComposition";
import PlayMusic from './Components/PlayMusic.js';
import NoMatch from './Components/NoMatch.js';
import CompositionDetails from "./Components/CompositionDetails";
import CompositionUpdate from "./Components/CompositionUpdate";
import {BaseComponent} from "./Components/CheckTokenComponent";

class App extends Component {


    render() {
        return (
            <Switch>
                <Route name="home" exact path="/" component={Home}/>
                <Route name="login" path="/login" component={Login}/>
                <Route name="addInstrument" path="/addinstrument" component={AddInstrument}/>
                <Route name="instrument" path="/instrumenten" component={Instrumenten}/>
                <Route name="instrumentDetails" path="/instrumentdetails/:id" component={InstrumentDetails}/>
                <Route name="instrumentDetails" path="/coursedetails/:id" component={CourseDetails}/>
                <Route name="agenda" path="/agenda" component={check(Agenda)}/>
                <Route name="courses" path="/courses" component={Courses}/>
                <Route name="addCourse" path="/addcourse" component={AddCourse}/>
                <Route name="compositions" exact path="/compositions" component={Compositions}/>
                <Route name="addComposition" path="/addcomposition" component={AddComposition}/>
                <Route name="compositionDetails" path="/compositions/:id" component={CompositionUpdate}/>
                <Route name="groups" path="/groups" component={Group}/>
                <Route name="addGroup" path="/addgroup" component={AddGroup}/>
                <Route name="editGroup" path="/editGroup" component={EditGroup}/>
                <Route name="playPartituur" path="/playpartituur" component={PlayMusic}/>
                <Route name="play" path="/play/:id" component={PlayMusic}/>
                <Route component={NoMatch}/>
                <Route component={NoMatch} path="/404"/>
            </Switch>

        );
    }
}

function check(){
    return BaseComponent();
}

export default App;

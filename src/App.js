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
import GroupUpdate from "./Components/GroupUpdate";
import Compositions from "./Components/Compositions.js";
import AddComposition from "./Components/AddComposition";
import PlayMusic from './Components/PlayMusic.js';
import NotFound from "./Components/NotFound";
import CompositionUpdate from "./Components/CompositionUpdate";
import ChatComponent from "./Components/ChatComponents/ChatComponent";
import auth from './Components/CheckTokenComponent';
import AddCourseType from "./Components/AddCourseType";
import CourseTypeDetails from "./Components/CourseTypeDetails";
import CourseTypes from "./Components/CourseTypes";
import AddUser from "./Components/AddUser";
import UserDetails from "./Components/UserUpdate";
import Users from "./Components/Users";
import MyGroup from "./Components/MyGroups";
import MyGroupDetails from "./Components/MyGroupDetails";
import MyCourses from "./Components/MyCourses";
import MyCourseDetails from "./Components/MyCourseDetails";

class App extends Component {


    render() {
        return (
            <Switch>
                <Route name="home" exact path="/" component={auth(Home)}/>
                <Route name="login" path="/login" component={Login}/>

                <Route name="addInstrument" path="/addinstrument" component={auth(AddInstrument)}/>
                <Route name="instrument" path="/instrumenten" component={auth(Instrumenten)}/>
                <Route name="instrumentDetails" path="/instrumentdetails/:id" component={auth(InstrumentDetails)}/>

                <Route name="courseDetails" path="/coursedetails/:id" component={auth(CourseDetails)}/>
                <Route name="courses" path="/courses" component={auth(Courses)}/>
                <Route name="addCourse" path="/addcourse" component={auth(AddCourse)}/>

                <Route name="agenda" path="/agenda" component={auth(Agenda)}/>

                <Route name="compositions" exact path="/compositions" component={auth(Compositions)}/>
                <Route name="addComposition" path="/addcomposition" component={auth(AddComposition)}/>
                <Route name="compositionDetails" path="/compositions/:id" component={auth(CompositionUpdate)}/>

                <Route name="groups" path="/groups" component={auth(Group)}/>
                <Route name="addGroup" path="/addgroup" component={AddGroup}/>
                <Route name="groupUpdate" path="/groupupdate/:id" component={GroupUpdate}/>

                <Route name="myGroups" path="/mygroups" component={auth(MyGroup)}/>
                <Route name="myGroupDetails" path="/mygroupdetails/:id" component={auth(MyGroupDetails)}/>

                <Route name="myCourses" path="/mycourses" component={auth(MyCourses)}/>
                <Route name="myCourseDetails" path="/mycoursedetails/:id" component={auth(MyCourseDetails)}/>

                <Route name="play" path="/play/:id" component={auth(PlayMusic)}/>

                <Route name="addCourseTypes" path="/addcoursetype" component={auth(AddCourseType)}/>
                <Route name="courseTypes" path="/coursetypes" component={auth(CourseTypes)}/>
                <Route name="courseTypeDetails" path="/coursetypedetails/:id" component={auth(CourseTypeDetails)}/>

                <Route name="chat" path="/chat" component={auth(ChatComponent)}/>


                <Route name="users" path="/users" component={auth(Users)}/>
                <Route name="addUser" path="/addUser" component={auth(AddUser)}/>
                <Route name="userDetails" path="/userdetails/:id" component={auth(UserDetails)}/>
                <Route path='*' exact={true} component={NotFound}/>
            </Switch>
        );
    }
}

export default App;

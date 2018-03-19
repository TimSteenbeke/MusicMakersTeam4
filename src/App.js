import React, {Component} from 'react';
import {Route, Switch} from 'react-router'
import './CSS/GlobalStylesheet.css';
import auth from './Components/GeneralComponents/CheckTokenComponent';
import AddComposition from "./Components/CompositionComponents/AddComposition";
import AddCourse from './Components/CourseComponents/AddCourse.js'
import AddCourseType from "./Components/CourseComponents/AddCourseType";
import AddGroup from "./Components/GroupComponents/AddGroup"
import AddInstrument from './Components/InstrumentComponents/AddInstrument.js';
import AddNewsItem from "./Components/NewsItemComponents/AddNewsItem";
import AddUser from "./Components/UserComponents/AddUser";
import Agenda from './Components/Agenda.js'
import ChatComponent from "./Components/ChatComponent";
import Compositions from "./Components/CompositionComponents/Compositions.js";
import CompositionUpdate from "./Components/CompositionComponents/CompositionUpdate";
import CourseDetails from './Components/CourseComponents/CoursesDetails.js';
import Courses from './Components/CourseComponents/Courses.js'
import CourseTypeDetails from "./Components/CourseComponents/CourseTypeDetails";
import CourseTypes from "./Components/CourseComponents/CourseTypes";
import Group from "./Components/GroupComponents/Group";
import GroupUpdate from "./Components/GroupComponents/GroupUpdate";
import Home from './Components/Home';
import InstrumentDetails from './Components/InstrumentComponents/InstrumentDetails.js';
import Instruments from './Components/InstrumentComponents/Instruments.js';
import Login from "./Components/Login";
import MyCourseDetails from "./Components/CourseComponents/MyCourseDetails";
import MyCourses from "./Components/CourseComponents/MyCourses";
import MyGroup from "./Components/GroupComponents/MyGroups";
import MyGroupDetails from "./Components/GroupComponents/MyGroupDetails";
import NewsItems from "./Components/NewsItemComponents/NewsItems";
import NotFound from "./Components/GeneralComponents/NotFound";
import PlayMusic from './Components/MusicComponents/PlayMusic.js';
import UpdateNewsItem from "./Components/NewsItemComponents/UpdateNewsItem";
import UserDetails from "./Components/UserComponents/UserUpdate";
import Users from "./Components/UserComponents/Users";

export default class App extends Component {


    render() {
        return (
            <Switch>
                <Route name="home" exact path="/" component={auth(Home)}/>
                <Route name="login" path="/login" component={Login}/>

                <Route name="addInstrument" path="/addinstrument" component={auth(AddInstrument)}/>
                <Route name="instrument" path="/instrumenten" component={auth(Instruments)}/>
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

                <Route name="chat" path="/chat" component={auth(ChatComponent)}/>

                <Route name="newsitems" path="/newsitems" component={auth(NewsItems)}/>
                <Route name="addNewsItem" path="/addNewsItem" component={auth(AddNewsItem)}/>
                <Route name="updatenNewsItem" path="/updatenewsitem/:id" component={auth(UpdateNewsItem)}/>

                <Route path='*' exact={true} component={NotFound}/>
            </Switch>
        );
    }
}

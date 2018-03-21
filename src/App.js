import React, {Component} from 'react';
import Home from './Components/Home';
import AddInstrument from './Components/InstrumentComponents/AddInstrument.js';
import Instrumenten from './Components/InstrumentComponents/Instruments.js';
import InstrumentDetails from './Components/InstrumentComponents/InstrumentDetails.js';
import CourseDetails from './Components/CourseComponents/CourseDetails.js';
import AddCourse from './Components/CourseComponents/AddCourse.js'
import Courses from './Components/CourseComponents/Courses.js'
import Agenda from './Components/Agenda.js'
import {Route, Switch} from 'react-router'
import './CSS/GlobalStylesheet.css';
import Group from "./Components/GroupComponents/Groups";
import AddGroup from "./Components/GroupComponents/AddGroup"
import GroupUpdate from "./Components/GroupComponents/GroupUpdate";
import Compositions from "./Components/CompositionComponents/Compositions.js";
import AddComposition from "./Components/CompositionComponents/AddComposition";
import PlayMusic from './Components/MusicComponents/PlayMusic.js';
import NotFound from "./Components/GeneralComponents/NotFound";
import CompositionUpdate from "./Components/CompositionComponents/CompositionUpdate";
import auth from './Components/GeneralComponents/CheckTokenComponent';
import AddCourseType from "./Components/CourseComponents/AddCourseType";
import CourseTypeDetails from "./Components/CourseComponents/CourseTypeDetails";
import CourseTypes from "./Components/CourseComponents/CourseTypes";
import AddUser from "./Components/UserComponents/AddUser";
import UserDetails from "./Components/UserComponents/UserUpdate";
import Users from "./Components/UserComponents/Users";
import MyGroup from "./Components/GroupComponents/MyGroups";
import MyGroupDetails from "./Components/GroupComponents/MyGroupDetails";
import MyCourses from "./Components/CourseComponents/MyCourses";
import MyCourseDetails from "./Components/CourseComponents/MyCourseDetails";
import ChatComponent from "./Components/ChatComponent";
import NewsItems from "./Components/NewsItemComponents/NewsItems";
import AddNewsItem from "./Components/NewsItemComponents/AddNewsItem";
import UpdateNewsItem from "./Components/NewsItemComponents/UpdateNewsItem";
import AddLesson from './Components/CourseComponents/AddLesson.js'
import MyPlayList from './Components/PlaylistComponents/MyPlaylist';

export default class App extends Component {


    render() {
        return (
            <Switch>
                <Route name="home" exact path="/" component={Home}/>
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

                    <Route name="myPlaylist" path="/myplaylist" component={auth(MyPlayList)}/>



                    <Route name="play" path="/play/:id" component={auth(PlayMusic)}/>

                <Route name="addCourseTypes" path="/addcoursetype" component={auth(AddCourseType)}/>
                <Route name="courseTypes" path="/coursetypes" component={auth(CourseTypes)}/>
                <Route name="courseTypeDetails" path="/coursetypedetails/:id" component={auth(CourseTypeDetails)}/>
                <Route name="addLesson" path="/addLesson" component={auth(AddLesson)}  />

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

/**
 * Created by jariv on 14/02/2018.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ContentLink from 'material-ui/svg-icons/content/add';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Agenda from 'material-ui/svg-icons/action/view-agenda';
import Home from 'material-ui/svg-icons/action/home';
import Divider from 'material-ui/Divider';


class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                    <Menu>
                        <Link to="/">
                            <MenuItem primaryText="Home" leftIcon={<Home/>}/>
                        </Link>
                        <Divider/>
                        <Link to="/agenda">
                            <MenuItem primaryText="Agenda" leftIcon={<Agenda/>}/>
                        </Link>
                        <Divider/>
                        <Link to="/instrumenten">
                            <MenuItem primaryText="Instrumenten" leftIcon={<Dashboard/>}/>
                        </Link>
                        <Divider/>
                        <Link to="/addInstrument">
                            <MenuItem primaryText="Add Instrument" leftIcon={<ContentLink/>}/>
                        </Link>
                        <Divider/>
                        <Link to="/courses">
                            <MenuItem primaryText="Courses" leftIcon={<Dashboard/>}/>
                        </Link>
                        <Divider/>
                        <Link to="/addCourse">
                            <MenuItem primaryText="Add course" leftIcon={<ContentLink/>}/>
                        </Link>
                        <Divider/>
                    </Menu>
            </div>
        );
    }
}

export default Sidebar;

/**
 * Created by jariv on 14/02/2018.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ContentLink from 'material-ui/svg-icons/content/add';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Agenda from 'material-ui/svg-icons/action/view-agenda';
import Home from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});


    render() {
        return (
            <div>
                <AppBar
                    title="Music Makers"
                    onLeftIconButtonClick={this.handleToggle}
                    style={{backgroundColor: '#000000', position: 'fixed'}}
                    iconElementRight={
                        <IconButton tooltip="Notifications">
                            <NotificationsIcon />
                        </IconButton>
                    }
                />
                <Drawer
                    docked={false}
                    width={200}
                    zDepth={3}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
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
                        {/*<Link to="/">*/}
                        {/*<MenuItem primaryText="Admin" leftIcon={<Admin/>}/>*/}
                        {/*</Link>*/}
                    </Menu>

                </Drawer>
            </div>


        );
    }
}

export default Sidebar;

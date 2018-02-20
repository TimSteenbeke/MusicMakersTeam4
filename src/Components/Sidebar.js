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
import Admin from 'material-ui/svg-icons/action/grade';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Group from 'material-ui/svg-icons/social/group'

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
                <Link to="/">
                    <AppBar
                        title="Music Makers"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonClick={this.handleToggle}
                        style={{backgroundColor: '#DD2C00', position: 'fixed'}}
                    />
                </Link>
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
                        <Link to="/addInstrument">
                            <MenuItem primaryText="Add Instrument" leftIcon={<ContentLink/>}/>
                        </Link>
                        <Divider/>

                        <Link to="/agenda">
                            <MenuItem primaryText="Agenda" leftIcon={<Agenda/>}/>
                        </Link>
                        <Divider/>

                        <Link to="/instrumenten">
                            <MenuItem primaryText="Instrumenten" leftIcon={<Dashboard/>}/>
                        </Link>
                        <Link to="/">
                            <MenuItem primaryText="Admin" leftIcon={<Admin/>}/>
                        </Link>
                        <Link to="/groups">
                            <MenuItem primaryText="Groepen" leftIcon={<Group/>}/>
                        </Link>
                        <Link to="/addGroup">
                            <MenuItem primaryText="Groep toevoegen" leftIcon={<ContentLink/>}/>
                        </Link>
                    </Menu>
                </Drawer>
            </div>


        );
    }
}

export default Sidebar;
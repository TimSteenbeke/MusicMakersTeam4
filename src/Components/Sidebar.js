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
import Divider from 'material-ui/Divider';
import logo from '../images/logo.png'

const styles = {
    menuColor: {
        color: "#D9CDC7",
    }
};

class Sidebar extends Component {

    render() {
        return (
            <div>


                <img className="circle logo" alt="guitar" src={logo}/>

                <Menu>
                    <Divider/>
                    <Link to="/">
                        <MenuItem style={styles.menuColor} primaryText="Home" leftIcon={<Home/>}/>
                    </Link>
                    <Divider/>
                    <Link to="/agenda">
                        <MenuItem style={styles.menuColor} primaryText="Agenda" leftIcon={<Agenda/>}/>
                    </Link>
                    <Divider/>
                    <Link to="/instrumenten">
                        <MenuItem style={styles.menuColor} primaryText="Instrumenten" leftIcon={<Dashboard/>}/>
                    </Link>
                    <Link to="/groups">
                        <MenuItem primaryText="Groepen" leftIcon={<Group/>}/>
                    </Link>
                    <Divider/>
                    <Link to="/addGroup">
                        <MenuItem primaryText="Groep toevoegen" leftIcon={<ContentLink/>}/>
                    </Link>
                    <Divider/>
                    <Link to="/courses">
                        <MenuItem style={styles.menuColor} primaryText="Courses" leftIcon={<Dashboard/>}/>
                    </Link>
                    <Divider/>
                    <Link to="/addCourse">
                        <MenuItem style={styles.menuColor} primaryText="Add course" leftIcon={<ContentLink/>}/>
                    </Link>
                    <Link to="/addInstrument">
                        <MenuItem style={styles.menuColor} primaryText="Add Instrument" leftIcon={<ContentLink/>}/>
                    </Link>
                    <Divider/>
                    <Link to="/muziekStukken">
                        <MenuItem style={styles.menuColor} primaryText="Compositions" leftIcon={<Dashboard/>}/>
                    </Link>
                    <Divider/>
                    <Link to="/addMuziekstuk">
                        <MenuItem style={styles.menuColor} primaryText="Add Composition" leftIcon={<ContentLink/>}/>
                    </Link>
                    <Divider/>
                </Menu>
            </div>
        );
    }
}

export default Sidebar;

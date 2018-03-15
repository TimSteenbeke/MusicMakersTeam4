/**
 * Created by jariv on 14/02/2018.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
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
                    <Link to="/">
                        <MenuItem style={styles.menuColor} primaryText="Home"/>
                    </Link>
                    <Link to="/agenda">
                        <MenuItem style={styles.menuColor} primaryText="Agenda"/>
                    </Link>
                    <Link to="/instrumenten">
                        <MenuItem style={styles.menuColor} primaryText="Instrumenten"/>
                    </Link>
                    <Link to="/groups">
                        <MenuItem style={styles.menuColor} primaryText="Groepen"/>
                    </Link>
                    <Link to="/users">
                        <MenuItem style={styles.menuColor} primaryText="Users"/>
                    </Link>
                    <Link to="/courses">
                        <MenuItem style={styles.menuColor} primaryText="Courses"/>
                    </Link>
                    <Link to="/compositions">
                        <MenuItem style={styles.menuColor} primaryText="Compositions"/>
                    </Link>
                    <Link to="/playpartituur">
                        <MenuItem style={styles.menuColor} primaryText="Play Partituur"/>
                    </Link>
                </Menu>
            </div>
        );
    }
}

export default Sidebar;

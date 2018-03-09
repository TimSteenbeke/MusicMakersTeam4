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
                    <Divider/>
                    <Link to="/">
                        <MenuItem style={styles.menuColor} primaryText="Home"/>
                    </Link>
                    <Divider/>
                    <Link to="/agenda">
                        <MenuItem style={styles.menuColor} primaryText="Agenda"/>
                    </Link>
                    <Divider/>
                    <Link to="/instrumenten">
                        <MenuItem style={styles.menuColor} primaryText="Instrumenten"/>
                    </Link>
                    <Link to="/groups">
                        <MenuItem  style={styles.menuColor} primaryText="Groepen"/>
                    </Link>
                    <Divider/>
                    <Link to="/addGroup">
                        <MenuItem style={styles.menuColor} primaryText="Groep toevoegen"/>
                    </Link>
                    <Divider/>
                    <Link to="/courses">
                        <MenuItem style={styles.menuColor} primaryText="Courses"/>
                    </Link>
                    <Divider/>
                    <Link to="/addCourse">
                        <MenuItem style={styles.menuColor} primaryText="Add course"/>
                    </Link>
                    <Link to="/addInstrument">
                        <MenuItem style={styles.menuColor} primaryText="Add Instrument"/>
                    </Link>
                    <Divider/>
                    <Link to="/muziekStukken">
                        <MenuItem style={styles.menuColor} primaryText="Compositions"/>
                    </Link>
                    <Divider/>
                    <Link to="/playpartituur">
                        <MenuItem style={styles.menuColor} primaryText="Play Partituur"/>
                    </Link>
                    <Divider/>
                </Menu>
            </div>
        );
    }
}

export default Sidebar;

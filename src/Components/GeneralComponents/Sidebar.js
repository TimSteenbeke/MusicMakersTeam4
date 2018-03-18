import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import logo from '../../images/logo.png'
import * as LoginService from "../../Services/LoginService";
import './Sidebar.css';

const styles = {
    menuColor: {
        color: "#D9CDC7",
    }
};

export default class Sidebar extends Component {

    render() {
        return (
            <div>
                <img className="circle logo" alt="guitar" src={logo}/>
                <Menu>
                    {LoginService.checkToken() ? <section>

                        <Divider/>
                        <Link to="/">
                            <MenuItem style={styles.menuColor} primaryText="Home"/>
                        </Link>
                        <Divider/>
                        <Link to="/agenda">
                            <MenuItem style={styles.menuColor} primaryText="Agenda"/>
                        </Link>
                        <Divider/>
                        <Link to="/chat">
                            <MenuItem style={styles.menuColor} primaryText="Chat"/>
                        </Link>
                        <Divider/>
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
                        <Link to="/courseTypes">
                            <MenuItem style={styles.menuColor} primaryText="CourseTypes"/>
                        </Link>
                        <Link to="/newsitems">
                            <MenuItem style={styles.menuColor} primaryText="Meldingen"/>
                        </Link>
                        <Divider/>
                        <Link to="/mygroups">
                            <MenuItem style={styles.menuColor} primaryText="Mijn groepen"/>
                        </Link>
                        <Link to="/mycourses">
                            <MenuItem style={styles.menuColor} primaryText="Mijn Vakken"/>
                        </Link>
                        <Divider/>
                    </section> : <section><Divider/><Link to="/">
                        <MenuItem style={styles.menuColor} primaryText="Home"/>
                    </Link><Divider/></section>}
                </Menu>
            </div>
        );
    }
}

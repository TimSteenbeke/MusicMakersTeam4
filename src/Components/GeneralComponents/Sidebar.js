import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import logo from '../../images/logo.png'
import * as LoginService from "../../Services/LoginService";
import './Sidebar.css';
import i18n from './i18n'

const styles = {
    menuColor: {
        color: "#D9CDC7",
        fontSize: "0.9em"
    }
};

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: ""
        };
    }

    setLanguage(){
        this.setState({lng: navigator.language});
        localStorage.setItem("i18nextLng", this.state.lng.substring(0,2));
        console.log("User language: " + this.state.lng);
    }

    componentDidMount() {
        this.setLanguage()
    }

    componentWillMount() {
        this.setLanguage()
    }

    render() {
        return (
            <div>
                <img className="circle logo" alt="guitar" src={logo}/>
                <Menu>
                    {LoginService.checkToken() ? <section>
                        <Divider/>
                        <Link to="/">
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('home.label')}/>
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
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('instruments.label')}/>
                        </Link>
                        <Link to="/groups">
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('groups.label')}/>
                        </Link>
                        <Link to="/users">
                            <MenuItem style={styles.menuColor} primaryText="Gebruikers"/>
                        </Link>
                        <Link to="/courses">
                            <MenuItem style={styles.menuColor} primaryText="Vakken"/>
                        </Link>
                        <Link to="/compositions">
                            <MenuItem style={styles.menuColor} primaryText="Muziekstukken"/>
                        </Link>
                        <Link to="/courseTypes">
                            <MenuItem style={styles.menuColor} primaryText="Vaktypes"/>
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
                        <Link to="/myplaylist">
                            <MenuItem style={styles.menuColor} primaryText="Mijn afspeellijst"/>
                        </Link>
                        <Link to="/addLesson">
                            <MenuItem style={styles.menuColor} primaryText="Les toevoegen"/>
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

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import logo from '../../images/logo.png'
import * as LoginService from "../../Services/LoginService";
import './Sidebar.css';
import i18n from './i18n'
import * as userService from "../../Services/UserService";

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
            lng: "",
            roles: [],
            rights: "Student"
        };
    }

    setLanguage() {
        this.setState({lng: navigator.language});
        localStorage.setItem("i18nextLng", this.state.lng.substring(0, 2));
    }

    componentDidMount() {
        this.setLanguage();
        this.CheckUserRoles();
    }

    componentWillMount() {
        this.setLanguage();
    }

    CheckUserRoles() {
        let self = this;
        let roles = [];
        if (localStorage.getItem("userToken") != null) {
            userService.getRolesCurrentUser().then(
                (value) => {
                    roles = value.roles;
                    if(roles != null){
                        roles.forEach(role => {
                            if ("Admin" === role.rolename) {
                                self.setState({rights: role.rolename})
                            } else if ("Teacher" === role.rolename && "Admin" !== self.state.rights) {
                                self.setState({rights: role.rolename})
                            }
                        });
                        self.setState({
                            roles: roles,
                        });
                    }
                });
        }
    }

    render() {
        let adminLinks = null, studentLinks =null;
        if ("Admin" === this.state.rights || "Teacher" === this.state.rights) {
            adminLinks = <div>
                <Link to="/instrumenten">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('instruments.label')}/>
                </Link>
                <Link to="/instrumentlevels">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('instrumentlevels.label')}/>
                </Link>
                <Link to="/groups">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('groups.label')}/>
                </Link>
                <Link to="/users">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('users.label')}/>
                </Link>
                <Link to="/courses">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('courses.label')}/>
                </Link>
                <Link to="/courseTypes">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('coursetypes.label')}/>
                </Link>
                <Link to="/lessons">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('lessons.label')}/>
                </Link>
                <Divider/>
            </div>;
        }
        if("Student" === this.state.rights || "Teacher" === this.state.rights){
            studentLinks = <div>
                <Link to="/mygroups">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('mygroups.label')}/>
                </Link>
                <Link to="/mycourses">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('mycourses.label')}/>
                </Link>
                <Link to="/myplaylist">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('myplaylist.label')}/>
                </Link>
                <Link to="/myinstrumentlevels">
                    <MenuItem style={styles.menuColor} primaryText={i18n.t('myinstrumentlevels.label')}/>
                </Link>
                <Divider/>
            </div>
        }


        return (
            <div>
                <Link to="/">
                    <img className="circle logo" alt="guitar" src={logo}/>
                </Link>
                <Menu>
                    {LoginService.checkToken() ? <section>
                        <Divider/>
                        <Link to="/">
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('home.label')}/>
                        </Link>
                        <Divider/>
                        <Link to="/newsitems">
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('notifications.label')}/>
                        </Link>
                        <Link to="/agenda">
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('agenda.label')}/>
                        </Link>
                        <Link to="/chat">
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('chat.label')}/>
                        </Link>
                        <Divider/>
                        {adminLinks}
                        <Link to="/compositions">
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('compositions.label')}/>
                        </Link>
                        <Link to="/performance">
                            <MenuItem style={styles.menuColor} primaryText={i18n.t('performances.label')}/>
                        </Link>
                        <Divider/>
                        {studentLinks}
                    </section> : <section><Divider/><Link to="/">
                        <MenuItem style={styles.menuColor} primaryText="Home"/>
                    </Link><Divider/></section>}
                </Menu>
            </div>
        );
    }
}

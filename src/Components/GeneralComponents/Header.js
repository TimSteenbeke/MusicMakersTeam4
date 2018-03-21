import React, {Component} from 'react';
import * as LoginService from '../../Services/LoginService';
import Login from '../Login';
import './Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginButton: "",
            showLogout: true,
        }
    }

    componentDidMount() {
        this.getLoggedIn();
    }

    checkAuthentication = () => {
        if (!LoginService.checkToken()) {
            return false;
        }
        return true;
    };

    getLoggedIn = () => {
        let self = this;
        if (this.checkAuthentication()) {
            self.setState({loginButton: "Log Out"});
        } else {
            self.setState({loginButton: "Login"});
        }
        self.setState({showLogout: this.checkAuthentication()});
    };

    checkLogin = () => {
        if (this.state.showLogout) {
            localStorage.removeItem('userToken');
            this.getLoggedIn();
            window.location.reload();
        } else {
            this.getLoggedIn();
        }
    };

    render() {
        return (
            <div>
                <div className="navbar">
                    <nav className="nav">
                        <div className="nav-wrapper orange deep-orange darken-4">
                            <a className="left brand-logo">{this.props.name}</a>
                            <ul id="nav-mobile" className="right hide-on-small-and-down">
                                <li><a className="waves-effect deep-orange darken-4 waves-light btn"
                                       onClick={this.checkLogin}>{this.state.loginButton}</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Login/>
            </div>
        )
    }
}

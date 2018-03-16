/**
 * Created by jariv on 3/03/2018.
 */
import React, {Component} from 'react';
import Login from './Login'
import * as LoginService from '../Services/LoginService'

class Header extends Component {
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
        if(!LoginService.checkToken()){
            return false;
        }
        return true;
    };

    getLoggedIn = () => {
        let self = this;
        console.log("Logged in check token header =>" + this.checkAuthentication());
        if (this.checkAuthentication()) {
            console.log("Zit in Logout");
            self.setState({loginButton: "Log Out"}, () => {console.log("Button? => " + self.state.loginButton);});
        }else{
            console.log("Zit in Login");
            self.setState({loginButton: "Login"}, () => {console.log("Button? => " + self.state.loginButton);});
        }
        self.setState({showLogout: this.checkAuthentication()}, () => {console.log("Logged in? showLogout => " + self.state.showLogout);});
        console.log("Logged in check token header =>" + this.checkAuthentication());
    };

    checkLogin = () => {
        if (this.state.showLogout){
            localStorage.removeItem('userToken');
            this.getLoggedIn();
            window.location.reload();
        }else{
            this.getLoggedIn();
        }
    };

    render() {
        return (
            <div>
                <div className="navbar">
                    <nav className="nav">
                        <div className="nav-wrapper orange deep-orange darken-4">
                            <a className="brand-logo">{this.props.name}</a>
                            <ul id="nav-mobile" className="right hide-on-small-and-down">
                                <li><a className="waves-effect deep-orange darken-4 waves-light btn" onClick={this.checkLogin}>{this.state.loginButton}</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Login/>
            </div>
        )
    }
}
export default Header;
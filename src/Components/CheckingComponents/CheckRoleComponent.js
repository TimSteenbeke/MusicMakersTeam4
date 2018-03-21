import * as userService from "../../Services/UserService";
import React, {Component} from "react";
import Home from '../Home.js';
import * as LoginService from "../../Services/LoginService";

export default function (WrapperComponent) {
    class CheckRoleComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false,
                login:true
            }
        }

        componentWillMount() {
            let roles = [];
            let self=this;
            if (localStorage.getItem("userToken") != null) {
                userService.getRolesCurrentUser().then(
                    (value) => {
                        roles = value.roles;
                        roles.forEach(role => {
                            if (role.rolename === "Teacher" || role.rolename === "Admin") {
                               self.setState({redirect:true})
                            }
                        });
                    });
            };
            this.CheckUserRoles();
        }

        CheckUserRoles() {
            let roles = [];
            let self=this;
            if (!LoginService.checkToken()) {
                self.setState({login:false});
            }

            if (localStorage.getItem("userToken") != null) {
                userService.getRolesCurrentUser().then(
                    (value) => {
                        roles = value.roles;
                        roles.forEach(role => {
                            if (role.rolename === "Teacher" || role.rolename === "Admin") {
                                self.setState({redirect:true})
                            }
                        });
                    });
            }
        }

        render() {
            if (this.state.login && this.state.redirect) {
                return <WrapperComponent {...this.props} />
            } else {
                return <Home/>
            }
        }
    }

    return CheckRoleComponent;
}
import * as userService from "../../Services/UserService";
import React, {Component} from "react";
import Home from '../Home.js';

export default function (WrapperComponent) {
    class CheckRoleComponent extends Component {

        CheckUserRoles(params) {
            const {history} = params;
            let roles = [];
            let redirect = false;
            if (localStorage.getItem("userToken") != null) {
                userService.getRolesCurrentUser().then(
                    (value) => {
                        roles = value.roles;
                        alert("roles:" + roles[0]);
/*                        if(roles[0].roleid <3){
                            return true;
                        }*/
                        roles.forEach(role => {
                            if (role.rolename == "Teacher" || role.rolename == "Admin") {
                                redirect= true;
                            }
                        });
                    });
            }
            return redirect;
        }

        render() {
            if (this.CheckUserRoles(this.props)) {
                return <WrapperComponent {...this.props} />
            } else {
                alert("false checkuser");
                // return <Home/>
            }
        }
    }

    return CheckRoleComponent;
}
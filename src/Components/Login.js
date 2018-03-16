import React, {Component} from 'react';
import './Login.css';
import {black500} from 'material-ui/styles/colors';
import * as LoginService from "../Services/LoginService";
import swal from 'sweetalert2'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            username: "",
            password: "",
            isLoggedIn: true,
        };
    }

    login = () => {
        let user = this.state.username;
        let pass = this.state.password;
        let response = LoginService.fetchToken(user, pass);
        console.log("response before check:");
        console.log(response);
        response.then((value) => {
            if (value) {
                console.log("check login service => " + LoginService.checkToken());
                console.log("Logged in");
                window.location.reload();
            } else {
                console.log("check login service => " + LoginService.checkToken());
                console.log("Failed to log in");
                this.setState({errorMessage: "Username of password incorrect"}, () => {
                    console.log("Trying to open Swat");
                    if (!this.state.isLoggedIn) {
                        console.log("Opening Swat");
                        this.openSwat();
                    }
                });

            }
        });
    };

    getLoggedIn = () => {
        let self = this;
        console.log("Getting Log in");
        if (!LoginService.checkToken()) {
            self.setState({isLoggedIn: LoginService.checkToken()}, () => {
                console.log("Trying to open Swat");
                if (!self.state.isLoggedIn) {
                    console.log("Opening Swat");
                    self.openSwat();
                }
            });
        }

    };

    openSwat = () => {
        swal.setDefaults({
            input: 'text',
            confirmButtonText: 'Next',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonClass: 'btn waves-effect waves-light deep-orange darken-4',
        });

        let steps = [
            {
                title: 'Username',
                html: '<div>Please enter your username</div><div class="red-text">{this.state.errorMessage}</div>',
                input: 'text',
            },
            {
                title: 'Password',
                text: 'Please enter your password',
                input: 'password',

            },
        ];

        swal.queue(steps).then((result) => {
            if (result.value) {
                this.setState({username: result.value[0]});
                console.log(this.state.username);
                this.setState({password: result.value[1]});
                console.log(this.state.password);
                this.login();
            }
        })
    };


    componentDidMount() {
        this.getLoggedIn();
    };

    render() {
        return (
            <div>
            </div>
        )
    }
}

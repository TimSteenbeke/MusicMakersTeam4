import React, {Component} from 'react';
import './Login.css';
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
        response.then((value) => {
            if (value) {
                swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Je bent ingelogd!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload();
                });


            } else {
                this.setState({errorMessage: "Username of password incorrect"}, () => {
                    if (!this.state.isLoggedIn) {
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Username of password incorrect!',
                            timer: 2000,
                            showConfirmButton: false,
                        }).then(() => {
                            this.openSwat();
                        });

                    }
                });

            }
        });
    };

    getLoggedIn = () => {
        let self = this;
        if (!LoginService.checkToken()) {
            self.setState({isLoggedIn: LoginService.checkToken()}, () => {
                if (!self.state.isLoggedIn) {
                    self.openSwat();
                }
            });
        }

    };


    openSwat = () => {
        swal.setDefaults({
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#bf360c',
        });

        let steps = [
            {
                title: 'Username',
                html: 'Please enter your username',
                input: 'text',
                confirmButtonText: 'Next',
            },
            {
                title: 'Password',
                text: 'Please enter your password',
                input: 'password',
                confirmButtonText: 'Next',
            },
        ];

        swal.queue(steps).then((result) => {
            if (result.value) {
                this.setState({username: result.value[0]});
                this.setState({password: result.value[1]});
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

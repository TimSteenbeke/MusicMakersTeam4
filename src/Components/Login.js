import React, {Component} from 'react';
import '../CSS/Login.css';
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";
import Header from './Header'
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const mySwal = withReactContent(swal);

const loginDesign = [];


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            } else {
                console.log("check login service => " + LoginService.checkToken());
                console.log("Failed to log in");
                this.openSwat();
            }
        });
    };

    getLoggedIn = () => {
        let self = this;
        if (LoginService.checkToken()) {
            self.setState({isLoggedIn: true});
        }else{
            self.setState({isLoggedIn: false});
        }
        console.log("Logged in LoginScreen? => " + self.state.isLoggedIn);
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
                text: 'Please enter your username',
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
        if (!this.state.isLoggedIn) {
            this.openSwat();
        }
    };

    render() {
        return (
            <div>
            </div>
        )
    }
}


export default Login;

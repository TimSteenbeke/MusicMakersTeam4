import React, {Component} from 'react';
import '../CSS/Login.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import * as LoginService from "../Services/LoginService";
import {browserHistory} from 'react-router';
import Redirect from "react-router-dom/es/Redirect";

const styles = {
    width: {
        width: "90%",
    },
    loginButton: {
        boxShadow: "2px 10px 5px #616161",
    },
    errorStyle: {
        color: deepOrangeA700,

    },
    underlineStyle: {
        borderColor: deepOrangeA700,
    },
    inputstyle: {
        color: black500,
    },
    floatingLabelStyle: {
        color: grey500,
    },
    floatingLabelFocusStyle: {
        color: grey500,
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flex: 2.2,
            failLogin: false,
            redirect: false,
            username: "",
            password: ""
        };
    }

    animateLogin = () => {
        let user = this.state.username;
        let pass = this.state.password;
        let response = LoginService.fetchToken(user, pass);
        console.log("response before check:");
        console.log(response);
        response.then((value) => {
            if (value) {
                this.setState({redirect: true})
            } else {
                this.setState({failLogin: true})
            }
        });
    };

    setPassword(event, typedPassword) {
        console.log("setPassword: type=> ", typedPassword);
        this.setState({password: typedPassword})
    }

    setUsername(event, typedUsername) {
        console.log("setPassword: type=> ", typedUsername);
        this.setState({username: typedUsername})
    }

    componentWillMount() {
        if(localStorage.getItem('userToken')!= null){
            this.setState({redirect: true});
        }
    }

    render() {
        let failedLogin = null, redirecting = null;
        if (this.state.failLogin) {
            failedLogin = <p className="red-text"> Username or password incorrect !</p>
        }
        if (this.state.redirect) {
            redirecting = <Redirect to='/'/>
        }
        return (

            <div className="App">
                <section className="container">
                    <div className="left-half" style={{flex: this.state.flex}}>
                    </div>
                    <div className="right-half">
                    </div>
                </section>

                <div className="loginForm">
                    <h1 className="header">Music Makers</h1>
                    <div className="border">
                        <TextField
                            style={styles.width}
                            hintText="Type username here..."
                            floatingLabelText="Username"
                            inputStyle={styles.inputstyle}
                            hintStyle={styles.floatingLabelFocusStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            onChange={(event, typedUsername) => this.setUsername(event, typedUsername)}
                        /><br/>
                        <TextField
                            type="password"

                            hintText="Type password here..."
                            floatingLabelText="Password"
                            style={styles.width}
                            inputStyle={styles.inputstyle}
                            hintStyle={styles.floatingLabelFocusStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            onChange={(event, typedPassword) => this.setPassword(event, typedPassword)}
                        /><br/>
                    </div>
                    {failedLogin}
                    <RaisedButton label="Login" onClick={this.animateLogin} backgroundColor="#DD2C00"
                                  style={styles.loginButton}
                                  labelColor="#FFEBEE"
                                  className="loginButton"/>
                </div>
                {redirecting}
            </div>


        );
    }
}


export default Login;

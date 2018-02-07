import React, {Component} from 'react';
import logo from './images/logo.png';
import './App.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {black500, deepOrangeA700} from 'material-ui/styles/colors';

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
    floatingLabelStyle: {
        color: black500,
    },
    floatingLabelFocusStyle: {
        color: black500,
    },
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <section className="container">
                    <div className="left-half">
                    </div>
                    <div className="right-half">
                    </div>
                </section>
                <div className="loginForm">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Music Makers</h1>
                    </header>
                    <div className="border">
                        <TextField
                            style={styles.width}
                            hintText="Type username here..."
                            floatingLabelText="Username"
                            inputStyle={styles.floatingLabelStyle}
                            hintStyle={styles.floatingLabelStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                        /><br />
                        <TextField
                            style={styles.width}
                            hintText="Type password here..."
                            floatingLabelText="Password"
                            inputStyle={styles.floatingLabelStyle}
                            hintStyle={styles.floatingLabelStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                        /><br />
                    </div>
                    <RaisedButton label="Login" backgroundColor="#DD2C00" style={styles.loginButton}
                                  labelColor="#FFEBEE"
                                  className="loginButton"/>
                </div>

            </div>


        );
    }
}


export default App;

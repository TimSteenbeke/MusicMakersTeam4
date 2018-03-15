import {Component} from 'react';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import React from "react";
import {TextField} from "material-ui";
import {black500, deepOrangeA700, grey500} from "material-ui/styles/colors";
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

export default class AngularComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: 'http://localhost:8080/socket',
            title: 'WebSockets chat',
            text: "",
            chatroom: 'poef',
            messages: [],
            message: "Hello there",
            name: "UserX"
        };
        this.stompClient = null;
    }

    componentWillMount() {
        this.initializeWebSocketConnection();
    }

    ChangeRoom() {
        this.initializeWebSocketConnection();
    }

    initializeWebSocketConnection() {
        const ws = new SockJS(this.state.serverUrl);
        this.stompClient = Stomp.over(ws);
        // this.stompClient = Stomp.overWS('ws://localhost:8080');
        this.stompClient.connect({},() => {
            this.stompClient.subscribe('/chat/' + this.state.chatroom, (message) => {
                if (message.body) {
                    this.setState({messages: [...this.state.messages, message.body]});
                    console.log(message.body);
                }
            });
        });
    }

    sendMessage() {
        let message = this.state.name + ': ' + this.state.message;
        this.stompClient.send('/app/send/message/' + this.state.chatroom, {}, message);
        this.setState({message: ''});
    }

    render() {
        return (
            <div>
                <div class="chat">
                        {this.state.messages.map((msg) => {
                                return (<div dangerouslySetInnerHTML={{__html: msg}}></div>)
                            }
                        )}
                </div>

                <TextField
                    style={styles.width}
                    hintText="Type your message here..."
                    floatingLabelText="Message"
                    inputStyle={styles.inputstyle}
                    hintStyle={styles.floatingLabelFocusStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    onChange={(event, typedMessage) => {
                        this.setState({message: typedMessage});
                    }}
                    value={this.state.message}
                />
                <button onClick={this.sendMessage}>send</button>
                <label>Naam:</label>
                <TextField
                    style={styles.width}
                    hintText="Type your name here..."
                    floatingLabelText="Name"
                    inputStyle={styles.inputstyle}
                    hintStyle={styles.floatingLabelFocusStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    onChange={(event, typedName) => {
                        this.setState({name: typedName});
                    }}
                    value={this.state.name}
                />
                <label>Chatroom:</label>
                <TextField
                    style={styles.width}
                    hintText="Type your chatroom here..."
                    floatingLabelText="Name"
                    inputStyle={styles.inputstyle}
                    hintStyle={styles.floatingLabelFocusStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    onChange={(event, typedRoom) => {
                        this.setState({chatroom: typedRoom});
                    }}
                    value={this.state.chatroom}
                />
                <button onClick={this.ChangeRoom}>Change room</button>
            </div>
        )
            ;
    }

}

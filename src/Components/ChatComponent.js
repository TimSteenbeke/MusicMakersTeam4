import React, {Component} from 'react';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {TextField} from "material-ui";
import {black500,deepOrangeA700, grey500} from "material-ui/styles/colors";
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


const serverUrl = 'https://musicmaker-api-team4.herokuapp.com/socket';
// const serverUrl = 'http://localhost:8080/socket';
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'WebSockets chat',
            text: "",
            chatroom: 'Poef',
            messages: ["Welcome to chatroom Poef", "Tim: Hello there", "Jos: jo test"],
            message: "Hello world !",
            name: currentUser.firstname
        };
        this.stompClient = null;
    }

    componentDidMount() {
        this.initializeWebSocketConnection();
    }

    ChangeRoom() {
        let self = this;
        self.setState({
            messages: ["Welcome to Chatroom " + self.state.chatroom]
        });
        this.initializeWebSocketConnection();
    }

    initializeWebSocketConnection() {
        const self = this;
        const ws = new SockJS(serverUrl);
        self.stompClient = Stomp.over(ws);
        console.log("initializeWebSocketConnection");
        console.log(ws);
        self.stompClient.connect({}, () => {
            self.stompClient.subscribe('/chat/' + self.state.chatroom, (message) => {
                console.log("msg");
                console.log(message);
                if (message.body) {
                    self.setState({messages: [...self.state.messages, message.body]});
                    console.log(message.body);
                }
            });
        });
        console.log("init is done");
    }

    sendMessage() {
        let name = this.state.name;
        let content = this.state.message;
        let message = name + ': ' + content;
        this.stompClient.send('/chat/' + this.state.chatroom, {}, message);
        this.setState({message: ''});
    }

    render() {
        console.log("chat content");
        console.log(this.state.messages);
        return (
            <div>
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
                <button onClick={(e) => this.sendMessage(e)}>send</button>
                {/*<label>Naam:</label>
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
                />*/}
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
                <button onClick={(e) => this.ChangeRoom(e)}>Change room</button>
                <div>
                    <p>|</p>
                </div>
                <div className="chat">
                    {this.state.messages.map((msg, key) => {
                            return (<div id={key}>{msg}</div>)
                        }
                    )}
                </div>
            </div>
        );
    }
}

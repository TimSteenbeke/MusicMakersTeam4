import React, {Component} from 'react';
import Sockette from 'sockette';
import Header from "../Header";
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
/*
const ws = new Sockette('ws://localhost:7070/chat', {
    timeout: 5e3,
    maxAttempts: 10,
    onopen: e => console.log('Connected!', e),
    onmessage: e => {
        console.log('Received:', e);
    },
    onreconnect: e => console.log('Reconnecting...', e),
    onmaximum: e => console.log('Stop Attempting!', e),
    onclose: e => {
        console.log('Closed!', e);
        alert("Chat connection closed")
    },
    onerror: e => {
        console.log('Error:', e);
        alert("Chat connection Error");
    }
});
*/


export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            data: [],
            count: 90,
            wsURL: 'ws://localhost:7070/chat'
            // wsURL: 'ws://' + location.hostname + ':' + location.port + '/chat'
        };
        this.socket = new Sockette('ws://localhost:7070/chat', {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => console.log('Connected!', e),
            onmessage: e => {
                console.log('Received:', e);
            },
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop Attempting!', e),
            onclose: e => {
                console.log('Closed!', e);
                alert("Chat connection closed")
            },
            onerror: e => {
                console.log('Error:', e);
                alert("Chat connection Error");
            }
        });
    }

    componentDidMount() {
        this.socket.open();
    }

    updateChat(msg) { // Update chat-panel and list of connected users
        let data = JSON.parse(msg.data);
        console.log("msg: ", msg);
        console.log("msg.data: ", data);
        this.setState({
            data: [...this.state.data, data]
        })
        // id("chat").insertAdjacentHTML("afterbegin", data.userMessage);
        //id("userlist").innerHTML = data.userlist.map(user => "<li>" + user + "</li>").join("");
    }


    setMessage(event, typedMessage) {
        this.setState({message: typedMessage});
        console.log("setMessage: state typed=> ", this.state.message);
    }

    sendAndClear() {
        if (this.state.message !== "") {
            this.socket.send(this.state.message);
        }
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Chat"/>
                <section className="containerCss">
                    <div id="chatControls">
                        count: <strong>{this.state.count}</strong>
                        {this.state.data.map((data, index) => {
                            <div className="data">{data}</div>
                        })}
                        <TextField
                            style={styles.width}
                            hintText="Type your message here..."
                            floatingLabelText="Message"
                            inputStyle={styles.inputstyle}
                            hintStyle={styles.floatingLabelFocusStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            onChange={(event, typedMessage) => this.setMessage(event, typedMessage)}
                        />
                        <button id="send" onClick={() => this.sendAndClear()}>Send</button>
                    </div>
                </section>
            </div>
        );
    }
}
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


export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            data: [],
            wsURL: 'ws://localhost:7070/chat'
            // wsURL: 'ws://' + location.hostname + ':' + location.port + '/chat'
        };
        let self = this;
        this.socket = new Sockette('ws://localhost:7070/chat', {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => {
                console.log('Connected!', e);
            },
            onmessage: e => {
                console.log('Received:', e);
                let msg = JSON.parse(e.data).userMessage;
                self.setState({
                    data: [...self.state.data, msg]
                });
            },
            onreconnect: e => {
                console.log('Reconnecting...', e);
            },
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
    }


    setMessage(event, typedMessage) {
        this.setState({message: typedMessage});
        console.log("setMessage: state typed=> ", this.state.message);
    }

    sendAndClear() {
        if (this.state.message !== "") {
            this.socket.send(this.state.message);
            this.setState({message:""});
        }
    }

    render() {
        console.log(this.state.data);
        return (
            <div className="Homepage">
                <Header name="Chat"/>
                <section className="containerCss">
                    <div className="flexChat">
                        {this.state.data.map((msg) => {
                                return (<div dangerouslySetInnerHTML={{__html: msg}}></div>)
                            }
                        )}
                    </div>
                    <div id="chatControls">
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
                            value={this.state.message}
                        />
                        <button id="send" onClick={() => this.sendAndClear()}>Send</button>
                    </div>
                </section>
            </div>
        );
    }
}
import React, {Component} from 'react';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import StyledTextField from './GeneralComponents/StyledTextField';
import Header from './GeneralComponents/Header';
import './ChatComponent.css';


const serverUrl = 'https://musicmaker-api-team4.herokuapp.com/socket';
// const serverUrl = 'http://localhost:8080/socket';
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "WebSockets chat",
            text: "",
            chatroom: "Poef",
            currentChatroom: "Poef",
            messages: [],
            message: "Hello world !",
            name: currentUser
        };
        this.stompClient = null;
        console.log("user " + this.state.name);
    }

    componentDidMount() {
        this.initializeWebSocketConnection();
    }

    ChangeRoom = () => {
        let self = this;
        console.log(self.state.chatroom);
        console.log(self.state.currentChatroom);
        this.setState({currentChatroom: self.state.chatroom, messages: []}, () => {
            console.log("chat =>" + self.state.currentChatroom);
            self.initializeWebSocketConnection();
        });


    };

    initializeWebSocketConnection = () => {
        const self = this;
        const ws = new SockJS(serverUrl);
        self.stompClient = Stomp.over(ws);
        console.log("initializeWebSocketConnection");
        console.log(ws);
        console.log("OH BOI HERE WE GO :" + self.state.currentChatroom);

        self.stompClient.connect({}, () => {
            self.stompClient.subscribe('/chat/' + self.state.currentChatroom, (message) => {
                console.log("msg");
                console.log(message);
                console.log("currentChatRoom");
                console.log(this.state.currentChatroom);
                if (message.body) {
                    self.setState({messages: [...self.state.messages, message.body]});
                    console.log(message.body);
                }
            });
        });
        console.log("init is done");
    };

    sendMessage() {
        let name = this.state.name;
        let content = this.state.message;
        let message = name + ': ' + content;
        this.stompClient.send('/chat/' + this.state.currentChatroom, {}, message);
        this.setState({message: ''});
    }

    setRoom = (e) => {
        this.setState({chatroom: e.target.value});
        console.log(this.state.chatroom);
    };

    setText = (e) => {
        this.setState({message: e.target.value});
    };

    render() {
        console.log("chat content");
        console.log(this.state.messages);
        return (
            <div width="100%" className="columncontainer">
                <Header name={"Chat: " + this.state.currentChatroom}/>
                <div className="rowcontainer chatheader">
                    <div className="row">

                        <div className="col s10 m10 l10 chatbar">
                            <StyledTextField
                                onChange={this.setRoom}
                                label="Chatroom"
                                value={this.state.chatroom}
                            />
                        </div>
                        <div className="col s2 m2 l2 chatbutton">
                            <button onClick={(e) => this.ChangeRoom(e)}>Change room</button>
                        </div>
                    </div>
                </div>
                <div className="rowcontainer chat">
                    <div className="groupschat">
                    </div>
                    <div className="paddingnator">
                        {this.state.messages.map((msg, key) => {
                                return (<div key={key} className="speech-bubble chatmargin" id={key}>{msg}</div>)
                            }
                        )}
                    </div>
                </div>
                <div className="divider"></div>
                <form>
                <div className="rowcontainer messagetyper">
                    <div className="chatbar">
                        <StyledTextField
                            onChange={this.setText}
                            label="Message"
                            value={this.state.message}
                        />
                    </div>
                    <div className="marginator">
                        <button onClick={(e) => this.sendMessage(e)}>send</button>
                    </div>
                </div>
                </form>

            </div>
        );
    }
}

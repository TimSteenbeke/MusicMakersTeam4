import React, {Component} from 'react';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import StyledTextField from './GeneralComponents/StyledTextField';
import Header from './GeneralComponents/Header';
import './ChatComponent.css';
import {List, ListItem} from 'material-ui/List';
import * as GroupService from '../Services/GroupService.js';
import * as UserService from '../Services/UserService';
import * as ChatService from '../Services/ChatService';
const serverUrl = 'https://musicmaker-api-team4.herokuapp.com/socket';
// const serverUrl = 'http://localhost:8080/socket';
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
let subscription = {};

export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "WebSockets chat",
            text: "",
            currentChatroom: {
                roomName: "Groep 1",
                messages: []
            },
            rooms: [],
            message: {
                userName: "",
                userId: 1,
                text: ""
            },
            user: {},
        };
        this.stompClient = null;
        console.log("user " + this.state.name);
    }

    componentDidMount() {
        let self = this;
        UserService.getUserByUsernameFromBackend().then(user => {
            self.setState({user: user}, () => {
                self.setState({message: {userId: user.id}});
                self.setState({message: {userName: user.firstname + ' ' + user.lastname}});
            });
            console.log("Users \n \n => " + this.state.user.firstname);
            console.log("Users Message \n \n => " + this.state.message.userId);
            GroupService.getGroupsByUser().then(groups => {
                let value = [];
                groups.forEach((group) => {
                    let chat = {
                        roomName: group.name,
                        messages: [],
                    };
                    value.push(chat);
                });
                console.log("VALUE : " + value);
                    self.setState({rooms: value, currentChatroom: {roomName: groups[0].name, messages: []} });
                }
            ).then(()=> {
                self.initializeWebSocketConnection();
            });
        });


    }

    ChangeRoom = (name) => {
        let self = this;
        console.log(self.state.currentChatroom.roomName);
        let messages = [];
        this.state.rooms.forEach((room) => {
            console.log("room : " + room);
            if (room.roomName === this.state.currentChatroom.roomName){
                messages = ChatService.getChatroomHistory(name);
                this.setState({currentChatroom: { roomName: name, messages: messages}}, () => {
                    console.log("chat =>" + self.state.currentChatroom.roomName);
                    console.log(room.messages);
                    subscription.unsubscribe();
                    self.initializeWebSocketConnection();
                });
            }
        });

    };

    initializeWebSocketConnection = () => {
        const self = this;
        const ws = new SockJS(serverUrl);
        let messages = [];
        self.stompClient = Stomp.over(ws);
        console.log("initializeWebSocketConnection");
        console.log(ws);
        console.log("OH BOI HERE WE GO :" + self.state.currentChatroom.roomName);
        console.log("WEEEEEEEEEE :" + self.state.message.userId);
        self.stompClient.connect({}, () => {
            subscription= self.stompClient.subscribe('/chat/' + self.state.currentChatroom.roomName, (message) => {
                console.log("msg");
                console.log(message);
                console.log("currentChatRoom");
                console.log(this.state.currentChatroom.roomName);
                console.log(this.state.currentChatroom.messages);
                if (message.body) {
                    messages = ChatService.getChatroomHistory(self.state.currentChatroom.roomName);
                    self.setState({currentChatroom: {messages: messages, roomName: self.state.currentChatroom.roomName}});
                    console.log("BOWDY => " + JSON.parse(message.body).userId);
                }
            });
        });
        console.log("init is done");
    };

    sendMessage = () => {
        console.log("DIS SHIT EMPTY: " + this.state.message.userId);
        this.stompClient.send('/chat/' + this.state.currentChatroom.roomName, {}, JSON.stringify(this.state.message));
        console.log("send to " + this.state.currentChatroom.roomName);
        this.setState({message: {text: ''}});
    };

    setText = (e) => {
        this.setState({message: {text: e.target.value, userId: this.state.user.id, userName: this.state.user.firstname + ' ' + this.state.user.lastname}});
    };

    render() {
        return (
            <div className="columncontainer">
                <Header name={"Chat: " + this.state.currentChatroom.roomName}/>
                <div className="rowcontainer chat">
                    <div className="groupschat">
                        <List>
                            { this.state.rooms && this.state.rooms.length > 0 ?
                                this.state.rooms.map((group, index) => (
                                    <ListItem key={index} primaryText={group.roomName}
                                              onClick={() => this.ChangeRoom(group.roomName)}/>))
                                : <ListItem key={1} primaryText="Geen groepen!"/>
                            }
                        </List>
                    </div>
                    <div className="texting paddingnator">
                        {
                            this.state.currentChatroom.messages.map((msg, key) => {
                                    console.log("MESSAGE: " + msg.text);
                                    console.log("IDDDDDD: " + msg.userId);
                                    if (msg.userId === this.state.user.id) {
                                        return (
                                            <div key={key} className="speech-bubbleYou chatMarginYou" id={key}>{msg.userName}: {msg.text}</div>
                                        )
                                    } else {
                                        return (
                                            <div key={key} className="speech-bubble chatmargin" id={key}>{msg.userName}: {msg.text}</div>
                                        )
                                    }
                                }
                            )
                        }
                    </div>
                </div>
                <div className="divider"></div>
                <form onSubmit={() => this.sendMessage()}>
                    <div className="rowcontainer messagetyper">
                        <div className="chatbar">
                            <StyledTextField
                                onChange={this.setText}
                                label="Message"
                                value={this.state.message.text}
                            />
                        </div>
                        <div className="marginator">
                            <a className="btnSize waves-effect deep-orange darken-4 waves-light btn"
                               onClick={() => this.sendMessage()}>send</a>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

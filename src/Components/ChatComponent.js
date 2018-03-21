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
import {Divider} from "material-ui";

const serverUrl = 'https://musicmaker-api-team4.herokuapp.com/socket';
// const serverUrl = 'http://localhost:8080/socket';
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
let subscription = {};

export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "WebSockets chat",
            currentChatroom: {
                roomName: "Global",
                roomId: "global",
                messages: []
            },
            groupRooms: [],
            userRooms: [],
            message: {
                userName: "",
                userId: 1,
                text: ""
            },
            user: {
                id: 0,
                userName: ""
            },
        };
        this.stompClient = null;
    }

    componentWillMount() {
        let self = this;
        UserService.getUserByUsernameFromBackend().then(user => {
            self.setState({user: user}, () => {
                self.setState({message: {userId: user.id}});
                self.setState({message: {userName: user.firstname + ' ' + user.lastname}});
                self.getUserRooms(user.id);
                self.getGroupRooms();

            });
        }).then(() => {
            self.initializeWebSocketConnection();
        })
    }

    getGroupRooms = () => {
        let groupRooms = [];
        let self = this;
        GroupService.getGroupsByUser().then(groups => {
            groups.forEach((group) => {
                let groupRoom = {
                    roomName: group.name,
                    roomId: group.name,
                    messages: [],
                };
                groupRooms.push(groupRoom);
            });
        }).then(() => {
                self.setState({
                    groupRooms: groupRooms
                });
            }
        )
    };

    getUserRooms = (curuser) => {
        let userRooms = [];
        let self = this;
        UserService.getAll().then(object => {
            let users = object.users;
            users.forEach((user) => {
                    if (user.userid != curuser) {
                        let roomName = user.firstname + " " + user.lastname;
                        let roomId = "";
                        if (user.userid < curuser) {
                            roomId = user.userid + "V" + curuser;
                        } else {
                            roomId = curuser + "V" + user.userid;
                        }
                        let userRoom = {
                            roomName: roomName,
                            roomId: roomId,
                            messages: [],
                        };
                        userRooms.push(userRoom);
                    }
                }
            )
        }).then(() => {
                self.setState({
                    userRooms: userRooms
                });
            }
        )
    };


    changeRoom = (changeRoom) => {
        let self = this;
        subscription.unsubscribe();
        let allRooms = [{
            roomName: "Global",
            roomId: "global",
            messages: [],
        }];
        this.state.groupRooms.forEach((room) => {
                allRooms.push(room);
            }
        );
        this.state.userRooms.forEach((room) => {
                allRooms.push(room);
            }
        );
        allRooms.forEach((room) => {
            if (room.roomId == changeRoom) {
                this.setState({
                    currentChatroom: {
                        roomName: room.roomName,
                        roomId: room.roomId,
                        messages: []
                    }
                }, () => {
                    self.initializeWebSocketConnection();
                });
            }
        });

    };


    initializeWebSocketConnection = () => {
        const self = this;
        const ws = new SockJS(serverUrl);
        let messages = [];
        console.log("init state: ", this.state);
        self.stompClient = Stomp.over(ws);
        self.stompClient.connect({}, () => {
            subscription = self.stompClient.subscribe('/chat/' + self.state.currentChatroom.roomId, (message) => {
                if (message.body) {
                    ChatService.getChatroomHistory(self.state.currentChatroom.roomId).then((value) => {
                        messages = value.messages;
                        self.setState({
                            currentChatroom: {
                                messages: messages,
                                roomName: self.state.currentChatroom.roomName,
                                roomId: self.state.currentChatroom.roomId
                            }
                        });
                    });

                }
            });
        });
        console.log("init is done");
    };

    sendMessage = () => {
        let message = this.state.message;
        let data = {
            "chatroom": this.state.currentChatroom.roomId,
            "username": message.userName,
            "userId": message.userId,
            "message": message.text
        };
        ChatService.postChatroomMessage(JSON.stringify(data));
        this.stompClient.send('/chat/' + this.state.currentChatroom.roomId, {}, JSON.stringify(message));
        this.setState({message: {text: ''}});
    };

    setText = (e) => {
        this.setState({
            message: {
                text: e.target.value,
                userId: this.state.user.id,
                userName: this.state.user.firstname + ' ' + this.state.user.lastname
            }
        });
    };

    render() {
        console.log("render state");
        console.log(this.state);
        return (
            <div className="columncontainer">
                <Header name={"Chat: " + this.state.currentChatroom.roomName}/>
                <div className="rowcontainer chat">
                    <div className="groupschat">
                        <List>
                            <ListItem key={1} primaryText="Global"
                                      onClick={() => this.changeRoom("global")}/>
                            <Divider/>
                            {this.state.groupRooms && this.state.groupRooms.length > 0 ?
                                this.state.groupRooms.map((group, index) => (
                                    <ListItem key={index + 1} primaryText={group.roomName}
                                              onClick={() => this.changeRoom(group.roomId)}/>))
                                : <ListItem key={2} primaryText="Geen groepen!"/>
                            }
                        </List>
                        <Divider/>
                        <List>
                            {this.state.userRooms && this.state.userRooms.length > 0 ?
                                this.state.userRooms.map((user, index) => (
                                    <ListItem key={index} primaryText={user.roomName}
                                              onClick={() => this.changeRoom(user.roomId)}/>))
                                : <ListItem key={1} primaryText="Geen users gevonden."/>
                            }
                        </List>
                    </div>
                    <div className="texting paddingnator">
                        {this.state.currentChatroom.messages.map((msg, key) => {
                                if (msg.userId === this.state.user.id) {
                                    return (
                                        <div key={key} className="speech-bubbleYou chatMarginYou"
                                             id={key}>{msg.username} : {msg.message}</div>
                                    )
                                } else {
                                    return (
                                        <div key={key} className="speech-bubble chatmargin"
                                             id={key}>{msg.username} : {msg.message}</div>
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
                                required={true}
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

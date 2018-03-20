import React, {Component} from 'react';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import StyledTextField from './GeneralComponents/StyledTextField';
import Header from './GeneralComponents/Header';
import './ChatComponent.css';
import {List, ListItem} from 'material-ui/List';
import * as GroupService from '../Services/GroupService.js';
import * as UserService from '../Services/UserService';
const serverUrl = 'https://musicmaker-api-team4.herokuapp.com/socket';
// const serverUrl = 'http://localhost:8080/socket';
const currentUser = JSON.parse(localStorage.getItem('currentUser'));


export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "WebSockets chat",
            text: "",
            currentChatroom: "Groep 1",
            messages: [],
            message: {
                userName: "",
                userId: 1,
                text: ""
            },
            user: {},
            groups: []
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
                    self.setState({groups: groups, currentChatroom: groups[0].name});
                }
            ).then(()=> {
                self.initializeWebSocketConnection();
            });
        });


    }

    ChangeRoom = (name) => {
        let self = this;
        console.log(self.state.currentChatroom);
        this.setState({currentChatroom: name, messages: []}, () => {
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
        console.log("WEEEEEEEEEE :" + self.state.message.userId);
        self.stompClient.connect({}, () => {
            self.stompClient.subscribe('/chat/' + self.state.currentChatroom, (message) => {
                console.log("msg");
                console.log(message);
                console.log("currentChatRoom");
                console.log(this.state.currentChatroom);
                if (message.body) {
                    self.setState({messages: [...self.state.messages, JSON.parse(message.body)]});
                    console.log("BOWDY => " + JSON.parse(message.body).userId);
                }
            });
        });
        console.log("init is done");
    };

    sendMessage = () => {
        console.log("DIS SHIT EMPTY: " + this.state.message.userId);
        this.stompClient.send('/chat/' + this.state.currentChatroom, {}, JSON.stringify(this.state.message));
        console.log("send to " + this.state.currentChatroom);
        this.setState({message: {text: ''}});
    };

    setText = (e) => {
        this.setState({message: {text: e.target.value, userId: this.state.user.id, userName: this.state.user.firstname + ' ' + this.state.user.lastname}});
    };

    render() {
        return (
            <div className="columncontainer">
                <Header name={"Chat: " + this.state.currentChatroom}/>
                <div className="rowcontainer chat">
                    <div className="groupschat">
                        <List>
                            { this.state.groups && this.state.groups.length > 0 ?
                                this.state.groups.map((group, index) => (
                                    <ListItem key={index} primaryText={group.name}
                                              onClick={() => this.ChangeRoom(group.name)}/>))
                                : <ListItem key={1} primaryText="Geen groepen!"/>
                            }
                        </List>
                    </div>
                    <div className="texting paddingnator">
                        {
                            this.state.messages.map((msg, key) => {
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
                <form>
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
                               onClick={(e) => this.sendMessage(e)}>send</a>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

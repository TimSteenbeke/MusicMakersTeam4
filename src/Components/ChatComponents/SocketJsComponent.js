import React ,{Component}from "react";
import SockJsClient from "react-stomp";
import UsernameGenerator from "username-generator";
import { TalkBox } from "react-talk";
import randomstring from 'randomstring';
import * as ChatService from '../../Services/ChatService';


export default class SocketJsComponent extends Component {
    constructor(props) {
        super(props);
        // randomUserId is used to emulate a unique user id for this demo usage
        this.randomUserName = UsernameGenerator.generateUsername("-");
        this.randomUserId = randomstring.generate();
        this.state = {
            clientConnected: false,
            messages: []
        };
    }

    onMessageReceive = (msg, topic) => {
        this.setState({
            messages: [...this.state.messages, msg]
        });
    }

    sendMessage = (msg, selfMsg) => {
        try {
            this.clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
            return true;
        } catch(e) {
            return false;
        }
    }

    componentWillMount() {
        let history = ChatService.getHistory();
        this.setState({ messages: [...this.state.messages, history]})
/*        Fetch("http://localhost:8080/history", {
            method: "GET",

        }).then((response) => {
            this.setState({ messages: response.body });
        });*/
    }

    render() {
        // const wsSourceUrl = window.location.protocol + "//" + window.location.host + "/handler";
        const wsSourceUrl = "http://localhost:8080/handler";
        return (
            <div>
                <TalkBox topic="react-websocket-template" currentUserId={ this.randomUserId }
                         currentUser={ this.randomUserName } messages={ this.state.messages }
                         onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>

                <SockJsClient url={ wsSourceUrl } topics={["/topic/all"]}
                              onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                              onConnect={ () => { this.setState({ clientConnected: true }) } }
                              onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                              debug={ false }/>
            </div>
        );
    }
}

import React, {Component} from 'react';
import Notification from './Notification';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let notifications = [
            {
                title: "Title first test ",
                message: "Message of the first test notification to be shown in the browser window",
                author: "Tim Steenbeke",
                date: "16-02-2018 16:00:00",
                attatchment: {}
            }, {
                title: "Title second test ",
                message: "Message of the second test notification to be shown in the browser window",
                author: "Tim Steenbeke",
                date: "16-02-2018 16:00:00",
                attatchment: {}
            }
        ];

        let visible =[];

        notifications.forEach((not)=>{
            visible.push(
                <Notification title={not.title} message ={not.message} author={not.author} date={not.date} attatchment = {not._attachment}/>
            )
        });


        return (<div>
            <h1>Notifications</h1>
            {visible}
        </div>);
    }
}
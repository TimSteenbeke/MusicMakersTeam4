import React, {Component} from 'react';


export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let attatchments = [];
/*        this.props.attatchments.forEach((attatchment) => {
            attatchments.push(<p classname="attatchment">attatchment.link</p>)
        });*/
        return (<div className="notification">
            <h2 className="notificationTitle">{this.props.title}</h2>
            <p className="notificationMessage">{this.props.message}</p>
            <p className="notificationInfo">{this.props.author} {this.props.date}</p>
            {attatchments}
        </div>);
    }
}

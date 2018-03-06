/**
 * Created by jariv on 27/02/2018.
 */
import React, {Component} from 'react';
import Divider from 'material-ui/Divider';



class GroupsAndChat extends Component {

    render() {
        return (

            <div className="containerCss">

                <h5 className="white-text">Users</h5>
                <ul className="collection">
                    <li className="collection-item avatar">
                        <i className="material-icons circle">chat</i>
                        <span className="title">User 1</span>
                    </li>
                </ul>
                <Divider/>

            </div>
        );
    }
}

export default GroupsAndChat;
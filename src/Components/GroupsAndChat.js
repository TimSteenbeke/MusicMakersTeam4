/**
 * Created by jariv on 27/02/2018.
 */
import React, {Component} from 'react';
import Menu from 'material-ui/Menu';
import error from '../images/error.png'
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {ListItem} from 'material-ui/List';
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
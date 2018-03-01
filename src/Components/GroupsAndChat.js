/**
 * Created by jariv on 27/02/2018.
 */
import React, {Component} from 'react';
import Menu from 'material-ui/Menu';
import error from '../images/error.png'
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};


class GroupsAndChat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Menu>
                    <section className="users">
                        <h1 className="header">Users</h1>
                        <Chip
                            style={styles.chip}
                        >

                            <ListItem
                                primaryText="test boiiii"
                                leftAvatar={<Avatar src={error}/>}
                                rightIcon={<AccountCircle />}
                            />

                        </Chip>
                    </section>
                    <Divider />
                    <section className="groups">
                        <h1 className="header">Groups</h1>
                        <Chip
                            style={styles.chip}
                        >

                            <ListItem
                                primaryText="Group 1"
                                leftAvatar={<Avatar src={error}/>}
                                rightIcon={<AccountCircle />}
                            />

                        </Chip>
                    </section>
                </Menu>
            </div>
        );
    }
}

export default GroupsAndChat;
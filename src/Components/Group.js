import React, {Component} from 'react';
import * as GroupService from '../Services/GroupService.js'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import Header from './Header'

import {black500} from 'material-ui/styles/colors';
import {Button, Dropdown, NavItem} from "react-materialize";

export default class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            selectedIndex: 0,
            selected: [],
            users: [],
        };
    }

    handleDelete = (id, e) => {
        GroupService.deleteGroup(id);
    };


 /*   setUsers(group) {
        console.log(group);
        return this.setState({users: group.users});
    }*/


    componentDidMount() {
        GroupService.getAllGroupsFromBackend().then(groups => {
            console.log(groups);
            this.setState({groups: groups});
        });
    }

    componentWillUpdate() {
        GroupService.getAllGroupsFromBackend().then(groups => {
            this.setState({groups: groups});
        });
    }

    render() {

        return (
            <div className="Homepage">
                <Header name="Groepen"/>

                <section className="containerCss">
                    <table className="black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Begeleider</th>
                            <th>Leden</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.groups.map((group, index) => (
                            <tr key={index} id={group.groupId}>
                                {/*<td><img src={"data:image;base64," + group.groupImage} alt="groepsfoto" height="50px" width="50px"/>
                                </td>*/}
                                <td>{group.name}</td>
                               {/* <td>{group.supervisor.username}</td>*/}
                                {/*       <td><Dropdown trigger={<RaisedButton onClick={this.setUsers(group)}>Klik!</RaisedButton>
                                }>
                                    {this.state.users.map((user, index2) => (
                                        <tr key={index2} id={user.userId}>
                                            <NavItem>{user.username}</NavItem>
                                        </tr>
                                    ))}
                                </Dropdown>
                                </td>*/}
                                <td>
                                    <Link className="waves-effect white-text red darken-4 btn marginator"
                                          to={`/groupupdate/${group.groupId}`}>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text red darken-4 btn"
                                       onClick={(e) => this.handleDelete(group.groupId, e)}><i
                                        className="material-icons">delete
                                    </i></a>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </section>
            </div>
        );
    }
}
import React, {Component} from 'react';
import * as GroupService from '../../Services/GroupService.js';
import {Link} from 'react-router-dom';
import Header from '../GeneralComponents/Header';
import './Groups.css';

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

    componentDidMount() {
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
                            <tr key={index} id={group.groupid}>
                                {/*<td><img src={"data:image;base64," + group.groupImage} alt="groepsfoto" height="50px" width="50px"/>
                                </td>*/}
                                <td>{group.name}</td>

                                {/*<td>{group.supervisor.firstname}</td>*/}
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
                                          to={`/groupupdate/${group.groupid}`}>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text red darken-4 btn"
                                       onClick={(e) => this.handleDelete(group.groupid, e)}><i
                                        className="material-icons">delete
                                    </i></a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link to="/addgroup" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}
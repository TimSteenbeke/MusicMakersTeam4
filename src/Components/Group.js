import React, {Component} from 'react';
import * as GroupService from '../Services/GroupService.js'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import Header from './Header'

import {black500} from 'material-ui/styles/colors';

export default class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            selectedIndex: 0,
            selected: []
        };
    }

    handleDelete = (id, e) => {
        GroupService.deleteGroup(id);
    };

    componentDidMount(){
        GroupService.getGroupsFromBackend().then(groups => {
            this.setState({groups: groups});
        });
    }

    componentWillUpdate(){
        GroupService.getGroupsFromBackend().then(groups => {
            this.setState({groups: groups});
        });
    }

    render() {

        return (
            <div className="Homepage">
                <Header name="Groepen" />

                <section className="containerCss">
                    <table className="white-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Naam</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.groups.map((group, index) => (
                            <tr key={index} id={group.groupId}>
                                <td>{group.name}</td>
                                <td>
                                    <Link className="waves-effect white-text red darken-4 btn marginator" to={`/instrumentdetails/${group.groupId}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text red darken-4 btn" onClick={(e) => this.handleDelete(group.groupId, e)}><i className="material-icons">delete
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
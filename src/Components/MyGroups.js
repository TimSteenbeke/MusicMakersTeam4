import React, {Component} from 'react';
import * as GroupService from '../Services/GroupService.js'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import Header from './Header'

import {black500} from 'material-ui/styles/colors';
import {Button, Dropdown, NavItem} from "react-materialize";

export default class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            selectedIndex: 0,
            selected: [],
            users: [],
        };
    }

    componentDidMount() {
        GroupService.getGroupsByUser().then(groups => {
            console.log(groups);
            this.setState({groups: groups});
        });
    }

    render() {

        return (
            <div className="Homepage">
                <Header name="Mijn groepen"/>
                <section className="containerCss">
                    <table className="black-text bordered responsive-table centered">
                        <colgroup>
                            <col style={{width:33}}/>
                            <col style={{width:33}}/>
                            <col style={{width:33}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th className="center">Groep</th>
                            <th className="center">Begeleider</th>
                            <th className="center">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.groups.map((group, index) => (
                            <tr key={index} id={group.groupid}>
                                <td className="center">{group.name}</td>
                                <td>{group.supervisor.firstname}</td>
                                <td>
                                    <Link className="waves-effect white-text red darken-4 btn marginator" to={`/mygroupdetails/${group.groupid}`}>Details</Link>
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
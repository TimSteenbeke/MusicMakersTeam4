import React, {Component} from 'react';
import * as GroupService from '../../Services/GroupService.js';
import {Link} from 'react-router-dom';
import Header from '../GeneralComponents/Header';
import './Groups.css';
import swal from 'sweetalert2';

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
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn red',
            cancelButtonClass: 'btn green marginator',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                GroupService.deleteGroup(id);
                swal(
                    'Verwijderd!',
                    'Groep is verwijderd.',
                    'success'
                ).then(() => {
                    this.getCourses();
                });

            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Verwijderd!',
                    'Groep is niet verwijderd.',
                    'error'
                )
            }
        });
    };

    componentDidMount() {
        console.log("MOUNTED");
        this.getCourses();
    }

    getCourses = () => {
        console.log("GET COURSES");
        GroupService.getAllGroupsFromBackend().then(groups => {
            this.setState({groups: groups});
        }, () => {
            console.log("COURSES SHOULD BE GOT");
            console.log(this.state.groups);
        });
    };

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
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.groups.map((group, index) => (
                            <tr key={index} id={group.groupid}>
                                {/*<td><img src={"data:image;base64," + group.groupImage} alt="groepsfoto" height="50px" width="50px"/>
                                </td>*/}
                                <td>{group.name}</td>

                                <td>{group.supervisor.firstname}</td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator"
                                          to={`/groupupdate/${group.groupid}`}>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn"
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
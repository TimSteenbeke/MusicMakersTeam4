import React, {Component} from 'react';
import * as UserService from '../../Services/UserService';
import {Link} from 'react-router-dom';
import Header from '../GeneralComponents/Header';
import swal from 'sweetalert2';
import './Users.css';


export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedIndex: 0,
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
                swal(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                );
                UserService.deleteUser(id);
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Cancelled',
                    'User was not deleted',
                    'error'
                )
            }
        });

    };

    getUsers() {
        UserService.getAll().then(users => {
            this.setState({users: users.users});
        });
    }

    componentWillReceiveProps() {
        this.getUsers();
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Users" />
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Voornaam</th>
                            <th>Achternaam</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map((users, index) => (
                            <tr key={index} id={users.userid}>
                                <td>{users.userid}</td>
                                <td>{users.firstname}</td>
                                <td>{users.lastname}</td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator" to={`/userdetails/${users.userid}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn" onClick={(e) => this.handleDelete(users.userid, e)}><i className="material-icons">delete
                                    </i></a>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link to="/addUser" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}


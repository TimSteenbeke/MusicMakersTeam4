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
            title: 'Ben je zeker?',
            text: "Je kan dit niet ongedaan maken!",
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Verwijderen!',
            cancelButtonText: 'Behouden'
        }).then((result) => {
            if (result.value) {
                UserService.deleteUser(id);
                swal({
                    title: "Verwijderd!",
                    text: "Gebruiker is verwijderd!",
                    type: "success"
                }).then(() => {
                    this.props.history.push("/users");
                });
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swal(
                    'Geannuleerd',
                    'Gebruiker is behouden',
                    'error'
                )
            }
        })
    };

    componentWillReceiveProps() {
        this.getUsers();
    }

    getUsers() {
        UserService.getAll().then(users => {
            this.setState({users: users.users});
        });
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Gebruikers" />
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


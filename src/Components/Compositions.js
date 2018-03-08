/**
 * Created by michiel on 25/02/2018.
 */
import React, {Component} from 'react';
import * as CompositionService from '../Services/CompositionService.js'
import Header from './Header'
import {Link} from 'react-router-dom';
import swal from 'sweetalert2'



class Compositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compositions: [],
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
                    'Composition has been deleted.',
                    'success'
                );
                CompositionService.deleteComposition(id);
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Cancelled',
                    'Composition was not deleted',
                    'error'
                )
            }
        })
    };

    componentWillUpdate(){
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    }

    componentDidMount() {
        CompositionService.getCompositionsFromBackend().then(compositions => {
            this.setState({compositions: compositions});
        });
    }

    render() {
        return (
        <div className="Homepage">
            <Header name="Composities"/>
            <section className="containerCss">
                <table className="highlight striped black-text bordered responsive-table centered">
                    <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Artiest</th>
                        <th>Taal</th>
                        <th>Genre</th>
                        <th>Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.compositions.map((composition, index) => (
                        <tr key={composition.muziekstukId} id={composition.muziekstukId}>
                            <td>{composition.titel}</td>
                            <td>{composition.artist}</td>
                            <td>{composition.language}</td>
                            <td>{composition.genre}</td>
                            <td>
                                <Link className="waves-effect white-text deep-orange darken-4 btn marginator"
                                      to={`/coursedetails/${composition.muziekstukId}` }>
                                    <i className="material-icons">edit
                                    </i>
                                </Link>
                                <a className="waves-effect white-text deep-orange darken-4 btn"
                                   onClick={(e) => this.handleDelete(composition.muziekstukId, e)}><i
                                    className="material-icons">delete
                                </i></a>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="fixed-action-btn">
                    <Link to="/addMuziekstuk" className="btn-floating btn-large deep-orange darken-4">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
            </section>
        </div>
        );
    }
}

export default Compositions;
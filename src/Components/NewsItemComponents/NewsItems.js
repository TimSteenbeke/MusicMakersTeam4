import React, {Component} from 'react';
import * as NewsItemService from '../../Services/NewsItemService';
import swal from 'sweetalert2';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import MomentJs from "moment";

export default class Compositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsitems: [],
            selectedIndex: 0,
            selected: [],
            openDetails: false,
            openUpdate: false,
            search: ""
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
                    'Melding is verwijderd.',
                    'success'
                );
                //DELETEMETHOD
                NewsItemService.deleteNewsItem(id);
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
        });
    };

    componentDidMount() {
        this.getNewsItem();
    }

    getNewsItem(){
        NewsItemService.getNewsItemsFromBackend().then(newsitems => {
            console.log(newsitems)
            this.setState({newsitems: newsitems});
        });
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Meldingen"/>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Geplaats door</th>
                            <th>Melding</th>
                            <th>Groep</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.newsitems.map((item, index) => (
                            <tr key={index} id={item.newsItemId}>
                                <td>{ MomentJs(item.date).utc().format('YYYY-MM-DD')}</td>
                                <td>{item.editor}</td>
                                <td>{item.title}</td>
                                <td></td>
                                <td>
                                    <div className="row">
                                        <div className="col s6 m6 l6">
                                            <Link className="waves-effect white-text deep-orange darken-4 btn"
                                                  to={`/updatenewsitem/${item.newsItemId}`}>
                                                <i className="material-icons">edit</i>
                                            </Link></div>
                                        <div className="col s6 m6 l6">
                                            <a className="waves-effect white-text deep-orange darken-4 btn"
                                               onClick={(e) => this.handleDelete(item.newsItemId, e)}>
                                                <i className="material-icons">delete
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link to="/addNewsItem" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}
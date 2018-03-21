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
            title: 'Ben je zeker?',
            text: "Je kan dit niet ongedaan maken!",
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Verwijderen!',
            cancelButtonText: 'Behouden'
        }).then((result) => {
            if (result.value) {
                NewsItemService.deleteNewsItem(id);
                swal({
                    title: "Verwijderd!",
                    text: "Melding is verwijderd!",
                    type: "success"
                }).then(() => {
                    this.props.history.push("/newsitems");
                });
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swal(
                    'Gestopt',
                    'Item is behouden',
                    'error'
                )
            }
        })
    };

    componentDidMount() {
        this.getNewsItem();
    }

    getNewsItem(){
        NewsItemService.getNewsItemsFromBackend().then(newsitems => {
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
                            <th>Opties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.newsitems.map((item, index) => (
                            <tr key={index} id={item.newsItemId}>
                                <td>{ MomentJs(item.date).utc().format('YYYY-MM-DD')}</td>
                                <td>{item.editor}</td>
                                <td>{item.title}</td>
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
import React, {Component} from 'react';
import Header from '../GeneralComponents/Header';
import StyledTextField from '../GeneralComponents/StyledTextField';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import * as CourseTypeService from "../../Services/CourseTypeService";
import './AddCourseType.css';

export default class AddCourseType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soorten: [],
            typedPrice: "",
            typedDescription: "",
            typedVersion: "",
        };
    }

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Cursus type toegevoegd!',
            showConfirmButton: false,
            timer: 1500
        });
        CourseTypeService.postCourseType(JSON.stringify(
            {
                price: this.state.typedPrice,
                description: this.state.typedDescription
            }
        ));
            this.props.history.push('/coursetype');

    };

    componentDidMount() {

    }

    onChangePrice = (e) => {
        this.setState({typedPrice: e.target.value});
    };

    onChangeDescription = (e) => {
        this.setState({typedDescription:  e.target.value});
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        return (
            <div className="Homepage">

                <Header name="Cursus type toevoegen"/>
                <section className="containerCss">
                            <div className="card hoverable">
                                <div className="card-content">
                                    <form className="addcoursetype" action="/" method="POST" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5 className="truncate">beschrijving</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangeDescription} placeholder="Geef een beschrijving in..." label="beschrijving"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5 className="truncate">prijs</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangePrice} placeholder="Geef een prijs in..." label="prijs"/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-action">
                                    <Link to="/coursetypes" onClick={this.handleClick}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                        <i
                                            className="material-icons">done</i>
                                    </Link>
                                </div>
                            </div>

                </section>
            </div>
        );
    }
}
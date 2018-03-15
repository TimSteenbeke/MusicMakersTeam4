
import React, {Component} from 'react';
import Header from './Header'
import StyledTextField from './StyledTextField'
import {Link} from 'react-router-dom';
import swal from 'sweetalert2'
import * as CourseTypeService from "../Services/CourseTypeService";
import {black500, deepOrangeA700, grey500} from "material-ui/styles/colors";


class AddCourseType extends Component {

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
            title: 'CourseType Added!',
            showConfirmButton: false,
            timer: 1500
        });
        CourseTypeService.postCourseType(JSON.stringify(
            {
                price: this.state.typedPrice,
                description: this.state.typedDescription
            }
        ));
    };

    componentDidMount() {

    }

    onChangePrice = (e) => {
        this.setState({typedPrice: e.target.value});
        console.log("Price:" + e.target.value)
    };

    onChangeDescription = (e) => {
        this.setState({typedDescription:  e.target.value});
        console.log("Description:" + e.target.value)
    };

    handleChange = (event, value) => {
        this.setState({value});
        console.log(value)
    };

    render() {
        return (

            <div className="Homepage">
                <Header name="Add CourseType"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable">
                                <div className="card-content">
                                    <form className="addcoursetype" action="/" method="POST" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>beschrijving</h5>
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
                                                    <h5>price</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <StyledTextField onChange={this.onChangePrice} placeholder="Geef een prijs in..." label="prijs"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
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
                        </div>
                        <div className="col s0 m2 l2"/>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddCourseType;
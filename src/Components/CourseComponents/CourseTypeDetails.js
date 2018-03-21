import React, {Component} from 'react';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import * as CourseTypeService from "../../Services/CourseTypeService";
import './CourseTypeDetails.css';

export default class CourseTypeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseTypeId: this.props.match.params.id,
            price:"",
            description:""
        };
    }

    componentDidMount() {
        let self = this;
        CourseTypeService.getCourseTypeFromBackend(self.state.courseTypeId)
            .then(courseType => {
                self.setState({
                    courseTypeId: courseType.courseTypeId,
                    description: courseType.description,
                    price: courseType.price

                });
            }).catch((error) => {
            console.log(error);
        });
    }

    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Instrument Edited',
            showConfirmButton: false,
            timer: 1500
        });
        let self = this;
        CourseTypeService.UpdateCourseType(self.state.courseTypeId, JSON.stringify(
            {
                courseTypeId: self.state.courseTypeId,
                description: self.state.description,
                price: self.state.price
            }
        ));
    };

    setDescription = event => {
        let value = event.target.value;
        return this.setState({description: value})
    };
    setPrice = event => {
        let value = event.target.value;
        return this.setState({price: value})
    };



    render() {
        return ( <div className="Homepage">
                <Header name={this.state.description}/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable z-depth-3">
                                <div className="card-content">
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Beschrijving</label>
                                                <input type="text" value={this.state.description} onChange={this.setDescription} placeholder="Geef een beschrijving in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Prijs</label>
                                                <input type="text" value={this.state.price} onChange={this.setPrice} placeholder="Geef een prijs in.."/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <Link to="/coursetypes" onClick={this.handleUpdate}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse"><i
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

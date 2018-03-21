import React, {Component} from "react";
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as LesService from "../../Services/LesService";
import swal from "sweetalert2";
import Header from '../GeneralComponents/Header';
import './AddLesson.css';
import {Link} from 'react-router-dom';


const addSubtractDate = require("add-subtract-date");


export default class PerformanceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonid: this.props.match.params.id,
            myCourses: [],
            minDate: new Date(),
            chosenDate: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            course: {},
            selectedStartDate: new Date(),
            selectedEndDate: new Date()

        }
    }

    componentDidMount() {
        let self = this;
        LesService.getLesson(self.state.lessonid)
            .then(lesson => {
                self.setState({
                    selectedStartDate: lesson.startdatetime,
                    selectedEndDate: lesson.enddatetime,
                    course: lesson.course,

                });
            }).catch((error) => {
            console.log(error);
        });

    }

    updateLesson = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Les toegevoegd',
            showConfirmButton: false,
            timer: 1500
        });

        LesService.updateLesson(this.props.lessonid, JSON.stringify(
            {
                courseid: this.state.selectedCourseId,
                enddatetime: this.state.selectedEndDate.toISOString().replace('Z', ''),
                startdatetime: this.state.selectedStartDate.toISOString().replace('Z', '')
            }
        ));

    };

    choosedate = (event, date) => {
        this.setState({chosenDate: date},
            () => {
                this.updateStartAndEndDate()
            });

    };

    chooseBeginHour = (event, date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let newBeginHour = addSubtractDate.add(new Date(this.state.chosenDate), hours + 1, "hours");
        newBeginHour = addSubtractDate.add(newBeginHour, minutes, "minutes");

        this.setState({selectedStartDate: newBeginHour});
    };

    chooseEndHour = (event, date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let newendhour = addSubtractDate.add(new Date(this.state.chosenDate), hours + 1, "hours");
        newendhour = addSubtractDate.add(newendhour, minutes, "minutes");
        this.setState({selectedEndDate: newendhour});

    };

    updateStartAndEndDate() {
        let beginHours = this.state.selectedStartDate.getHours();
        let beginMinutes = this.state.selectedStartDate.getMinutes();
        let newBeginHour = addSubtractDate.add(new Date(this.state.chosenDate), beginHours, "hours");
        newBeginHour = addSubtractDate.add(newBeginHour, beginMinutes, "minutes");
        this.setState({selectedStartDate: newBeginHour});

        //Do the same for enddate
        let endHours = this.state.selectedEndDate.getHours();
        let endMinutes = this.state.selectedEndDate.getMinutes();
        let newEndHour = addSubtractDate.add(new Date(this.state.chosenDate), endHours, "hours");
        newEndHour = addSubtractDate.add(newEndHour, endMinutes, "minutes");
        this.setState({selectedEndDate: newEndHour});
    }


    render() {
        return (
            <div className="Homepage">
                <Header name="Les Details"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable z-depth-3">
                                <div className="card-content">
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5>{this.state.chosenDate.toDateString()}</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}}
                                                            hintText="Lesdatum" container="inline"
                                                            minDate={this.state.minDate}
                                                            disableYearSelection={this.state.disableYearSelection}
                                                            onChange={this.choosedate}/></div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">

                                            <div className="col s3 m3 l3">
                                                <h5>{this.state.selectedStartDate.toDateString()}</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <TimePicker
                                                    textFieldStyle={{width: '100%'}}
                                                    format="24hr"
                                                    hintText="Beginuur"
                                                    onChange={this.chooseBeginHour}
                                                /></div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">

                                            <div className="col s3 m3 l3">
                                                <h5>{this.state.selectedEndDate.toDateString()}</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <TimePicker
                                                    textFieldStyle={{width: '100%'}}
                                                    format="24hr"
                                                    hintText="Einduur"
                                                    onChange={this.chooseEndHour}
                                                /></div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-action">
                                    <Link to="/lessons" onClick={this.updateLesson}
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


import React, {Component} from "react";
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as LesService from "../../Services/LesService";
import swal from "sweetalert2";
import Header from '../GeneralComponents/Header';
import './AddLesson.css';
import {Link} from 'react-router-dom';

const addSubtractDate = require("add-subtract-date");


class LessonDetails extends Component {
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
            selectedEndDate: new Date(),
            currentStartDate: new Date(),
            currentEndDate: new Date()
        }
    }

    componentDidMount() {
        let self = this;
        LesService.getLesson(self.state.lessonid)
            .then(lesson => {
                console.log(lesson);
                console.log(self.state.lessonid);
                self.setState({
                    course: lesson.course,
                    currentStartDate: lesson.startdatetime,
                    currentEndDate: lesson.enddatetime

                });
            }).catch((error) => {
            console.log(error);
        });

    }

    updateLesson = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Les aangepast!',
            showConfirmButton: false,
            timer: 1500
        });
        console.log(this.state.lessonid);
        LesService.updateLesson(this.state.lessonid, JSON.stringify(

            {
                courseid: this.state.course.courseId,
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
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable z-depth-3">
                                <div className="card-content">
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5 className="truncate">Datum</h5>
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
                                                <h5 className="truncate">Begindatum</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <p>Huidige startdatum: {this.state.currentStartDate.toString()}</p>
                                                <div className="divider"></div>
                                                <TimePicker
                                                    textFieldStyle={{width: '100%'}}
                                                    format="24hr"
                                                    hintText="Beginuur"
                                                    onChange={this.chooseBeginHour}
                                                /></div>
                                        </div>
                                    </div>

                                    <div className="section">
                                        <div className="row">

                                            <div className="col s3 m3 l3">
                                                <h5 className="truncate">Einddatum</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <p>Huidige einddatum: {this.state.currentEndDate.toString()}</p>
                                                <div className="divider"></div>
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
                </section>
            </div>
        );
    }


}

export default LessonDetails;
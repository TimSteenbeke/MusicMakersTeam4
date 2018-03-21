import React, {Component} from "react";
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as PerformanceService from '../../Services/PerformanceService';
import swal from "sweetalert2";
import Header from '../GeneralComponents/Header';
import './AddPerformance.css';
import {Link} from 'react-router-dom';
import * as momentjs from 'moment';


const addSubtractDate = require("add-subtract-date");


export default class PerformanceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performanceId: this.props.match.params.id,
            minDate: new Date(),
            chosenDate: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            group: {},
            selectedStartDate: new Date(),
            selectedEndDate: new Date()

        }
    }

    componentDidMount() {
        let self = this;
        PerformanceService.getPerformance(self.state.performanceId)
            .then(performance => {
                self.setState({
                    selectedStartDate: new Date(performance.startdatetime),
                    selectedEndDate: new Date(performance.enddatetime),
                    group: performance.group,

                });
            }).catch((error) => {
            console.log(error);
        });

    }

    updatePerformance = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'optreden aangepast',
            showConfirmButton: false,
            timer: 1500
        });

        PerformanceService.updatePerformance(this.props.performanceId, JSON.stringify(
            {
                groupId: this.state.selectedGroupId,
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
        let chosenDate = this.state.chosenDate.toDateString();
        let selectedStartDate = this.state.selectedStartDate.toDateString();
        let selectedEndDate = this.state.selectedEndDate.toDateString();
        return (
            <div className="Homepage">
                <Header name="Optreden Detais"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable z-depth-3">
                                <div className="card-content">
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5>{chosenDate}</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}}
                                                            hintText="Optredendatum" container="inline"
                                                            minDate={this.state.minDate}
                                                            disableYearSelection={this.state.disableYearSelection}
                                                            onChange={this.choosedate}/></div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">

                                            <div className="col s3 m3 l3">
                                                <h5>{selectedStartDate}</h5>
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
                                                <h5>{selectedEndDate}</h5>
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
                                    <Link to="/performance" onClick={this.updatePerformance}
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


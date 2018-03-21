import React, {Component} from "react";
import {Row, Input} from 'react-materialize'
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as LesService from "../../Services/LesService";
import * as CourseService from '../../Services/CourseService'
import swal from "sweetalert2";
import Header from '../GeneralComponents/Header';
import './AddLesson.css';


const addSubtractDate = require("add-subtract-date");


export default class AddLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myCourses: [],

            minDate: new Date(),

            chosenDate: new Date(),
            startDate: new Date(),
            endDate : new Date(),

            //Resource fields to POST
            selectedCourseId: 0,
            selectedStartDate: new Date(),
            selectedEndDate: new Date()

        }
    }

    componentDidMount() {
      CourseService.getMyCourses().then(courses => {
          this.setState({myCourses: courses.teachesCourses});
      })

    }

    addLesson = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Les toegevoegd',
            showConfirmButton: false,
            timer: 1500
        });

        LesService.postLesson(JSON.stringify(
            {
                courseid: this.state.selectedCourseId,
                enddatetime: this.state.selectedEndDate.toISOString().replace('Z', ''),
                startdatetime: this.state.selectedStartDate.toISOString().replace('Z', '')
            }
        ));

    };

    choosedate = (event, date) => {
        this.setState({chosenDate: date},
            () => {this.updateStartAndEndDate()});
    };

    chooseBeginHour = (event,date) => {
        let hours = date.getHours();
        let minutes= date.getMinutes();

        let newBeginHour =  addSubtractDate.add(new Date(this.state.chosenDate),hours +1,"hours");
        newBeginHour = addSubtractDate.add(newBeginHour,minutes,"minutes");
        this.setState({selectedStartDate: newBeginHour});
    };

    chooseEndHour = (event,date) => {
        let hours = date.getHours();
        let minutes= date.getMinutes();
        let newendhour =  addSubtractDate.add(new Date(this.state.chosenDate),hours +1,"hours");
        newendhour = addSubtractDate.add(newendhour,minutes,"minutes");
        this.setState({selectedEndDate: newendhour});

    };

    updateStartAndEndDate() {
        let beginHours = this.state.selectedStartDate.getHours();
        let beginMinutes = this.state.selectedStartDate.getMinutes();
        let newBeginHour = addSubtractDate.add(new Date(this.state.chosenDate),beginHours,"hours");
        newBeginHour = addSubtractDate.add(newBeginHour,beginMinutes,"minutes");
        this.setState({selectedStartDate: newBeginHour});

        //Do the same for enddate
        let endHours = this.state.selectedEndDate.getHours();
        let endMinutes = this.state.selectedEndDate.getMinutes();
        let newEndHour = addSubtractDate.add(new Date(this.state.chosenDate),endHours,"hours");
        newEndHour = addSubtractDate.add(newEndHour,endMinutes,"minutes");
        this.setState({selectedEndDate: newEndHour});
    }

    handleCourseChange = (e,value) => {
        this.setState({selectedCourseId: value});
    };


    render() {
        return (
            <div className="Homepage">
                <Header name="Les toevoegen"/>
                <div className="paddingnator">
                    <Row>
                        <Input s={12} multiple={false} type='select'
                               onChange={this.handleCourseChange}
                               label="Vakken" defaultValue='1'>
                            <option key="" value="" disabled>Kies de cursus
                            </option>
                            {this.state.myCourses.map((course, index) => (
                                <option key={course.courseId}
                                        value={course.courseId}>{course.courseType.description}</option>
                            ))}
                        </Input>
                    </Row>
                </div>
                <div className="divider"></div>
                <div className="row paddingnator">
                    <div className="col s8">
                <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}} hintText="Lesdatum"  container="inline"   minDate={this.state.minDate}   disableYearSelection={this.state.disableYearSelection}
                            onChange={this.choosedate}/>
                <TimePicker
                    textFieldStyle={{width: '100%'}}
                    format="24hr"
                    hintText="Beginuur"
                    onChange={this.chooseBeginHour}
                />
                <TimePicker
                    textFieldStyle={{width: '100%'}}
                    format="24hr"
                    hintText="Einduur"
                    onChange={this.chooseEndHour}
                />
                    </div>
                    <div className="col s4">
                        <div className="">
                            <a className="addLessonBtn waves-effect deep-orange darken-4 waves-light btn"
                               onClick={this.addLesson}>Voeg les toe</a>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>

            </div>
        );
    }


}

export default AddLesson;
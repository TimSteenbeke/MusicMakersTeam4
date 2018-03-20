import React, {Component} from "react";
import {Row, Input} from 'react-materialize'
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as LesService from "../../Services/LesService";
import swal from "sweetalert2";


const addSubtractDate = require("add-subtract-date");


class AddLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minDate: new Date(),

            chosenDate: new Date(),
            startDate: new Date(),
            endDate : new Date(),

            //Resource fields to POST
            selectedCourseId: 1,
            selectedStartDate: new Date(),
            selectedEndDate: new Date()

        }
    }

    componentDidMount() {
        //TODO: ajax call to load all courses for logged in user

    }

    addLesson = () => {
        console.log('adding lesson');
        console.log(this.state.selectedCourseId);
        console.log(this.state.selectedStartDate);
        console.log(this.state.selectedEndDate);

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
        console.log('datum gekozen');
        console.log(date);

        this.setState({chosenDate: date},
            () => {this.updateStartAndEndDate()});

    };

    chooseBeginHour = (event,date) => {
        var hours = date.getHours();
        var minutes= date.getMinutes();

        var newBeginHour =  addSubtractDate.add(new Date(this.state.chosenDate),hours +1,"hours");
        newBeginHour = addSubtractDate.add(newBeginHour,minutes,"minutes");
        console.log(newBeginHour);

        this.setState({selectedStartDate: newBeginHour});
    };

    chooseEndHour = (event,date) => {
        var hours = date.getHours();
        var minutes= date.getMinutes();
        var newendhour =  addSubtractDate.add(new Date(this.state.chosenDate),hours +1,"hours");
        newendhour = addSubtractDate.add(newendhour,minutes,"minutes");
        console.log(newendhour);
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


    render() {
        return (
            <div>Add lesson component
                <DatePicker hintText="Lesdatum"  container="inline"   minDate={this.state.minDate}   disableYearSelection={this.state.disableYearSelection}
                            onChange={this.choosedate}/>
                <TimePicker
                    format="24hr"
                    hintText="Beginuur"
                    onChange={this.chooseBeginHour}
                />
                <TimePicker
                    format="24hr"
                    hintText="Einduur"
                    onChange={this.chooseEndHour}
                />
                <button onClick={this.addLesson}>Voeg les toe</button>
            </div>
        );
    }


}

export default AddLesson;
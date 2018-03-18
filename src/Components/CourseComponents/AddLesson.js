import React, {Component} from "react";
import {Row, Input} from 'react-materialize'
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';





class AddLesson extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        return (
            <div>Add lesson component
                <DatePicker hintText="Portrait Dialog" />
                <TimePicker
                    format="24hr"
                    hintText="24hr Format"
                />
            </div>

        );
    }


}

export default AddLesson;
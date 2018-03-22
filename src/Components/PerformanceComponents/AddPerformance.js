import React, {Component} from "react";
import {Row, Input} from 'react-materialize'
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as GroupService from '../../Services/GroupService';
import * as PerformanceService from '../../Services/PerformanceService';
import swal from "sweetalert2";
import Header from '../GeneralComponents/Header';
import './AddPerformance.css';
import StyledTextField from "../GeneralComponents/StyledTextField";


const addSubtractDate = require("add-subtract-date");


export default class AddPerformance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],

            minDate: new Date(),

            chosenDate: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            description: "",

            //Resource fields to POST
            selectedGroupId: 0,
            selectedStartDate: new Date(),
            selectedEndDate: new Date()

        }
    }

    componentDidMount() {
        this.addGroups();

    }
    addGroups = () => {
        let self = this;
        GroupService.getAllGroupsFromBackend().then((value) => {
            let groups = value;
            console.log(groups);
            self.setState({groups: groups});
        });
    };

    addPerformance = () => {
        let group = 0;
        swal({
            position: 'top-end',
            type: 'success',
            title: 'optreden toegevoegd',
            showConfirmButton: false,
            timer: 1500
        });
        if (this.state.selectedGroupId !== 999) {
            group = this.state.selectedGroupId;
        }
        PerformanceService.postPerformance(JSON.stringify(
            {
                group: group,
                enddatetime: this.state.selectedEndDate.toISOString().replace('Z', ''),
                startdatetime: this.state.selectedStartDate.toISOString().replace('Z', ''),
                description: this.state.description
            }
        ));

        this.props.history.push("/performance");


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

    handleGroupChange = (e, value) => {
        this.setState({selectedGroupId: value});
    };

    setText = (e) => {
        this.setState({
            description: e.target.value,
        });
    };


    render() {
        return (
            <div className="Homepage">
                <Header name="Voeg optreden toe"/>
                <div className="paddingnator">
                    <Row>
                        <Input s={12} multiple={false} type='select'
                               onChange={this.handleGroupChange}
                               label="groepen" defaultValue='1'>
                            <option key="" value="" disabled>Kies een groep
                            </option>
                            <option key={999} value={999}>Eigen optreden</option>
                            {this.state.groups.map((group, index) => (
                                <option key={group.groupid}
                                        value={group.groupid}>{group.name}</option>
                            ))}
                        </Input>
                    </Row>
                    <Row>
                        <StyledTextField
                            required={true}
                            onChange={this.setText}
                            label="Beschrijving"
                            value={this.state.description}
                        />
                    </Row>
                </div>
                <div className="divider"></div>
                <div className="row paddingnator">
                    <div className="col s8">
                        <DatePicker textFieldStyle={{width: '100%', hintStyle: '#000000'}} hintText="optredendatum"
                                    container="inline" minDate={this.state.minDate}
                                    disableYearSelection={this.state.disableYearSelection}
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
                            <a className="addPerformanceBtn waves-effect deep-orange darken-4 waves-light btn"
                               onClick={this.addPerformance}>Voeg optreden toe</a>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>

            </div>
        );
    }


}
/**
 * Created by Ben on 27/02/2018.
 */
import React, {Component} from 'react';
import * as CourseService from '../Services/CourseService'
import InstrumentDetails from './InstrumentDetails.js'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            selectedIndex: 0,
            open: false,
            visible: "hidden"
        }

        ;
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
     this.getCourses();
    }

    getCourses() {
        CourseService.getCoursesFromBackend().then(courses => {
            this.setState({courses: courses});
        });
    }


    handleCellClick = (rowNumber) => {
        this.setState({
            selectedIndex: this.state.courses[rowNumber].instrumentId
        });
        console.log("Selected Row: " + this.state.selectedIndex);
        this.handleOpen();
    };


    render() {
        const actions = [
            <RaisedButton label="Okay" onClick={this.handleClose} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>
        ];

        return (
            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Courses</h1>
                        <Table onCellClick={this.handleCellClick} selectable={false}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Course</TableHeaderColumn>
                                    <TableHeaderColumn>prijs</TableHeaderColumn>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.courses.map((course, index) => (
                                    <TableRow key={course.courseid}>
                                        <TableRowColumn>{course.beschrijving}</TableRowColumn>
                                        <TableRowColumn>{course.prijs}</TableRowColumn>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <InstrumentDetails
                        id={(this.state.selectedIndex)}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Courses;

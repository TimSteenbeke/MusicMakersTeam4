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

const styles = {
    exampleImageInput: {
        margin: 10,
    }
}

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            selectedIndex: 0,
            open: false,
            visible: "hidden"
        };



    }


    componentDidMount() {
     this.getCourses();

    }

    getCourses() {
        CourseService.getCoursesFromBackend().then(courses => {
            this.setState({courses: courses});
        });
    }

    handleDelete = () => {
        CourseService.deleteCourse(this.state.selectedIndex);
    }


   klikmaar(courseId) {
        console.log(courseId);
        this.setState({selectedIndex:courseId});
   }

   zeghallo() {
        console.log('hallo');
   }

   getCourseIdFromTableRow(row) {
        console.log(row);
        console.log(this.state.courses[row].courseId);
        this.setState({selectedIndex: this.state.courses[row].courseId});

   }



    handleCloseUpdate = (row) => {
        this.setState({openUpdate: false});
    };

    render() {
        return (
            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Courses</h1>
                        <Table selectable={true} onCellClick={ (rownr) => { this.getCourseIdFromTableRow(rownr)}}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Course</TableHeaderColumn>
                                    <TableHeaderColumn>prijs</TableHeaderColumn>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.courses.map((course) => (
                                    <TableRow key={course.courseid}>
                                        <TableRowColumn>{course.beschrijving}</TableRowColumn>
                                        <TableRowColumn>{course.prijs}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Delete"  style={styles.exampleImageInput}  onClick={this.handleDelete} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                    </div>
                </section>
            </div>
        );
    }
}

export default Courses;

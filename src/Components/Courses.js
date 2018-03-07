

/**
 * Created by Ben on 27/02/2018.
 */
import React, {Component} from 'react';
import * as CourseService from '../Services/CourseService'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CoursesUpdate from './CoursesUpdate.js'
import Header from './Header'


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";

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
            selected: [],
            openUpdate: false,
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

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    handleCellClick = (rowNumber) => {
        var self = this;

        this.setState({
            selectedIndex: this.state.courses[rowNumber].courseId
        });

        setTimeout(function () {
            console.log(console.log("Selected Row: " + self.state.selectedIndex));
        }, 1000);

    };

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleOpenUpdate = () => {
        this.setState({openUpdate: true});
    };

    handleCloseUpdate = () => {
        this.setState({openUpdate: false});
    };

    handleDelete = () => {
        CourseService.deleteCourse(this.state.selectedIndex);
    };


    componentWillReceiveProps(){
        CourseService.getCoursesFromBackend().then(courses => {
            this.setState({courses: courses});
        });
    }


    render() {

        const actionsUpdate = [
            <RaisedButton label="Close" onClick={this.handleCloseUpdate} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>,
        ];
        return (
            <div className="Homepage">
                <Header name="Courses"/>
                <section className="containerCss">
                    <div className="whiteBox">
                        <Table onRowSelection={this.handleRowSelection} onCellClick={this.handleCellClick}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Id</TableHeaderColumn>
                                    <TableHeaderColumn>Course</TableHeaderColumn>
                                    <TableHeaderColumn>prijs</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {this.state.courses.map((course, index) => (
                                    <TableRow selected={this.isSelected(index)} key={course.courseId}>
                                        <TableRowColumn>{course.courseId}</TableRowColumn>
                                        <TableRowColumn>{course.beschrijving}</TableRowColumn>
                                        <TableRowColumn>{course.prijs}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Delete"  style={styles.exampleImageInput}  onClick={this.handleDelete} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                        <RaisedButton label="Update"  style={styles.exampleImageInput}  onClick={this.handleOpenUpdate} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
                    </div>
                </section>
                <Dialog
                    actions={actionsUpdate}
                    modal={false}
                    open={this.state.openUpdate}
                    onRequestClose={this.handleCloseUpdate}
                    autoScrollBodyContent={true}
                >
                    <CoursesUpdate
                        id={(this.state.selectedIndex)}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Courses;

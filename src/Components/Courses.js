

/**
 * Created by Ben on 27/02/2018.
 */
import React, {Component} from 'react';
import * as CourseService from '../Services/CourseService'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CoursesUpdate from './CoursesUpdate.js'
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
<<<<<<< HEAD
            selected: [],
            openUpdate: false,
        }
=======
            open: false,
            visible: "hidden"
        };
>>>>>>> af1cfcd08a926307ad91ba9364e432cd6c6244ba



    }


    componentDidMount() {
     this.getCourses();

    }

    getCourses() {
        CourseService.getCoursesFromBackend().then(courses => {
            this.setState({courses: courses});
        });
    }

<<<<<<< HEAD
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


    componentWillUpdate(){
        CourseService.getCoursesFromBackend().then(courses => {
            this.setState({courses: courses});
        });
    }


    render() {

        const actionsUpdate = [
            <RaisedButton label="Close" onClick={this.handleCloseUpdate} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>,
        ];
=======
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

>>>>>>> af1cfcd08a926307ad91ba9364e432cd6c6244ba


    handleCloseUpdate = (row) => {
        this.setState({openUpdate: false});
    };

    render() {
        return (
            <div className="Homepage">
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Courses</h1>
<<<<<<< HEAD
                        <Table onRowSelection={this.handleRowSelection} onCellClick={this.handleCellClick}>
=======
                        <Table selectable={true} onCellClick={ (rownr) => { this.getCourseIdFromTableRow(rownr)}}>
>>>>>>> af1cfcd08a926307ad91ba9364e432cd6c6244ba
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Id</TableHeaderColumn>
                                    <TableHeaderColumn>Course</TableHeaderColumn>
                                    <TableHeaderColumn>prijs</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
<<<<<<< HEAD
                                {this.state.courses.map((course, index) => (
                                    <TableRow selected={this.isSelected(index)} key={course.courseId}>
                                        <TableRowColumn>{course.courseId}</TableRowColumn>
=======
                                {this.state.courses.map((course) => (
                                    <TableRow key={course.courseid}>
>>>>>>> af1cfcd08a926307ad91ba9364e432cd6c6244ba
                                        <TableRowColumn>{course.beschrijving}</TableRowColumn>
                                        <TableRowColumn>{course.prijs}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Delete"  style={styles.exampleImageInput}  onClick={this.handleDelete} backgroundColor="#DD2C00"
                                      labelColor="#FFEBEE"/>
<<<<<<< HEAD
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
=======
                    </div>
                </section>
>>>>>>> af1cfcd08a926307ad91ba9364e432cd6c6244ba
            </div>
        );
    }
}

export default Courses;

/**
 * Created by jariv on 28/02/2018.
 */
/**
 * Created by jariv on 9/02/2018.
 */

import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as CourseService from '../Services/CourseService'


const styles = {
    width: {
        width: "90%",
    },
    loginButton: {
        boxShadow: "2px 2px 5px #616161",
        margin: 12,
    },
    errorStyle: {
        color: deepOrangeA700,

    },
    underlineStyle: {
        borderColor: deepOrangeA700,
    },
    inputstyle: {
        color: black500,
    },
    floatingLabelStyle: {
        color: black500,
    },
    floatingLabelFocusStyle: {
        color: grey500,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};


class InstrumentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {
                coursebeschrijving: "string",
                prijs: 0,
                studentids: [0],
                teacherids: [0],

            }
            ,
            open: false,
        }
    }

    onChangeType = (event, typedType) => {
        let course = Object.assign({}, this.state.course);
        course.coursebeschrijving = typedType;
        this.setState({course});
        console.log("coursebeschrijving:" + this.state.course.coursebeschrijving)
    };

    handleUpdate = () => {
        var self = this;
        CourseService.updateCourse(this.props.id, JSON.stringify(
            {
                coursebeschrijving: self.state.course.coursebeschrijving,
                prijs: self.state.course.prijs,
                teacherids: self.state.course.studentids,
                studentids: self.state.course.teacherids
            }
        ));
        console.log("coursebeschrijving: " +  self.state.course.coursebeschrijving);
        console.log("prijs: " + self.state.course.prijs);
        console.log("studentids: " + self.state.course.studentids);
        console.log("teacherids: " + self.state.course.teacherids);
    };

    render() {
        return (
            <div >

                <h1 className="header">Details</h1>
                <Card expanded={true}>
                    <CardHeader
                        title={this.props.id}
                    />
                    <CardText>
                        <div className="InstrumentDetail">
                            <div id="instrumentDetails">
                                <List>
                                    <ListItem>
                                        <TextField
                                            onChange={this.onChangeType}
                                            hintText="Geef nieuwe beschrijving in..."
                                            floatingLabelText="beschrijving"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        />
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Update" onClick={this.handleUpdate}/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default InstrumentDetails;

import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import * as GroupService from '../Services/GroupService.js'
import {List, ListItem} from 'material-ui/List';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import swal from 'sweetalert2'

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


export default class GroupUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            group: {
                groupId: this.props.match.params.id,
                name: "string",
                supervisorid: 1,
                supervisorname: ""
            },
            open: false
        }
    }

    componentDidMount() {
        const self = this;
        GroupService.getGroupFromBackend(self.state.groupId)
            .then(console.log("----Groep met id " + self.state.groupId + "---- \n"))
            .then(group => self.setState({
                groupId: group.groupId,
                name: group.name,
                supervisorid: group.supervisor.id,
                supervisorname: group.supervisor.username
            }, console.log(group)))
    }

    onChangeName = (event, typedName) => {
        let group = Object.assign({}, this.state.group);
        group.name = typedName;
        this.setState({group});
        console.log("Name:" + this.state.group.name)
    };

    onChangeSupervisor = (event, typedSupervisor) => {
        let group = Object.assign({}, this.state.group);
        group.supervisor = typedSupervisor;
        this.setState({group});
        console.log("Name:" + this.state.supervisorname)
    };

    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Instrument Edited',
            showConfirmButton: false,
            timer: 1500
        });
        let self = this;
        GroupService.updateGroup(self.state.groupId, JSON.stringify(
            {
                name: self.state.name,
                supervisorid: self.state.supervisorid,
            }
        ));
        console.log("groupId: " + self.state.groupId);
        console.log("groepsnaam: " + self.state.name);
        console.log("supervisorid: " + self.state.supervisorid);
        console.log("supervisornaam: " + self.state.supervisorname);
    };

    render() {
        return (
            <div>

                <h1 className="header">Groep details</h1>
                <Card expanded={true}>
                    <CardHeader
                        title={this.state.name}
                    />
                    <CardText>
                        <div className="InstrumentDetail">
                            <div id="instrumentDetails">
                                <List>
                                    <ListItem>
                                        <TextField
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                            hintText="Geef nieuwe groepsnaam in..."
                                            floatingLabelText="Naam"
                                            style={styles.width}
                                            inputStyle={styles.inputstyle}
                                            hintStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                        /><br/>
                                        <TextField
                                            value={this.state.supervisorname}
                                            onChange={this.onChangeSupervisor}
                                            hintText="Geef begeleider in..."
                                            floatingLabelText="Begeleider"
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
import React, {Component} from 'react';
import * as GroupService from '../Services/GroupService.js'
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import EditGroup from "./EditGroup";

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

var keyy;
var key;

export default class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [{
                groupName: "groep1",
                begeleider: "begeleider1",
                aantalLeden: 5
            }, {
                groupName: "groep2",
                begeleider: "begeleider2",
                aantalLeden: 3
            }],
            key: []
        };
    }
/*
    componentDidMount() {
       GroupService.getGroupsFromBackend().then(groups => {
           this.setState({groups: groups});
        });
    }*/

static _onRowSelection(key){
    keyy = key
}

static editSelectedGroup(key){

}

    render() {
        return <div className="Homepage">
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Groepen</h1>
                    <Table onRowSelection={this.key}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Naam</TableHeaderColumn>
                                <TableHeaderColumn>Begeleider</TableHeaderColumn>
                                <TableHeaderColumn>Aantal leden</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.state.groups.map((group, i) => (
                                <TableRow key={i}>
                                    <TableRowColumn>{group.groupName}</TableRowColumn>
                                    <TableRowColumn>{group.begeleider}</TableRowColumn>
                                    <TableRowColumn>{group.aantalLeden}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <RaisedButton label="Groep aanpassen" linkButton={true} href={/editGroup/ + keyy} backgroundColor="#DD2C00"
                                  style={styles.loginButton}
                                  labelColor="#FFEBEE"
                                  className="inputGroepButton"/>
                </div>
            </section>
        </div>
    }
}
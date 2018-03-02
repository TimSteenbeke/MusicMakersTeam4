import React, {Component} from 'react';
import * as GroupService from '../../Services/GroupService.js'
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/action/delete'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';

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

export default class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
            /*
            ,
            selected: [],
            selectedGroup: null
        };*/
        };
    }

    componentDidMount() {
        GroupService.getAllGroupsFromBackend().then(groups => {
            this.setState({groups: groups});
        });
    }

    /*
    componentDidMount() {
        GroupService.getGroupsFromBackend(1).then(fetchedGroups => {
            console.log("fetchedGroups ", fetchedGroups)
            let groups = [];
            groups.push(fetchedGroups)
            this.setState({
                groups: groups,
                selected: [],
                selectedGroup: null,
                tableData: []
            });
        });
        console.log("state: ", this.state);
    }

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
            selectedGroup: this.state.groups[selectedRows].id
        });
        console.log("this.state: ", this.state);
        console.log("selectedRows: ", selectedRows);
    };


    onClickDeleteGroup = () => {
        let tableData = this.state.tableData.filter(({id}) =>
            !this.state.groups.includes(id))
        this.setState({tableData, selectedGroup: []}, () => {
            console.log('After delete', this.state.tableData,
                '\nthis.state.groups', this.state.selectedGroup)
    })};
*/

//onRowSelection={this.handleRowSelection}
    render() {
        console.log("render state: ", this.state);
        return <div className="Homepage">
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Groepen</h1>
                    <Table selectable={true} fixedHeader={true} onRowSelection={this.handleRowSelection}>
                        <TableHeader displaySelectAll={false}
                                     adjustForCheckbox={false}
                                     enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Naam</TableHeaderColumn>
                                <TableHeaderColumn>Begeleider</TableHeaderColumn>
                                <TableHeaderColumn>Aantal leden</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            {this.state.groups.map((group, i) => (
                                <TableRow key={i}>
                                    <TableRowColumn>{group.name}</TableRowColumn>
                                    <TableRowColumn>{group.supervisor.username}</TableRowColumn>
                                    <TableRowColumn>{group.users.count}</TableRowColumn>
                                    <TableRowColumn>
                                        <RaisedButton onClick={this.onClickDeleteGroup} icon={<Delete/>}/>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <RaisedButton label="Groep aanpassen" linkButton={true}
                                  href={/editGroup/ + this.state.selectedGroup}
                                  backgroundColor="#DD2C00"
                                  style={styles.loginButton}
                                  labelColor="#FFEBEE"
                                  className="inputGroepButton"/>
                </div>
            </section>
        </div>
    }
}
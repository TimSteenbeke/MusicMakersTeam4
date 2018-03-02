import React, {Component} from 'react';
import * as GroupService from '../Services/GroupService.js'
import RaisedButton from 'material-ui/RaisedButton';
import GroupUpdate from './GroupUpdate.js'
import Dialog from 'material-ui/Dialog';

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
    exampleImageInput: {
        margin: 10,
    }
}

export default class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            selectedIndex: 0,
            selected: [],
            openUpdate: false,
            selectedGroup: null
        };
    }

    handleDelete = () => {
        GroupService.deleteGroup(this.state.selectedIndex);
    }

    componentDidMount(){
        GroupService.getGroupsFromBackend().then(groups => {
            this.setState({groups: groups});
        });
    }

    componentWillUpdate(){
        GroupService.getGroupsFromBackend().then(groups => {
            this.setState({groups: groups});
        });
    }


    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    handleOpenUpdate = () => {
        this.setState({openUpdate: true});
    };

    handleCloseUpdate = () => {
        this.setState({openUpdate: false});
    };

    handleCellClick = (rowNumber) => {
        var self = this;

        this.setState({
            selectedIndex: this.state.groups[rowNumber].id
        });

        setTimeout(function () {
            console.log(console.log("Selected Row: " + self.state.selectedIndex));
        }, 1000);

    };

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    render() {
/*
        const actionsDetails = [
            <RaisedButton label="Close" onClick={this.handleClose} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>,
        ];
*/
        const actionsUpdate = [
            <RaisedButton label="Close" onClick={this.handleCloseUpdate} backgroundColor="#DD2C00"
                          labelColor="#FFEBEE"/>,
        ];

        return <div className="Homepage">
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Groepen</h1>
                    <Table onRowSelection={this.handleRowSelection} onCellClick={this.handleCellClick}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Naam</TableHeaderColumn>
                                <TableHeaderColumn>Begeleider</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.state.groups.map((group, index) => (
                                <TableRow selected={this.isSelected(index)} key={group.id}>
                                    <TableRowColumn>{group.name}</TableRowColumn>
                                    <TableRowColumn>{group.supervisor.username}</TableRowColumn>
                                    {/*<TableRowColumn>
                                        <RaisedButton onClick={this.handleDelete()} icon={<Delete/>}/>
                                    </TableRowColumn>*/}
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
                <GroupUpdate
                    id={(this.state.selectedIndex)}
                />
            </Dialog>
        </div>
    }
}
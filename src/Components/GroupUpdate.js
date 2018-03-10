import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import * as GroupService from '../Services/GroupService.js'
import {List, ListItem} from 'material-ui/List';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import swal from 'sweetalert2'
import * as LoginService from "../Services/LoginService";
import Link from "react-router-dom/es/Link";
import Redirect from "react-router-dom/es/Redirect";
import Header from "./Header";

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
                supervisor: {
                    username: "string"
                },
            },
        }
    }

    componentDidMount() {
        const self = this;
        console.log("newgroupid: " + self.state.group.groupId);
        GroupService.getGroupFromBackend(self.state.group.groupId)
            .then(console.log("----Groep met id " + self.state.group.groupId + "---- \n"))
                .then(group => self.setState({
                groupId: group.groupId,
                name: group.name,
                supervisor: group.supervisor
            }, console.log(group)))
    }

    componentWillMount(){
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }

    setName = event => {
        let value = event.target.value;
        return this.setState({name: value})
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
        console.log("Name:" + this.state.username)
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
        console.log("supervisorid: " + self.state.supervisor.supervisorid);
        console.log("supervisornaam: " + self.state.supervisor.username);
    };

    render() {

        let redirecter = null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return (<div className="Homepage">
                {redirecter}
                <Header name={this.state.name}/>

                <section className="containerCss">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l8 offset-l2">
                            <div className="card hoverable">
                                <div className="card-image">
                                    <span className="card-title white-text">{this.state.name}</span>
                                </div>
                                <div className="card-content">
                                    <div className="row">
                                        <div className="col s12 m12 l12">
                                            <label>Groepsnaam</label>
                                            <input type="text" value={this.state.name} label="Titel"  onChange={this.setTitle} placeholder="Geef een titel in.."/>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s12 m12 l12">
                                                <label>Begeleider</label>
                                                <input type="text" value={this.state.group.supervisor.username}  onChange={this.setArtist} placeholder="Geef een artiest in.."/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <Link to="/muziekstukken" onClick={this.handleUpdate}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse"><i
                                        className="material-icons">done</i>
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <div className="col s0 m2 l2"/>
                    </div>
                </section>
            </div>
        );
    }
}
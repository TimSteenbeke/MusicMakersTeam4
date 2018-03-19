import React, {Component} from 'react';
import * as NewsItemService from '../../Services/NewsItemService';
import Header from '../GeneralComponents/Header';
import StyledTextField from '../GeneralComponents/StyledTextField';
import {Link} from 'react-router-dom';
import {Row, Input} from 'react-materialize';
import swal from 'sweetalert2';
import * as GroupService from "../../Services/GroupService";

export default class AddNewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            soorten: [],
            groups: [],
            groupid: 1,
            open: false,
            title: "",
            message: "",
            image: "",
            fields: {},
        };
    }

    componentDidMount() {
        this.addGroups();
    }

    addGroups = () => {
        GroupService.getAllGroupsFromBackend().then(console.log("----Groups---- \n"))
            .then(groups => {
                this.setState({groups: groups}, console.log(groups));
            });
    };

    handleClick = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Melding toegevoegd!',
            showConfirmButton: false,
            timer: 1500
        });
        NewsItemService.postNewsItem(JSON.stringify(
            {
                title: this.state.fields["title"],
                message: this.state.fields["message"],
                messageImage: this.state.image,
                groupid: this.state.groupid
            }
        ));

    };

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        console.log(field + " - " + fields[field]);
        this.setState({fields});
    }
    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                image: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("successfully Uploaded");
        }, 1000);
    };

    handleGroupChange = (e) => {
        let options = e.target.options;
        let value = 1;
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value = options[i].value;
            }
        }
        this.setState({groupid: value});
    };

    render() {
        return (
            <div className="Meldingen">
                <Header name="Melding toevoegen"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable">
                                <div className="card-image">
                                    <img
                                        src={"data:image;base64," + this.state.image} alt="Instrument"
                                        height="300px"/>
                                    <span className="card-title white-text">{this.state.naam}</span>
                                    <form action="#">
                                        <div className="file-field input-field">
                                            <div
                                                className="btn-floating halfway-fab waves-effect waves-light deep-orange darken-4 pulse">
                                                <i className="material-icons">attach_file</i>
                                                <input name="file"
                                                       className="upload-file"
                                                       id="file"
                                                       onChange={this.handleChangeImage}
                                                       encType="multipart/form-data" accept="image/*" type="file"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-content">
                                    <form className="addInstrument" action="/" method="POST" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Titel *</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <input ref="title" required onChange={this.handleChange.bind(this, "title")} placeholder="Geef een titel in..." label="Titel"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Bericht *</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <textarea ref="message" required onChange={this.handleChange.bind(this, "message")} placeholder="Geef een bericht in..." label="Bericht"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s3 m3 l3">
                                                    <h5>Groep</h5>
                                                </div>
                                                <div className="col s9 m9 l9">
                                                    <Row>
                                                        <Input s={12} multiple={false} type='select'
                                                               onChange={this.handleGroupChange}
                                                               label="Groep" icon='face'>
                                                            <option key="" value="" disabled>Selecteer een groep
                                                            </option>
                                                            {this.state.groups.map((group, index) => (
                                                                <option key={group.groupid}
                                                                        value={group.groupid}>{group.name}</option>
                                                            ))}
                                                        </Input>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col s12 m12 l12">
                                                    <span>Velden met een * zijn verplicht!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                                <div className="card-action">
                                    <Link to="/" onClick={this.handleClick}
                                          className="btn-floating btn-small waves-effect waves-light deep-orange darken-4 pulse">
                                        <i
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

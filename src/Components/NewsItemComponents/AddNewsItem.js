import React, {Component} from 'react';
import * as NewsItemService from '../../Services/NewsItemService';
import Header from '../GeneralComponents/Header';
import {Row, Input} from 'react-materialize';
import swal from 'sweetalert2';
import * as GroupService from "../../Services/GroupService";
import {Link} from 'react-router-dom';
import StyledTextField from '../GeneralComponents/StyledTextField';

export default class AddNewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            soorten: [],
            groups: [],
            groupids: [],
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
        GroupService.getAllGroupsFromBackend().then(groups => {
                this.setState({groups: groups});
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
                groupids: this.state.groupids
            }
        ));
            this.props.history.push('/newsitems')



    };

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }
    handleChangeImage = (evt) => {
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                image: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
    };

    handleGroupChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({groupids: value});
    };

    render() {
        return (
            <div className="Meldingen">
                <Header name="Melding toevoegen"/>
                <section className="containerCss">
                        <div className="col s12 m8 offset-m2 l8 offset-m2">
                            <div className="card hoverable">
                                <h4 className="center">Melding toevoegen</h4>
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
                                    <form className="addNewsItem" onSubmit={(e) => {
                                        e.preventDefault();
                                        this.handleClick();
                                    } }>
                                        <div className="section">
                                                <div className="col s12 m12 l12">
                                                    <StyledTextField ref="title" required="true" onChange={this.handleChange.bind(this, "title")} placeholder="Geef een titel in..." label="Titel *"/>
                                                </div>
                                        </div>
                                        <div className="section">
                                                <div className="col s12 m12 l12">
                                                    <StyledTextField ref="message" required onChange={this.handleChange.bind(this, "message")} placeholder="Geef een bericht in..." label="Bericht *"/>
                                                </div>
                                        </div>
                                        <div className="section">
                                                <div className="col s12 m12 l12">
                                                    <Row>
                                                        <Input required s={12} multiple={true} type='select' label="Groepen" onChange={this.handleGroupChange}
                                                               icon='group' defaultValue='1'>
                                                            <option key="" value="" disabled>Selecteer 1 of meerdere groepen...</option>
                                                            {this.state.groups.map((group, index) => (
                                                                <option key={group.groupid}
                                                                        value={group.groupid}>{group.name}</option>
                                                            ))}
                                                        </Input>
                                                    </Row>
                                            </div>
                                        </div>
                                        <div className="section">
                                                <div className="col s12 m12 l12">
                                                    <small style={{color: 'red'}}>Velden met een * zijn verplicht</small>
                                                </div>
                                        </div>
                                        <div className="section">
                                            <div className="col s12 m12 l12 center">
                                                <input type="submit" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle" value="Toevoegen"/>
                                                <Link to="/newsitems" type="button" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle">Terug</Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                </section>
            </div>
        );
    }
}

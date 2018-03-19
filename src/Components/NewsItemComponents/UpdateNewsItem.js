import React, {Component} from 'react';
import * as NewsItemService from '../../Services/NewsItemService';
import Header from '../GeneralComponents/Header';
import StyledTextField from '../GeneralComponents/StyledTextField';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';

export default class UpdateNewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsItemId: this.props.match.params.id,
            messageImage: "",
            title: "",
            message: "",
        }
    }

    componentDidMount() {
        let self = this;
        NewsItemService.getNewsItemFromBackend(self.state.newsItemId)
            .then(console.log("----Melding met id " + self.state.newsItemId + "---- \n"))
            .then(newsitem => {
                self.setState({
                    messageImage: newsitem.messageImage,
                    title: newsitem.title,
                    message: newsitem.message,
                });
            }).catch((error) => {
            console.log(error);
        });
    }

    handleUpdate = () => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Melding aangepast',
            showConfirmButton: false,
            timer: 1500
        });
        let self = this;
        NewsItemService.updateNewsItem(self.state.newsItemId, JSON.stringify(
            {
                messageImage: self.state.messageImage,
                title: self.state.title,
                message: self.state.message,
            }
        ));
    };

    handleChangeImage = (evt) => {
        console.log("Uploading");
        let self = this;
        let reader = new FileReader();
        let file = evt.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                messageImage: upload.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            });
        };
        reader.readAsDataURL(file);
        setTimeout(function () {
            console.log("successfully Uploaded");
        }, 1000);
    };

    setTitle = event => {
        let value = event.target.value;
        return this.setState({title: value})
    };

    setMessage = event => {
        let value = event.target.value;
        return this.setState({message: value})
    };

    render() {
        return ( <div className="Homepage">
                <Header name="Melding aanpassen"/>
                <section className="containerCss">
                    <div className="row">
                        <div className="col s0 m2 l2"/>
                        <div className="col s12 m8 l8">
                            <div className="card hoverable z-depth-3">
                                <div className="card-image">
                                    <img
                                        src={"data:image;base64," + this.state.messageImage} alt="Instrument"
                                        height="300px"/>
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
                                    <div className="section">
                                        <div className="row">
                                            <div className="col s3 m3 l3">
                                                <h5>Titel</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <input className="center" type="text" value={this.state.title} label="Titel"  onChange={this.setTitle} placeholder="Geef een titel in.."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">
                                        <div className="row">

                                            <div className="col s3 m3 l3">
                                                <h5>Bericht</h5>
                                            </div>
                                            <div className="col s9 m9 l9">
                                                <textarea className="center" type="text" value={this.state.message} label="Bericht"  onChange={this.setMessage} placeholder="Geef een bericht in.."/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-action">
                                    <Link to="/newsitems" onClick={this.handleUpdate}
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

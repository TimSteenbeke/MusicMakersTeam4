import React, {Component} from 'react';
import * as NewsItemService from '../../Services/NewsItemService';
import Header from '../GeneralComponents/Header';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import StyledTextField from '../GeneralComponents/StyledTextField';

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
            this.props.history.push("/newsitems");


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
                <Header name="Melding bewerken"/>
                <section className="containerCss">
                    <div className="col s12 m8 offset-m2 l8 offset-m2">
                            <div className="card hoverable z-depth-3">
                                <h4 className="center">Melding bewerken</h4>
                                <form action="/" method="PUT" onSubmit={(e) => {e.preventDefault(); this.handleUpdate();}}>

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
                                            <div className="col s12 m12 l12">
                                                <StyledTextField required type="text" value={this.state.title} label="Titel *"  onChange={this.setTitle} placeholder="Geef een titel in.."/>
                                            </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section">

                                            <div className="col s12 m12 l12">
                                                <StyledTextField required type="text" value={this.state.message} label="Bericht *"  onChange={this.setMessage} placeholder="Geef een bericht in.."/>
                                            </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12">
                                            <small style={{color: 'red'}}>Velden met een * zijn verplicht</small>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="col s12 m12 l12 center">
                                            <input type="submit" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle" value="Bewerken"/>
                                            <Link to="/newsitems" type="button" className="btn waves-effect waves-light deep-orange darken-4 pulse buttonstyle">Terug</Link>
                                        </div>
                                    </div>

                                </div>


                                </form>
                            </div>
                        </div>
                </section>
            </div>
        );
    }
}

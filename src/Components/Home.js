import guitar from '../images/guitar.jpg';
import React, {Component} from 'react';
import Header from './GeneralComponents/Header';
import './Home.css';
import * as LoginService from "../Services/LoginService";
import * as NewsItemService from "../Services/NewsItemService";
import * as MomentJs from "moment";

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            redirect:true,
            newsitems: [],
        }
    }

    componentDidMount(){
        if (LoginService.checkToken()){
            NewsItemService.getNewsItemsFromBackend().then(newsitems =>
            {this.setState({newsitems: newsitems});
            });
        }
    }


    render(){
            if (LoginService.checkToken()){
            return (
                <div className="eume">
                    <Header name="Home"/>
                    <div className="row">
                        {this.state.newsitems.map((item, index) => (
                            <div className="col s12 m10 offset-m1 l10 offset-l1">
                                <div className="card hoverable z-depth-3">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator" alt="guitar" src={guitar}/>
                                    </div>
                                    <div className="card-content darken-2">
                                        <span className="card-title activator black-text text-darken-4"><p>{item.title}<br/>
                                            <small>{ MomentJs(item.date).utc().format('YYYY-MM-DD')} - {item.editor}</small>
                                        </p></span>
                                    </div>
                                    <div className="card-reveal darken-2 lighten-4 black-text">
                                    <span className="card-title black-text text-darken-4">{item.title}<i
                                        className="material-icons right">close</i></span>
                                        <p className="black-text">{item.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            else{
                return (
                    <div>
                        <Header name="Please login"/>
                        <h4 className="center-align">Deze app is voor leden van Music Makers</h4>
                    </div>
                )
            }
    }
}
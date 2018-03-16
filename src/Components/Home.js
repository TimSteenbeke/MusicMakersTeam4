import guitar from '../images/guitar.jpg';
import React, {Component} from 'react';
import Header from './GeneralComponents/Header';
import './Home.css';


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            redirect:true
        }
    }

    handleChange = (event, index, value) => this.setState({value});

    render(){
        return (
        <div className="Homepage">
            <Header name="Home"/>
            <div className="row">
                <div className="col s12 m10 offset-m1 l10 offset-l1">
                    <div className="card hoverable z-depth-3">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" alt="guitar" src={guitar} />
                        </div>
                        <div className="card-content darken-2">
                            <span className="card-title activator black-text text-darken-4">Melding<i className="material-icons right">more_vert</i></span>
                        </div>
                        <div className="card-reveal darken-2 lighten-4 black-text">
                            <span className="card-title black-text text-darken-4">Melding<i className="material-icons right">close</i></span>
                            <p className="black-text">Yes boi</p>
                        </div>
                    </div>
                </div>

                <div className="col s12 m10 offset-m1 l10 offset-l1">
                    <div className="card hoverable z-depth-3">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" alt="guitar" src={guitar} />
                        </div>
                        <div className="card-content darken-2">
                            <span className="card-title activator black-text text-darken-4">Melding<i className="material-icons right">more_vert</i></span>
                        </div>
                        <div className="card-reveal darken-2 lighten-4 black-text">
                            <span className="card-title black-text text-darken-4">Melding<i className="material-icons right">close</i></span>
                            <p className="black-text">Yes boi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
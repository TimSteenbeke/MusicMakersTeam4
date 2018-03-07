/**
 * Created by TimS on 15/02/2018.
 */

import guitar from '../images/guitar.jpg'
import React, {Component} from 'react';
import Header from './Header'
import Redirect from "react-router-dom/es/Redirect";


export default class Home extends Component{


    constructor(props){
        super(props);
        this.state = {
            value: 1,
            redirect:true
        }
    }

    componentWillMount(){
        if(localStorage.getItem('userToken')!= null){
            this.setState({redirect: false});
        }
    }

    handleChange = (event, index, value) => this.setState({value});


    render(){
        let redirecting=null;
        if (this.state.redirect) {
            redirecting = <Redirect to='/login'/>
        }

        return <div className="Homepage">
            {redirecting}
            <Header name="Home"/>

            <section className="containerCss">
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

                <div className="card hoverable">
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
            </section>
        </div>
    }
}
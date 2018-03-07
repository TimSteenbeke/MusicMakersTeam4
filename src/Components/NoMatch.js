import React,{Component} from 'react';
import Error from '../images/error_Page.jpg'
import Header from "./Header";
import Link from "react-router-dom/es/Link";


export default class NoMatch extends Component{
    render(){
        return <div className="Homepage">
            <Header name="Error Page"/>
            <section className="containerCss">
                <div className="whiteBox">
                    <img className="activator" alt="Error" src={Error} />
                    <p>Take me back to </p><Link to="/" >Home</Link>
                </div>
            </section>
        </div>
    }
}
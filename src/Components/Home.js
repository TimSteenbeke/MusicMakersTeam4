/**
 * Created by TimS on 15/02/2018.
 */

import React, {Component} from 'react';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){

    }

    render(){
        return <div className="Homepage">
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Home</h1>
                    <p>Home preview page</p>
                </div>
            </section>
        </div>
    }
}
import React, { Component } from 'react';
import * as LoginService from "../../Services/LoginService";
import Home from '../Home.js';
/**
 * Higher-order component (HOC) to wrap restricted pages
 */

export default function(WrapperComponent) {
    class CheckTokenComponent extends Component {
        constructor(props) {
            super(props);
        }

        checkAuthentication(params) {
            const { history } = params;
            if(!LoginService.checkToken()){
                console.log("redirected");
                return false;
            }
            return true;
        }
        render() {
            if(this.checkAuthentication(this.props)){
                return <WrapperComponent {...this.props} />
            }else{
                return <Home/>
            }
        }
    }
    return CheckTokenComponent;
}

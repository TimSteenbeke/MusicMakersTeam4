import React, {Component} from 'react';
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";

export default class CheckTokenComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            redirect:false
        }
    }

    componentWillMount(){
        let response;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }
    render(){
        let redirecting=null;
        if (this.state.redirect) {
            redirecting = <Redirect to='/login'/>;
            this.setState({redirect: false})
        }

        return (
            <div>
                {redirecting}
            </div>
        );

}

}
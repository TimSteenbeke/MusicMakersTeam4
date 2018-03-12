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
        console.log("Tokenchecker response:");
        console.log(response);
        this.setState({redirect: !response})
    }

    render(){
        let redirecting=null;
        if (this.state.redirect) {
            this.setState({redirect: false});
            console.log("redirecting to login");
            redirecting = <Redirect to='/login'/>
        }

        return (
            <div>
                {redirecting}
            </div>
        );

}

}
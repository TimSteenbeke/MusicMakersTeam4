import React, {Component} from 'react';
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";
import { withRouter } from 'react-router-dom';

export function BaseComponent() {
    class CheckTokenComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            redirect:false
        }
    }

    componentWillMount(){
        this.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.checkAuthentication(nextProps);
        }
    }

        checkAuthentication(params) {
            const { history } = params;
            if(!LoginService.checkToken()){
                history.replace({ pathname: '/login' });
            }
        }

    render() {
        return (
            <div>
                <BaseComponent {...this.props} />
            </div>
        );
    }
}
    return withRouter(CheckTokenComponent);
}
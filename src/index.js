import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Sidebar from './Components/GeneralComponents/Sidebar.js';
import GroupsAndChat from './Components/GeneralComponents/GroupsAndChat.js';
import CheckTokenComponent from './Components/GeneralComponents/CheckTokenComponent';
import {BrowserRouter,HashRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
// import PlayPartituur from "./Components/PlayMusic";
import * as LoginService from './Services/LoginService';
import IntroScreen from './Components/GeneralComponents/IntroScreen'


const Application = () => (
    <MuiThemeProvider>
                <section className="flexBox">
                    <section className="sidebar">
                        <Sidebar/>
                    </section>
                    <section className="application">
                        <App/>
                    </section>
                    { LoginService.checkToken() ? <section className="groups">
                        <GroupsAndChat/>
                    </section> : <IntroScreen/> }
                </section>
    </MuiThemeProvider>
);


ReactDOM.render((
    <HashRouter>
        <Application/>
    </HashRouter>
), document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Sidebar from './Components/Sidebar.js';
import GroupsAndChat from './Components/GroupsAndChat.js';
import CheckTokenComponent from './Components/CheckTokenComponent';

import {BrowserRouter,HashRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
// import PlayPartituur from "./Components/PlayMusic";


const Application = () => (
    <MuiThemeProvider>
                <section className="flexBox">
                    <section className="sidebar">
                        <Sidebar/>
                    </section>
                    <section className="application">
                        <App/>
                    </section >
                    <section className="groups">
                        <GroupsAndChat/>
                    </section>
                </section>
    </MuiThemeProvider>
);


ReactDOM.render((
    <HashRouter>
        <Application/>
    </HashRouter>
), document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Sidebar from './Components/Sidebar.js'
import GroupsAndChat from './Components/GroupsAndChat.js'

import {BrowserRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import PlayPartituur from "./Components/PlayMusic";


const Application = () => (
    <MuiThemeProvider>
        <BrowserRouter>
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
        </BrowserRouter>
    </MuiThemeProvider>
);


ReactDOM.render(
    <Application/>
    , document.getElementById('root'));
registerServiceWorker();

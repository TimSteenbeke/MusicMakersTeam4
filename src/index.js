import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Sidebar from './Components/Sidebar.js'
import {BrowserRouter} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import PlayPartituur from "./Components/PlayMusic";

const Application = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <div className="flexBox">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="application">
                    <App/>
                </div>
            </div>
        </BrowserRouter>
    </MuiThemeProvider>
);


ReactDOM.render(
    <Application/>
    , document.getElementById('root'));
registerServiceWorker();

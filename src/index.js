import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';


import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import PlayPartituur from "./Components/PlayMusic";

const Application = () => (
    <MuiThemeProvider>
    <App/>
    </MuiThemeProvider>
);


ReactDOM.render(
    <MuiThemeProvider>
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Application} />
            <Route path="/Play" component={PlayPartituur}/>
        </div>
    </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();

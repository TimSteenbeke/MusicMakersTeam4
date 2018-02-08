import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Homepage from './Components/Homepage.js';

import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

const Application = () => (
    <MuiThemeProvider>
    <App/>
    </MuiThemeProvider>
);


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Application} />
            <Route path="/homepage" component={Homepage} />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();

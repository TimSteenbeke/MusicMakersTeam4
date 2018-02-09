import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import AddInstrument from './Components/InstrumentComponents/AddInstrument.js';
import InstrumentDetails from './Components/InstrumentComponents/InstrumentDetails';
import Instrumenten from './Components/InstrumentComponents/Instrumenten.js';


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
    <MuiThemeProvider>
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Application} />
            <Route path="/addinstrument" component={AddInstrument} />
            <Route path="/instrumenten" component={Instrumenten} />
            <Route path="/instrumentdetails/:id" component={InstrumentDetails} />
        </div>
    </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();

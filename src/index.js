import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

const Application = () => (
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>
);


ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();

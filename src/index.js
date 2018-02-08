import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginComponent from './Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

const Application = () => (
    <MuiThemeProvider>
        <LoginComponent />
    </MuiThemeProvider>
);


ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();

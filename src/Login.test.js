import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from '../Components/Login';

it('renders without crashing', () => {

  ReactDOM.render(<LoginComponent />);
  ReactDOM.unmountComponentAtNode();
});

import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from '../Components/Login';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

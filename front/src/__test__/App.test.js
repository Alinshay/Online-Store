import React from 'react';
import ReactDOM from 'react-dom';
import App from '../index';
import './matchMedia.mock'; // Must be imported before the tested file


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});



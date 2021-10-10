import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('renders without crashing', () => {
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);
});

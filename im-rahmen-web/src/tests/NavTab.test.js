import React from 'react';
import NavTab from '../../src/scenes/BasicScene/components/NavTab';
import ReactDOM from 'react-dom';

it('NavTab renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavTab />, div);
});
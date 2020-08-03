import React from 'react';
import DropDownNav from '../../src/scenes/BasicScene/components/DropDownNav';
import ReactDOM from 'react-dom';

it('DropDownNav renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DropDownNav />, div);
});
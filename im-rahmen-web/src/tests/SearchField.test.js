import React from 'react';
import SearchField from '../../src/scenes/MainScene/components/SearchField';
import ReactDOM from 'react-dom';

it('SearchField renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchField />, div);
});
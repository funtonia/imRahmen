import React from 'react';
import EditorNavBar from '../../src/scenes/BasicScene/components/EditorNavBar';
import ReactDOM from 'react-dom';

it('EditorNavBar renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditorNavBar />, div);
});
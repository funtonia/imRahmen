import React from 'react';
import ListCircle from '../../src/scenes/MainScene/components/ListCircle';
import ReactDOM from 'react-dom';

it('ListCircle renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListCircle />, div);
});
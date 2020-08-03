import React from 'react';
import ListCircle from '../../src/scenes/MainScene/components/ListCircle';
import renderer from 'react-test-renderer';

it('ListCircle renders correctly', () => {
  const tree = renderer.create(
    <ListCircle/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
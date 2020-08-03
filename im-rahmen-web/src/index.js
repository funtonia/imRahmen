import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom';
import './styles/css/index.css';
import App from './App';
import LoginScene from './scenes/LoginScene/index.js';
import MainScene from './scenes/MainScene/index.js';
import ResetPasswordScene from './scenes/LoginScene/components/ResetPasswordScene.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <App>
      <Switch>
        <Route exact path = "/" component = {LoginScene} />
        <Route exact path = "/main" component = {MainScene} />
        <Route exact path = "/reset_password" component = {ResetPasswordScene} />
      </Switch>
    </App>
  </HashRouter>
  , document.getElementById('root')
);

registerServiceWorker();

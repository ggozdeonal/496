//import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { store } from './_helpers';
import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

// core components
import Admin from "layouts/Admin.js";


import "assets/css/material-dashboard-react.css";

//import "assets/css/bauphi.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <PrivateRoute exact path="/" component={Admin} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>,
  </Provider>,
  document.getElementById("root")
);

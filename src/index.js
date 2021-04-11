//import React from "react";
import ReactDOM from "react-dom";
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
import { ListingPage } from './ListingPage'
import routes from "routes.js";

// core components
import Admin from "layouts/Admin.js";


import "assets/css/material-dashboard-react.css";

//import "assets/css/bauphi.css";

ReactDOM.render(

  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={Admin} />
        {routes.map((prop, key) => {
        return (
          <PrivateRoute
            exact path={prop.path}
            component={Admin}
            key={key}
          />
        );
        })}
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/anonim" component={ListingPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>,
  </Provider>,
  document.getElementById("root")
);

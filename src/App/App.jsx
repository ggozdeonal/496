import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

import background from '../../public/background.jpg'; // Tell Webpack this JS file uses this image
import loginStyle from '../../public/bauphi.css'; // Tell Webpack this JS file uses this image

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron" style={{ backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',}} >

            <div className="row">
                <div className="col-sm-2">
                    <Navigation
                        // you can use your own router's api to get pathname
                        activeItemId="/dashboard"
                        onSelect={({itemId}) => {
                            // maybe push to the route
                            history.push("/register'");
                        }}
                        items={[
                            {
                                title: 'Dashboard',
                                itemId: '/dashboard',
                                // you can use your own custom Icon component as well
                                // icon is optional
                            },
                            {
                                title: 'Management',
                                itemId: '/management',
                                subNav: [
                                    {
                                        title: 'Projects',
                                        itemId: '/management/projects',
                                    },
                                    {
                                        title: 'Members',
                                        itemId: '/management/members',
                                    },
                                ],
                            },
                            {
                                title: 'Another Item',
                                itemId: '/another',
                                subNav: [
                                    {
                                        title: 'Teams',
                                        itemId: '/management/teams',
                                    },
                                ],
                            },
                        ]}
                    />

                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                </div>

                <div className="col-sm-8">
                    <div className="container">
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
                <div className="col-sm-2">.col-sm-4</div>
            </div>
        </div>
    );
}

export { App };
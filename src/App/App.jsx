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
            console.log("111");
        });
    }, []);

    return (
        <div className="jumbotron" style={{ backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',}} >

            <div className="row">
                <div className="col-sm-2">
                    {localStorage.getItem('user') &&
                    <Navigation
                        // you can use your own router's api to get pathname
                        activeItemId="/dashboard"
                        onSelect={({itemId}) => {
                            // maybe push to the route
                            console.log({itemId});
                        }}
                        items={[
                            {
                                title: 'Anasayfa',
                                itemId: '/dashboard',
                                // you can use your own custom Icon component as well
                                // icon is optional
                            },
                            {
                                title: 'Ev',
                                itemId: '/management',
                                subNav: [
                                    {
                                        title: 'Evleri Listele',
                                        itemId: '/management/projects',
                                    },
                                    {
                                        title: 'Ev Ekle',
                                        itemId: '/management/members1',
                                    },
                                    {
                                        title: 'Evi Sil',
                                        itemId: '/management/members2',
                                    },
                                    {
                                        title: 'Evi Guncelle',
                                        itemId: '/management/members3',
                                    },
                                ],
                            },
                            {
                                title: 'Etkinlik',
                                itemId: '/another',
                                subNav: [
                                    {
                                        title: 'Etkinlikleri Listele',
                                        itemId: '/management/teams',
                                    },
                                    {
                                        title: 'Etkinlik Ekle',
                                        itemId: '/management/teams1',
                                    },
                                    {
                                        title: 'Etkinligi Sil',
                                        itemId: '/management/teams2',
                                    },
                                    {
                                        title: 'Etkinligi Guncelle',
                                        itemId: '/management/teams3',
                                    },
                                ],
                            },
                            {
                                title: 'Cikis Yap',
                                itemId: '/login',
                            },
                        ]}
                    />
                    }
                </div>

                <div className="col-sm-8">
                    <div className="container">
                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
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
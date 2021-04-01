import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import {alertActions, userActions} from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { UpdateUserPage } from '../UpdateUserPage';

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
                    {localStorage.getItem('user') &&
                    <Navigation
                        // you can use your own router's api to get pathname
                        activeItemId="/dashboard"
                        onSelect={({itemId}) => {
                            // maybe push to the route
                            switch (itemId) {
                                case "/login":
                                    userActions.logout();
                                default:
                                    break;
                            }

                            history.push(itemId)
                        }}
                        items={[
                            {
                                title: 'Anasayfa',
                                itemId: '/dashboard',
                                // you can use your own custom Icon component as well
                                // icon is optional
                            },
                            {
                                title: 'Kullanici Islemleri',
                                itemId: '/profile',
                                subNav: [
                                    {
                                        title: 'Bilgileri Guncelleme',
                                        itemId: '/profile/update',
                                    },
                                    {
                                        title: 'Kullaniciyi Silme',
                                        itemId: '/profile/delete',
                                    },
                                ],
                            },
                            {
                                title: 'Ev',
                                itemId: '/home',
                                subNav: [
                                    {
                                        title: 'Evleri Listele',
                                        itemId: '/home/listHomes',
                                    },
                                    {
                                        title: 'Yakindaki Evleri Listele',
                                        itemId: '/home/listCloseHomes',
                                    },
                                    {
                                        title: 'Ev Ekle',
                                        itemId: '/home/add',
                                    },
                                    {
                                        title: 'Evi Guncelle',
                                        itemId: '/home/update',
                                    },
                                    {
                                        title: 'Evi Sil',
                                        itemId: '/home/delete',
                                    },
                                ],
                            },
                            {
                                title: 'Etkinlik',
                                itemId: '/event',
                                subNav: [
                                    {
                                        title: 'Etkinlikleri Listele',
                                        itemId: '/event/listEvents',
                                    },
                                    {
                                        title: 'Etkinlik Ekle',
                                        itemId: '/event/addEvet',
                                    },
                                    {
                                        title: 'Etkinligi Guncelle',
                                        itemId: '/event/update',
                                    },
                                    {
                                        title: 'Etkinligi Sil',
                                        itemId: '/event/delete',
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
                                <Route path="/profile/update" component={UpdateUserPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>

                <div className="col-sm-2">

                </div>
            </div>
        </div>
    );
}

export { App };
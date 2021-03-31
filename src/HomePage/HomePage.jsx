import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
    const [home, setHome] = useState({
        homeName: '',
        isVisible: '',
        country: '',
        state: '',
        city: '',
        neighbourhood: '',
        latitude: '',
        longitude: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setHome(home => ({ ...home, [name]: value }));
    }

    function handleAddHome(e) {
        e.preventDefault();

        setSubmitted(true);
        if (home.homeName && home.isVisible && home.country && home.state && home.city && home.neighbourhood && home.latitude && home.longitude) {
            dispatch(userActions.addHome(home));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <div className="card bg-light">
                <article className="card-body col-lg-6 offset-lg-3">
                    <h4 className="card-title mt-3 text-center">Ev Ekle</h4>
                    <p className="text-center">Yeni bir ev ekleyin</p>
                    <p className="divider-text"></p>
                    <form name="addHomeForm" onSubmit={handleAddHome}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input type="text" name="homeName" placeholder="Ev Adi" value={home.homeName} onChange={handleChange} className={'form-control' + (submitted && !home.homeName ? ' is-invalid' : '')} />
                            {submitted && !home.homeName &&
                            <div className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="text" name="isVisible" placeholder="Herkese Gorunur" value={home.isVisible} onChange={handleChange} className={'form-control' + (submitted && !home.isVisible ? ' is-invalid' : '')} />
                            {submitted && !home.isVisible &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="text" name="country" placeholder="Ulke" value={home.country} onChange={handleChange} className={'form-control' + (submitted && !home.country ? ' is-invalid' : '')} />
                            {submitted && !home.country &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="text" name="state" placeholder="Il" value={home.state} onChange={handleChange} className={'form-control' + (submitted && !home.state ? ' is-invalid' : '')} />
                            {submitted && !home.state &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="text" name="city" placeholder="Ilce" value={home.city} onChange={handleChange} className={'form-control' + (submitted && !home.city ? ' is-invalid' : '')} />
                            {submitted && !home.city &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="text" name="neighbourhood" placeholder="Mahalle / Acik Adres" value={home.neighbourhood} onChange={handleChange} className={'form-control' + (submitted && !home.neighbourhood ? ' is-invalid' : '')} />
                            {submitted && !home.neighbourhood &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="text" name="latitude" placeholder="Enlem" value={home.latitude} onChange={handleChange} className={'form-control' + (submitted && !home.latitude ? ' is-invalid' : '')} />
                            {submitted && !home.latitude &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="text" name="longitude" placeholder="Boylam" value={home.longitude} onChange={handleChange} className={'form-control' + (submitted && !home.longitude ? ' is-invalid' : '')} />
                            {submitted && !home.longitude &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Temizle</button>
                            <button type="submit" className="btn btn-warning btn-block">Evi Kaydet</button>
                        </div>
                    </form>
                </article>
            </div>

            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function UpdateUserPage() {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        password: '',
        email: '',
        phone: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmitUpdateUser(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.name && user.surname && user.password && user.email && user.phone) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <div className="card bg-light">
                <article className="card-body col-lg-6 offset-lg-3">
                    <h4 className="card-title mt-3 text-center">Hesap Bilgilerini Guncelle</h4>
                    <p className="text-center">Hesap bilgilerinizi guncelleyin</p>
                    <form name="registerForm" onSubmit={handleSubmitUpdateUser}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type="text" name="name" placeholder="Isim" value={user.name} onChange={handleChange} className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')} />
                            {submitted && !user.name &&
                            <div className="invalid-feedback">Name is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type="text" name="surname" placeholder="Soyisim" value={user.surname} onChange={handleChange} className={'form-control' + (submitted && !user.surname ? ' is-invalid' : '')} />
                            {submitted && !user.surname &&
                            <div className="invalid-feedback">Surname is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input type="text" name="email" placeholder="E-Posta" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} readonly />
                            {submitted && !user.email &&
                            <div className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="password" name="password" placeholder="Parola" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                            {submitted && !user.password &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                            </div>
                            <input type="text" name="phone" placeholder="Telefon" value={user.phone} onChange={handleChange} className={'form-control' + (submitted && !user.phone ? ' is-invalid' : '')} />
                            {submitted && !user.phone &&
                            <div className="invalid-feedback">Phone is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-warning btn-block">Bilgileri Guncelle</button>
                        </div>
                    </form>
                </article>
            </div>
        </div>
    );
}

export { UpdateUserPage };
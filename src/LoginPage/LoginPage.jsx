import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function LoginPage() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(email, password, from));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <div className="card bg-light">
                <article className="card-body mx-auto">
                    <h4 className="card-title mt-3 text-center">Giris Yap</h4>
                    <p className="text-center">Hesabiniza giris yapin</p>
                    <p>
                        <a href="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i> Twitter ile Giris</a>
                        <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i> Facebook ile Giris</a>
                    </p>
                    <p className="divider-text">
                        <span className="bg-light"> VEYA </span>
                    </p>
                    <form name="loginForm" onSubmit={handleSubmit}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input type="text" name="email" placeholder="E-Posta" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                            {submitted && !email &&
                            <div className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input type="password" name="password" placeholder="Parola" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                            {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">
                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Giris Yap </button>
                        </div>
                        <p className="text-center">Bir hesabiniz yok mu? <Link to="/register" className="btn btn-link">Kayit Ol</Link></p>
                    </form>
                </article>
            </div>
        </div>
    );
}

export { LoginPage };
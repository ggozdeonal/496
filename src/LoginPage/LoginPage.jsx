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
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <p className="text-center">Get started with your free account</p>
                    <p>
                        <a href="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i> Login via
                            Twitter</a>
                        <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i> Login
                            via facebook</a>
                    </p>
                    <p className="divider-text">
                        <span className="bg-light">OR</span>
                    </p>
                    <form>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input name="" className="form-control" placeholder="Full name" type="text"/>
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input name="" className="form-control" placeholder="Email address" type="email"/>
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input className="form-control" placeholder="Create password" type="password"/>
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input className="form-control" placeholder="Repeat password" type="password"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Create Account</button>
                        </div>
                        <p className="text-center">Have an account? <a href="">Log In</a></p>
                    </form>
                </article>
            </div>
        </div>
    );
}

export { LoginPage };
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

import background from "assets/img/background.jpg";
import loginStyle from "assets/css/bauphi.css";
import { history } from '../_helpers';
import { alertActions } from '../_actions';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { DirectionsOutlined } from '@material-ui/icons';

const firebaseConfig = {
    apiKey: "AIzaSyANQzjmvAokWtm7N_NbgqVIx6rPTXyCD1w",
    authDomain: "bauphi-a9ccf.firebaseapp.com",
    projectId: "bauphi-a9ccf",
    storageBucket: "bauphi-a9ccf.appspot.com",
    messagingSenderId: "66954904557",
    appId: "1:66954904557:web:42ce6cf7ce5f2697599de4",
    measurementId: "G-JYDNCV3DNR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
var provider = new firebase.auth.GoogleAuthProvider();


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
    const alert = useSelector(state => state.alert);

    // reset login status
    useEffect(() => { 
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
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

    function loginWithGoogle(e)
    {

        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;

            console.log(token)
            if(token){
                const { from } = location.state || { from: { pathname: "/" } };
                dispatch(userActions.oauthLogin(token, from));
            }
            

            //console.log(user.toJSON());
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

   

    return (

        <div className="jumbotron" style={{ backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',}} >

        <div className="row">
            <div className="col-sm-2">
            </div>

            <div className="col-sm-8">
                <div className="container">
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
    <div className="col-lg-8 offset-lg-2">
            <div className="card bg-light">
                <article className="card-body col-lg-6 offset-lg-3">
                    <h4 className="card-title mt-3 text-center">Giris Yap</h4>
                    <p className="text-center">Hesabiniza giris yapin</p>
                    <p>
                        <button type="submit" className="btn btn-block btn-google" onClick={loginWithGoogle}><i className="fab fa-google"></i> Google ile Giris </button>
                    </p>
                    <p className="divider-text">
                        <span className="bg-light"> VEYA </span>
                    </p>
                    <p>
                        <Link to="/anonim" className="btn btn-block btn-anonymous"><i className="far fa-user-circle"></i> Anonim Giris</Link>
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
                            <button type="submit" className="btn btn-warning btn-block">
                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Giris Yap </button>
                        </div>
                        <p className="text-center">Bir hesabiniz yok mu? <Link to="/register" className="btn btn-link">Kayit Ol</Link></p>
                    </form>
                </article>
            </div>
        </div>

                </div>
            </div>
            <div className="col-sm-2"></div>
        </div>
    </div>

    );
}

export { LoginPage };
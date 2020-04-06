import axios from 'axios';

import * as actionTypes from './actionTypes';
import { database } from 'firebase';

export const authStart = () => { // essentially we use this action to set a loading state and potentially show a spinner if we want to
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => { // this will get some database, and return javascript object
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

// this will be a synchronous action creator
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};


// here we want to run some async code
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => { // we want to execute a function after a certain amount of time
            // setTimeout expects to get milliseconds
            dispatch(logout()); // we call dispatch after the expiration time to call the logout action
        }, expirationTime * 1000); // turn my milliseconds to real seconds
    };
};

export const auth = (email, password, isSignup) => { // that will  be the one holding the async code that doing the authentication
    // here we get the data of the email and password the user enter and then we check if he valid and can connect to the application
    return dispatch => { // here we want to authenticate the use
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNB6T4idqQfbcC5S6BhRnFBh3cSoPaW2A';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNB6T4idqQfbcC5S6BhRnFBh3cSoPaW2A';
        }
        axios.post(url, authData) // we want to attach authData also to the post request -> the key value & the value the user enter
            .then(response => { // success case!
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));

            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate')); // this the time -> its holds the time we are logged out, not the amount of seconds
            // so expirationDate is the future date 
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 )); // here we pass the amount of seconds until we should be logged out.
            }   
        }
    };
};
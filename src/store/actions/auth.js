import axios from 'axios';
import axios2 from '../../axios-cards';
import * as actionTypes from './actionTypes';
//import { database } from 'firebase';

export const authSignInStart = () => { // essentially we use this action to set a loading state and potentially show a spinner if we want to
    return {
        type: actionTypes.AUTH_SIGN_IN_START
    };
};

export const authSignUpStart = () => { // essentially we use this action to set a loading state and potentially show a spinner if we want to
    return {
        type: actionTypes.AUTH_SIGN_UP_START
    };
};

export const authSignInSuccess = (token, userId,branchNumber,firstName,lastName,email,userPermissions,userKey) => { // this will get some database, and return javascript object
    return {
        type: actionTypes.AUTH_SIGN_IN_SUCCESS,
        idToken: token,
        userId: userId,
        branchNumber: branchNumber,
        firstName: firstName,
        lastName: lastName,
        email: email,
        userPermissions: userPermissions,
        userKey: userKey
    };
};

export const authSignUpSuccess = () => { // this will get some database, and return javascript object
    return {
        type: actionTypes.AUTH_SIGN_UP_SUCCESS
     
    };
};

export const authSignInFail = (error) => {
    return {
        
        type: actionTypes.AUTH_SIGN_IN_FAIL,
        error: error
    };
};

export const authSignUpFail = (error) => {
    return {
        type: actionTypes.AUTH_SIGN_UP_FAIL,
        error: error
    };
};


// this will be a synchronous action creator
export const logout = () => { //need to add
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('branchNumber');

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

export const authSignUp = (firstName,lastName,branchNumber,userPermissions,email, password) => { // that will  be the one holding the async code that doing the authentication
    //console.log("70");
    // here we get the data of the email and password the user enter and then we check if he valid and can connect to the application
    return dispatch => { // here we want to authenticate the use
        dispatch(authSignUpStart());
        const dataBaseUser = { // here we  prepare the user data for the state
            firstName: firstName,
            lastName: lastName,
            branchNumber: branchNumber,
            userPermissions: userPermissions,
            email: email,
            Tasks:[]
        }; 

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNB6T4idqQfbcC5S6BhRnFBh3cSoPaW2A';

        axios.post(url, authData) // we want to attach authData also to the post request -> the key value & the value the user enter

            .then(response => { // success case!
                console.log("122" + response);
                
                const queryParams = '?auth=' + response.data.idToken ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
                axios2.post(branchNumber + '/users.json' + queryParams , dataBaseUser )
                //axios2.post(branchNumber + '/users.json?auth' + response.data.idToken , dataBaseUser )

                dispatch(authSignUpSuccess());
               // dispatch(checkAuthTimeout(response.data.expiresIn));

            })
            .catch(err => { // add nertwork problem!!! need to fix this rotem
                dispatch(authSignUpFail(err)); //err.response.data.error
            });
    };
};

export const authSignIn = (email, password, branchNumber) => { // that will  be the one holding the async code that doing the authentication
    // here we get the data of the email and password the user enter and then we check if he valid and can connect to the application
    let userFound = false;
    return dispatch => { // here we want to authenticate the use
        dispatch(authSignInStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNB6T4idqQfbcC5S6BhRnFBh3cSoPaW2A'; // the user is sign up already
         
       // const queryParams = '?auth=' + response.data.idToken ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
       // axios2.get(branchNumber + '/users.json/' +queryParams ) // we use axios to get my cards, // this referring to that cards node on my backend (firebase node)
        axios2.get(branchNumber + '/users.json/'  + '?email=' + email ) // we use axios to get my cards, // this referring to that cards node on my backend (firebase node)

            .then(res => { // success case!
                console.log(res.request); //get
                console.log(res.data); //get
                console.log(res.status); //get
                console.log(res.statusText); //get
                console.log(res.headers); //get
                console.log(res.config); //get
                console.log(res.response); //get

                for ( let key in res.data ) {  //get
                    if(res.data[key].email === email && res.data[key].branchNumber === branchNumber ){ //get
                        console.log(res.request); //get
                        userFound = true;
                        axios.post(url, authData) // we want to attach authData also to the post request -> the key value & the value the user enter
                            .then(response => { // success case! //get
                                console.log(key);
                                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 100000); // was 1000 for 1 hour //post
                                localStorage.setItem('token', response.data.idToken); //post
                                localStorage.setItem('expirationDate', expirationDate); //post
                                localStorage.setItem('userId', response.data.localId); //post
                                localStorage.setItem('branchNumber', branchNumber); //post
                                localStorage.setItem('firstName', res.data[key].firstName); //post
                                localStorage.setItem('lastName', res.data[key].lastName); //post
                                localStorage.setItem('email', res.data[key].email); //post
                                localStorage.setItem('userPermissions', res.data[key].userPermissions); //post
                                localStorage.setItem('userKey', key); //post
                                //,firstName,lastName,email,userPermissions
                                dispatch(authSignInSuccess(response.data.idToken, response.data.localId, branchNumber,res.data[key].firstName,res.data[key].lastName,res.data[key].email,res.data[key].userPermissions,key));  //post
                                dispatch(checkAuthTimeout(response.data.expiresIn)); //post
                                }) 
                            .catch(err => { // add nertwork problem!!! need to fix this rotem //post
                                dispatch(authSignInFail(err.message)); //err.response.data.error //post
                            }); //post
                        
                        console.log("success login with the right brance"); //get
                        break; //get
                    }             
                    //console.log("185" + res.data[key].email + key );        
                } //get

                if(!userFound){

                    dispatch(authSignInFail("USER CANNOT LOGIN")); //err.response.data.error //get
                    console.log("show some error we cannot find any match"  ); //get
                }

                }) //get
                    .catch(error => { // add nertwork problem!!! need to fix this rotem  //get
                    dispatch(authSignInFail(error)); //err.response.data.error //get
                }); //get

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
                const branchNumber = localStorage.getItem('branchNumber');

            
                const firstName = localStorage.getItem('firstName');
                const lastName = localStorage.getItem('lastName');
                const email = localStorage.getItem('email');
                const userPermissions = localStorage.getItem('userPermissions');
                const userKey = localStorage.getItem('userKey');
                dispatch(authSignInSuccess(token, userId,branchNumber,firstName,lastName,email,userPermissions,userKey)); // check this! maybe need to add the rest values
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 100000 )); // here we pass the amount of seconds until we should be logged out.
                //was 1000 for 1 hour
            }   
        }
    };
};

//(token, userId,branchNumber,firstName,lastName,email,userPermissions,userKey)
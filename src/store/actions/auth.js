import axios from 'axios';
import axios2 from '../../axios-cards';
import * as actionTypes from './actionTypes';
//import { database } from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
//import firebase from 'firebase';
import 'firebase/firestore';
// import config from "../../config";

export const authSignInStart = () => { // essentially we use this action to set a loading state and potentially show a spinner if we want to
    return {
        type: actionTypes.AUTH_SIGN_IN_START
    };
};


export const purchaseToastCancel = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.TOAST_MODAL_CLOSE // just return an action
    };
};

export const toastModalClose = (  ) => { 
    return dispatch => {
        dispatch( purchaseToastCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};





export const authSignInSuccess = (token, userId,branchNumber,firstName,lastName,email,userPermissions,userKey,backgroundColor,profileImage,sidebarBackgroundColor) => { // this will get some database, and return javascript object
    return {
        type: actionTypes.AUTH_SIGN_IN_SUCCESS,
        idToken: token,
        userId: userId,
        branchNumber: branchNumber,
        firstName: firstName,
        lastName: lastName,
        email: email,
        userPermissions: userPermissions,
        userKey: userKey,
        backgroundColor: backgroundColor,
        profileImage: profileImage,
        sidebarBackgroundColor: sidebarBackgroundColor


    };
};


export const authSignInFail = (error) => {
    return { 
        type: actionTypes.AUTH_SIGN_IN_FAIL,
        error: error
    };
};


// this will be a synchronous action creator
export const logout = () => { //need to add
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('branchNumber');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('userPermissions');
    localStorage.removeItem('userKey');

    localStorage.removeItem('backgroundColor');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('sidebarBackgroundColor');

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
        axios2.get(branchNumber + '/users.json/?email=' + email ) // we use axios to get my cards, // this referring to that cards node on my backend (firebase node)

            .then(res => { // success case!

                for ( let key in res.data ) {  //get
                    if(res.data[key].email === email && res.data[key].branchNumber === branchNumber ){ //get
                      //  console.log(res.request); //get
                        userFound = true;
                        axios.post(url, authData) // we want to attach authData also to the post request -> the key value & the value the user enter
                            .then(response => { // success case! //get

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

                                localStorage.setItem('backgroundColor', res.data[key].backgroundColor); //post
                                localStorage.setItem('profileImage', res.data[key].profileImage); //post
                                localStorage.setItem('sidebarBackgroundColor', res.data[key].sidebarBackgroundColor); //post

                               // console.log(response.data);
                                //console.log(response.data.displayName);
                                //console.log(response.data.fullName);

                                
                                dispatch(authSignInSuccess(response.data.idToken, response.data.localId, branchNumber,res.data[key].firstName,res.data[key].lastName,
                                    res.data[key].email,res.data[key].userPermissions,key,res.data[key].backgroundColor,res.data[key].profileImage,res.data[key].sidebarBackgroundColor ));  //post
                                dispatch(checkAuthTimeout(response.data.expiresIn)); //post
                                }) 
                            .catch(err => { // add nertwork problem!!! need to fix this rotem //post                       
                                //console.log(err);
                                //console.log(err.message);
                                let error ;
                                if( err.response.data.error.message==='INVALID_PASSWORD'){
                                    error = 'סיסמא שגויה';
                                }
                                else{
                                    error = err.message;
                                }
                                console.log(err.response.data.error.message);
                                console.log(err.message); //err.message

                                dispatch(authSignInFail(error)); //err.response.data.error //post
                            }); //post
                        
                        break; //get
                    }             
                } //get
                if(!userFound){
                    dispatch(authSignInFail("משתמש לא רשום")); //err.response.data.error //get
                }
                }) //get

                    .catch(error => { // add nertwork problem!!! need to fix this rotem  //get
                        // console.log(error.response.message);
                        // console.log(error.message);
                            // console.log(error.response);
                        console.log(error);
                        console.log(error.message);
                        //console.log(error.response.data.error);
                        // dispatch(authSignInFail(error.response.data.error)); //err.response.data.error //get
                        dispatch(authSignInFail(error.message)); //err.response.data.error //get

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

                const backgroundColor = localStorage.getItem('backgroundColor');
                const profileImage = localStorage.getItem('profileImage');
                const sidebarBackgroundColor = localStorage.getItem('sidebarBackgroundColor');

                dispatch(authSignInSuccess(token, userId,branchNumber,firstName,lastName,email,userPermissions,userKey,backgroundColor,profileImage,sidebarBackgroundColor)); // check this! maybe need to add the rest values
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 100000 )); // here we pass the amount of seconds until we should be logged out.
                //was 1000 for 1 hour
            }   
        }
    };
};



export const purchaseSettingInit = () => { 
    return {
        type: actionTypes.SETTING_OPENING 
    };
};


export const SettingOpening = () => {  
    return dispatch => {
        dispatch( purchaseSettingInit() ); 
        
    };
};

export const purchaseSettingCancel = () => { 
    return {
        type: actionTypes.SETTING_CLOSE 
    };
};


export const SettingClose = (  token ) => { 
    return dispatch => {
        dispatch( purchaseSettingCancel() ); 
        
    };
};



export const updateSettingUserStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.UPDATE_SETTING_USER_START
    };
};

// this synchronous action creators
export const updateSettingUserSuccess = ( id, updateData,field) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.UPDATE_SETTING_USER_SUCCESS,
        field: field,
        updateData: updateData
        // taskId: id, 
        // taskData: taskData
        
    };
};

// this synchronous action creators
export const updateSettingUserFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.UPDATE_SETTING_USER_FAIL,
        error: error // pass on the error
    };
}


export const updateSettingUser = (updateData,field,token,branchNumber,userKey,userId) => {  

    let finalUpdateField = '' ; 
    if(field === 'sidebarBackgroundColor'){
        finalUpdateField = {  sidebarBackgroundColor: updateData};
    }
    if(field === 'backgroundColor'){
        finalUpdateField = {  backgroundColor: updateData};
   }
   if(field === 'profileImage'){
    finalUpdateField = {  profileImage: updateData};
}

//console.log(finalUpdateField);
    return dispatch => {
        dispatch( updateSettingUserStart() ); // dispatch to the store
        //'/carData.json?auth=' + token,
        axios2.patch(branchNumber + '/users/'+ userKey + '/.json'  , finalUpdateField)
//        axios.patch(branchNumber + '/users/'+ userKey +'/taskData/' + list + '/' + taskKey + '/.json'  , finalUpdateField)

        .then(res => {
       // console.log(res.data);
        dispatch(updateSettingUserSuccess(res.data, updateData,field)); 
       // dispatch(fetchTasks(token, userId, branchNumber,userKey));
        if(field === 'sidebarBackgroundColor'){
            localStorage.setItem('sidebarBackgroundColor', updateData); 
        }
        if(field === 'backgroundColor'){
            localStorage.setItem('backgroundColor', updateData); 
        }
        if(field === 'profileImage'){
            localStorage.setItem('profileImage', updateData); 
        }
        })
        .catch( error => {
            dispatch(updateSettingUserFail(error));
            console.log(error);
        } );

    };
};


export const resetPasswordStart = () => {
    return {
        type: actionTypes.RESET_PASSWORD_START
    };
};

export const resetPasswordSuccess = () => { 
    return { 
        type: actionTypes.RESET_PASSWORD_SUCCESS,

    };
};

export const resetPasswordFail = ( error ) => { 
    return {
        type: actionTypes.RESET_PASSWORD_FAIL,
        error: error 
    };
}


export const resetPassword = (email) => {   
   // firebase.initializeApp(config);
 //  https://garage-management-software.firebaseapp.com/auth

    return dispatch => {
        dispatch( resetPasswordStart() ); 
        firebase.auth().sendPasswordResetEmail(email, { url: 'http://localhost:3000/auth' })
        
        .then(response => {
            dispatch(resetPasswordSuccess()); 
            alert('נשלח מייל לשחזור סיסמא');

        })

        .catch(error => {
          console.log(error.message);
          dispatch(resetPasswordFail(error.message));

        })
      
    };
};
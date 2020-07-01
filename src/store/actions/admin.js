import axiosFireBase from 'axios';

import axios from '../../axios-cards';
import * as actionTypes from './actionTypes';
//import { database } from 'firebase';

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    };
};

export const fetchUsersSuccess = ( users,BranchNumber ) => { 
    return { 
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users,
        BranchNumber: BranchNumber
    };
};

export const fetchUsersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    };
};


export const fetchUsers = (token, userId) => { 
   let allBranchsNumbers = ['Talpiot','GivatShaul', 'Modiin'] ;

    return dispatch => {
        dispatch(fetchUsersStart()); 

        for (let BranchNumber in allBranchsNumbers) {
            const queryParams = '?auth=' + token ; 
            axios.get(allBranchsNumbers[BranchNumber] + '/users.json' + queryParams ) 
        

            .then( res => { 
                const fetchedUsers = []; 
                for ( let key in res.data ) { 
                    fetchedUsers.push( {
                        ...res.data[key], 
                        keyUser: key 
                    } );
                }
                dispatch(fetchUsersSuccess(fetchedUsers,allBranchsNumbers[BranchNumber]));
            } )
            .catch( err => { 
               // console.log(err);
                dispatch(fetchUsersFail(err));
            } );
        }    
    };
};




export const UserDeleteStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.USER_DELETE_START
    };
};

// this synchronous action creators
export const UserDeleteSuccess = ( id,list) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.USER_DELETE_SUCCESS,
     //   taskId: id
        //taskData: taskData,
     //   list: list 
    };
};

// this synchronous action creators
export const UserDeleteFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.USER_DELETE_FAIL,
        error: error // pass on the error
    };
}

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const UserDelete = (token,userBranchNumber,userKey,userId,userToken) => {   // token,branchNumber,userKey,taskKey ,list,userId

 
    return dispatch => {
        dispatch( UserDeleteStart() ); // dispatch to the store
        //'/carData.json?auth=' + token,

        const queryParams = '?auth=' + token ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
        //?x-http-method-override=DELETE
             //   axios.delete(branchNumber + '/' + node + '/'+ cardKey + '.json' + queryParams,null )
             //        axios.delete(branchNumber + '/' + node + '/'+ cardKey + '.json' + queryParams,null )
             let url = 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCNB6T4idqQfbcC5S6BhRnFBh3cSoPaW2A';
             
        axios.delete(userBranchNumber + '/users/'+ userKey  + '.json' + queryParams ,null ) //x-http-method-override=DELETE

        .then(res => {
            axiosFireBase.post(url,{idToken: userToken}) // we want to attach authData also to the post request -> the key value & the value the user enter
                            .then(response => { 
                                //console.log(response);

                                dispatch(UserDeleteSuccess(response)); //list 
                                dispatch(fetchUsers(token, userId));
                            }) 
                            .catch(err => { // add nertwork problem!!! need to fix this rotem //post
                                dispatch(UserDeleteFail(err)); //err.response.data.error //post
                            }); //post
                    

            // console.log(res);
        //dispatch(UserDeleteSuccess(res)); //list 
        //dispatch(GetAllCardData(token,branchNumber ,userId,'cards', cardKey)); 
        //dispatch(fetchUsers(token, userId));
        })
        .catch( error => {
            dispatch(UserDeleteFail(error));
          //  console.log(error);
        } );

    };
};



export const addNewTaskForUserInit = (userKey,userBranchNumber,userToken,firstName,lastName) => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.ADD_NEW_TASK_FOR_USER_MODAL_INIT, // just return an action
        userKey: userKey,
        userBranchNumber: userBranchNumber,
        userToken: userToken,
        firstName: firstName,
        lastName: lastName

    };
};


export const addNewTaskForUserModalOpening = (userKey,userBranchNumber,userToken,firstName,lastName) => {  //token
    return dispatch => {
        dispatch( addNewTaskForUserInit(userKey,userBranchNumber,userToken,firstName,lastName) ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};

export const addNewTaskForUserCancel = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.ADD_NEW_TASK_FOR_USER_MODAL_CLOSE // just return an action
    };
};

export const addNewTaskForUserModalClose = (   ) => { 
    return dispatch => {
        dispatch( addNewTaskForUserCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};



export const purchaseAddNewUserInit = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.PURCHASE_ADD_USER_MODAL_INIT // just return an action
    };
};


export const AddNewUserModalOpening = () => {  //token
    return dispatch => {
        dispatch( purchaseAddNewUserInit() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};

export const purchaseAddNewUserCancel = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.ADD_NEW_USER_MODAL_CLOSE // just return an action
    };
};

export const AddNewUserModalClose = (   ) => { 
    return dispatch => {
        dispatch( purchaseAddNewUserCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};


export const authSignUpStart = () => { // essentially we use this action to set a loading state and potentially show a spinner if we want to
    return {
        type: actionTypes.AUTH_SIGN_UP_START
    };
};

export const authSignUpSuccess = () => { // this will get some database, and return javascript object
    return {
        type: actionTypes.AUTH_SIGN_UP_SUCCESS
     
    };
};

export const authSignUpFail = (error) => {
    return {
        type: actionTypes.AUTH_SIGN_UP_FAIL,
        error: error
    };
};


export const authSignUp = (token,userId,firstName,lastName,branchNumber,userPermissions,email, password) => { // that will  be the one holding the async code that doing the authentication
    // here we get the data of the email and password the user enter and then we check if he valid and can connect to the application

    let nodeBranchNumber = '';
    if(branchNumber === 'תלפיות'){
        nodeBranchNumber= 'Talpiot'
    }
    else if(branchNumber === 'גבעת שאול'){
        nodeBranchNumber= 'GivatShaul'
    }
    else if(branchNumber === 'מודיעין'){
        nodeBranchNumber= 'Modiin'
    }

    let nodeUerPermissions = '';
    if(userPermissions === 'מנהל'){
        nodeUerPermissions= 'Admin'
    }
    else if(userPermissions === 'משתמש'){
        nodeUerPermissions= 'User'
    }
    else if(userPermissions === 'בסיסי'){
        nodeUerPermissions= 'basic'
    }
    return dispatch => { // here we want to authenticate the use
        dispatch(authSignUpStart());
        // let dataBaseUser = { // here we  prepare the user data for the state
        //     firstName: firstName,
        //     lastName: lastName,
        //     branchNumber: nodeBranchNumber,
        //     userPermissions: nodeUerPermissions,
        //     email: email,
        //     Tasks:[]
        // }; 

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
            displayName: firstName + ' ' + lastName
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNB6T4idqQfbcC5S6BhRnFBh3cSoPaW2A';

        axiosFireBase.post(url, authData) // we want to attach authData also to the post request -> the key value & the value the user enter

            .then(response => { // success case!  
                let dataBaseUser = { // here we  prepare the user data for the state
                    firstName: firstName,
                    lastName: lastName,
                    branchNumber: nodeBranchNumber,
                    userPermissions: nodeUerPermissions,
                    email: email,
                    userToken: response.data.idToken, //localId
                    Tasks:[],
                    sidebarBackgroundColor: 'blue',
                    backgroundColor: 'light',
                    profileImage: 'anime3'
                };             
                //console.log(response);  

                const queryParams = '?auth=' + response.data.idToken ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
                axios.post(nodeBranchNumber + '/users.json' + queryParams , dataBaseUser )

                    .then(res => { 
                      //  console.log(res);

                        dispatch(authSignUpSuccess());
                        dispatch(AddNewUserModalClose());
                        dispatch(fetchUsers(token, userId));

                    }) 
                    .catch(error => { // add nertwork problem!!! need to fix this rotem //post
                       // console.log(error);
                          dispatch(authSignUpFail(error)); //err.response.data.error

                //        dispatch(UserDeleteFail(error)); //err.response.data.error //post
                    }); 
              
            })
            .catch(err => { // add nertwork problem!!! need to fix this rotem
               // console.log(err);

                dispatch(authSignUpFail(err)); //err.response.data.error
            });
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


export const deleteUserModalInit = (userKey,userBranchNumber,userToken,firstName,lastName) => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.DELETE_USER_MODAL_INIT, // just return an action
        userKey: userKey,
        userBranchNumber: userBranchNumber,
        userToken: userToken,
        firstName: firstName,
        lastName: lastName

    };
};

export const deleteUserModalOpening = (userKey,userBranchNumber,userToken,firstName,lastName) => {  //token
    return dispatch => {
        dispatch( deleteUserModalInit(userKey,userBranchNumber,userToken,firstName,lastName) ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};

export const deleteUserModalCancel = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.DELETE_USER_MODAL_CLOSE // just return an action
    };
};

export const deleteUserModalClose = (   ) => { 
    return dispatch => {
        dispatch( deleteUserModalCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};



export const taskOpeningSuccess = ( id, taskData,list ) => { 
    return { 
        type: actionTypes.TASK_OPENING_FOR_USER_SUCCESS,
        taskId: id, 
        taskData: taskData,
        list: list
    };
};


export const taskOpeningFail = ( error ) => { 
    //console.log(error);
    return {
        type: actionTypes.TASK_OPENING_FOR_USER_FAIL,
        error: error 
    };
}


export const taskOpeningStart = () => {
    return {
        type: actionTypes.TASK_OPENING_FOR_USER_START
    };
};


export const taskOpeningForUser = ( taskData, token,branchNumber, userKey,list) => { 

    return dispatch => {
        dispatch( taskOpeningStart() ); 

        axios.post(branchNumber + '/users/' + userKey + '/taskData/' + list + '.json' ,taskData ) 

        .then( response => {
           // console.log(response.data)
            dispatch(taskOpeningSuccess(response.data.name, taskData,list)); 

        } )
        .catch( error => {
            dispatch(taskOpeningFail(error));
            //console.log(error);
        } );
    };
};

export const notificationOpeningFail = ( error ) => { 
    //console.log(error);
    return {
        type: actionTypes.NOTIFICATION_OPENING_FOR_USER_FAIL,
        error: error 
    };
}


export const notificationOpeningStart = () => {
    return {
        type: actionTypes.NOTIFICATION_OPENING_FOR_USER_START
    };
};
export const notificationOpeningSuccess = ( id, notificationData ) => { 
    return { 
        type: actionTypes.NOTIFICATION_OPENING_FOR_USER_SUCCESS,
        notificationId: id, 
        notificationData: notificationData
    };
};


export const notificationOpeningForUser = ( notificationData, token,branchNumber, userKey) => { 

    return dispatch => {
        dispatch( notificationOpeningStart() ); 

        axios.post(branchNumber + '/users/' + userKey + '/notification.json' ,notificationData ) 

        .then( response => {
           // console.log(response.data)
            dispatch(notificationOpeningSuccess(response.data.name, notificationData)); 

        } )
        .catch( error => {
            dispatch(notificationOpeningFail(error));
            //console.log(error);
        } );
    };
};

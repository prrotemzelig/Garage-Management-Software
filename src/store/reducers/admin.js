import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = { 
    showSuccessCase: false, 
    error: null,
    loading: false,
    showAddNewUserModel: false,   
    showDeleteSuccessCase: false,
    showAddNewTaskModal: false,
    showDeleteUserModal: false,

    // authRedirectPath: '/',
    TalpiotUsers: [],
    GivatShaulUsers: [],
    ModiinUsers: [],
    userKey: null,
    userBranchNumber: null,
    userToken: null,
    firstName: null,
    lastName: null
};


const fetchUsersStart = ( state, action ) => { 
    return updateObject( state, { loading: true } );
};

const fetchUsersSuccess = ( state, action ) => { 

    if(action.BranchNumber === 'Talpiot'){
        return updateObject( state, { 
            TalpiotUsers: action.users,
            loading: false
        } );
    }

    else if(action.BranchNumber === 'GivatShaul'){
        return updateObject( state, { 
            GivatShaulUsers: action.users,
            loading: false
        } );
    }

    else if(action.BranchNumber === 'Modiin'){
        return updateObject( state, { 
            ModiinUsers: action.users,
            loading: false
        } );
    }

};

const fetchUsersFail = ( state, action ) => { 
    return updateObject( state, { loading: false } );
};


const userDeleteStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};


const userDeleteSuccess = ( state, action ) => {
    //const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
     
        return updateObject( state, {
            loading: false,
            showDeleteUserModal: false,
            showDeleteSuccessCase: true
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    
};


const userDeleteFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};



const addNewTaskForUserInit = ( state, action ) => {
    return updateObject( state, {
         showAddNewTaskModal: true,
         userKey: action.userKey,
        userBranchNumber: action.userBranchNumber,
        userToken: action.userToken,
        firstName: action.firstName,
        lastName: action.lastName
     } );
};

const addNewTaskForUserCancel = ( state, action ) => {
    return updateObject( state, { showAddNewTaskModal: false ,
        userKey: null,
        userBranchNumber: null,
        userToken: null,
        firstName: null,
        lastName: null} ); 
};



const deleteUserModalInit = ( state, action ) => {
    return updateObject( state, {
        showDeleteUserModal: true,
        userKey: action.userKey,
        userBranchNumber: action.userBranchNumber,
        userToken: action.userToken,
        firstName: action.firstName,
        lastName: action.lastName
     } );
};

const deleteUserModalCancel = ( state, action ) => {
    return updateObject( state, { showDeleteUserModal: false ,
        userKey: null,
        userBranchNumber: null,
        userToken: null,
        firstName: null,
        lastName: null
      } ); 
};



const purchaseAddNewUserInit = ( state, action ) => {
    return updateObject( state, { showAddNewUserModel: true } );
};

const purchaseAddNewUserCancel = ( state, action ) => {
    return updateObject( state, { showAddNewUserModel: false } ); 
};


const authSignUpFail = (state, action) => { // get state and action
    return updateObject( state, {
        error: action.error
       // showAddNewUserModel: false
      //  loading: false
    });
}

const authSignUpStart = ( state, action ) => {
    return updateObject( state, { error: null } ); // return my update state object //, loading: true
};

const authSignUpSuccess = (state, action) => {
    return updateObject( state, { // in a success case we want to set the token,user ID, error,loading
        error: null,
        showSuccessCase: true
       // loading: false // because we done!
     } );
};

const purchaseToastCancel = ( state, action ) => {
    return updateObject( state, { showSuccessCase: false,showDeleteSuccessCase: false} ); 
};


//state = initialState - we must to do like that because otherwise it's undefined at the beginning 
const reducer = ( state = initialState, action ) => { // receiving the state and the action
    switch ( action.type ) {

        case actionTypes.FETCH_USERS_START: return fetchUsersStart( state, action );
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess( state, action );
        case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail( state, action );
        

        case actionTypes.USER_DELETE_START: return userDeleteStart( state, action );
        case actionTypes.USER_DELETE_SUCCESS: return userDeleteSuccess( state, action );
        case actionTypes.USER_DELETE_FAIL: return userDeleteFail( state, action );


        case actionTypes.AUTH_SIGN_UP_START: return authSignUpStart(state, action);
        case actionTypes.AUTH_SIGN_UP_SUCCESS: return authSignUpSuccess(state, action);
        case actionTypes.AUTH_SIGN_UP_FAIL: return authSignUpFail(state, action);

        case actionTypes.PURCHASE_ADD_USER_MODAL_INIT: return purchaseAddNewUserInit( state, action );
        case actionTypes.ADD_NEW_USER_MODAL_CLOSE: return purchaseAddNewUserCancel( state, action );

        

        case actionTypes.ADD_NEW_TASK_FOR_USER_MODAL_INIT: return addNewTaskForUserInit( state, action );
        case actionTypes.ADD_NEW_TASK_FOR_USER_MODAL_CLOSE: return addNewTaskForUserCancel( state, action );




        case actionTypes.DELETE_USER_MODAL_INIT: return deleteUserModalInit( state, action );
        case actionTypes.DELETE_USER_MODAL_CLOSE: return deleteUserModalCancel( state, action );



        case actionTypes.TOAST_MODAL_CLOSE: return purchaseToastCancel( state, action );

        default: return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = { 
    showSuccessCase: false, 
    loadingFetchUsers:false,
    error: null,
    loading: false,
    showAddNewUserModel: false,   
    // showDeleteSuccessCase: false,
    showAddNewTaskModal: false,
    showDeleteUserModal: false,
    showAddTaskSuccessCase:false,

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


const logoutAdminReducers = (state, action) => {
    return updateObject(state, {     showSuccessCase: false, 
        loadingFetchUsers:false,
        error: null,
        loading: false,
        showAddNewUserModel: false,   
        showAddNewTaskModal: false,
        showDeleteUserModal: false,
        showAddTaskSuccessCase:false,
        TalpiotUsers: [],
        GivatShaulUsers: [],
        ModiinUsers: [],
        userKey: null,
        userBranchNumber: null,
        userToken: null,
        firstName: null,
        lastName: null
    }); 
};

const fetchUsersStart = ( state, action ) => { 
    return updateObject( state, { loadingFetchUsers: true } );
};

const fetchUsersSuccess = ( state, action ) => { 

    if(action.BranchNumber === 'Talpiot'){
        return updateObject( state, { 
            TalpiotUsers: action.users,
            loadingFetchUsers: false
        } );
    }

    else if(action.BranchNumber === 'GivatShaul'){
        return updateObject( state, { 
            GivatShaulUsers: action.users,
            loadingFetchUsers: false
        } );
    }

    else if(action.BranchNumber === 'Modiin'){
        return updateObject( state, { 
            ModiinUsers: action.users,
            loadingFetchUsers: false
        } );
    }

};

const fetchUsersFail = ( state, action ) => { 
    return updateObject( state, { loadingFetchUsers: false } );
};


const userDeleteStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};


const userDeleteSuccess = ( state, action ) => {
    //const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
     
        return updateObject( state, {
            loading: false,
            showDeleteUserModal: false
            // showDeleteSuccessCase: true
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



// const deleteUserModalInit = ( state, action ) => {
//     return updateObject( state, {
//         showDeleteUserModal: true,
//         userKey: action.userKey,
//         userBranchNumber: action.userBranchNumber,
//         userToken: action.userToken,
//         firstName: action.firstName,
//         lastName: action.lastName
//      } );
// };

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
    return updateObject( state, { 
        showAddNewUserModel: true
     } );
};

const purchaseAddNewUserCancel = ( state, action ) => {
    return updateObject( state, {
         showAddNewUserModel: false ,
         showSuccessCase: false
        } ); 
};


const authSignUpFail = (state, action) => { // get state and action
    return updateObject( state, {
        error: action.error,
       showAddNewUserModel: false,
       loading:false,
       showSuccessCase: false
      //  loading: false
    });
}

const authSignUpStart = ( state, action ) => {
    return updateObject( state, { 
        // loading:true,
        error: null
     } ); // return my update state object //, loading: true
};

const authSignUpSuccess = (state, action) => {
    return updateObject( state, { // in a success case we want to set the token,user ID, error,loading
        showAddNewUserModel: false,
        error: null,
        showSuccessCase: true,
        loading: false,
       // loading: false // because we done!
     } );
};







const purchaseToastCancel = ( state, action ) => {
    return updateObject( state, {
        error: null,
         showSuccessCase: false,
        // showDeleteSuccessCase: false,
        loading: false,
        showAddTaskSuccessCase: false
    } ); 
};


const taskOpeningStart = ( state, action ) => {
 //   console.log("170");
    return updateObject( state, { loading: true } ); 
};


const taskOpeningSuccess = ( state, action ) => {
  //  console.log("176");

   // const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); 
        return updateObject( state, {
            showAddNewTaskModal:false,
            showAddTaskSuccessCase: true,
            loading: false

            //  tasks: state.tasks.concat( newTask ) 
          //  todo: state.todo.concat( newTask )
        });


};

const taskOpeningFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
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

        // case actionTypes.DELETE_USER_MODAL_INIT: return deleteUserModalInit( state, action );
        case actionTypes.DELETE_USER_MODAL_CLOSE: return deleteUserModalCancel( state, action );

        case actionTypes.TOAST_MODAL_CLOSE: return purchaseToastCancel( state, action );

        case actionTypes.TASK_OPENING_FOR_USER_START: return taskOpeningStart( state, action );
        case actionTypes.TASK_OPENING_FOR_USER_SUCCESS: return taskOpeningSuccess( state, action );
        case actionTypes.TASK_OPENING_FOR_USER_FAIL: return taskOpeningFail( state, action );


        case actionTypes.AUTH_LOGOUT_ADMIN: return logoutAdminReducers( state, action );


        default: return state;
    }
};

export default reducer;
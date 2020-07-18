import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = { // javascript object
    token: null, // if the token is null, the user is not authenticated! but if the token is not null, the user is authenticated
    userId: null,
    branchNumber: null,
    firstName: null,
    lastName: null,
    email: null,
    backgroundColor: null,
    profileImage: null,
    sidebarBackgroundColor:null,
    userPermissions: null,
    showSuccessCase: false, 
    userKey: null,
    error: null,
    loading: false,
    loadingForgotPassword: false,
    showSettingModel: false,
    authRedirectPath: '/'
};

const purchaseToastCancel = ( state, action ) => {
    return updateObject( state, { showSuccessCase: false} ); 
};


const authSignInStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } ); // return my update state object
};



const authSignInSuccess = (state, action) => {
    return updateObject( state, { // in a success case we want to set the token,user ID, error,loading
        token: action.idToken, // we expect to get this property on our action
        userId: action.userId,
        branchNumber: action.branchNumber,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        userPermissions: action.userPermissions,
        userKey: action.userKey,
        backgroundColor: action.backgroundColor,
        profileImage: action.profileImage,
        sidebarBackgroundColor:action.sidebarBackgroundColor,        
        error: null,
        loading: false // because we done!
     } );
};


const authSignInFail = (state, action) => { // get state and action
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}


const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null , branchNumber: null,
        firstName: null, lastName: null, email: null, userPermissions: null, userKey: null,
        backgroundColor: null, profileImage: null, sidebarBackgroundColor: null
    }); // we update the user to null so that made a logged in user is now lost again.
};


const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const purchaseSettingInit = ( state, action ) => {
    return updateObject( state, { showSettingModel: true } );
};

const purchaseSettingCancel = ( state, action ) => {
    return updateObject( state, { showSettingModel: false } ); 
};



const updateSettingUserStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const updateSettingUserFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const updateSettingUserSuccess = ( state, action ) => {
  //  const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
//   field: field,
//   updateData: updateData

    if(action.field === 'sidebarBackgroundColor'){
        return updateObject( state, {
            loading: false,
            sidebarBackgroundColor: action.updateData
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    }
   else if(action.field === 'backgroundColor'){
        return updateObject( state, {
            loading: false,
            backgroundColor: action.updateData
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    }
   else if(action.field === 'profileImage'){
        return updateObject( state, {
            loading: false,
            profileImage: action.updateData
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    }

};


const resetPasswordStart = ( state, action ) => {
    return updateObject( state, { loadingForgotPassword: true, error: null } ); 
};


const resetPasswordSuccess = ( state, action ) => {     
        return updateObject( state, {
            loadingForgotPassword: false,
            error: null
        });
    
};



const resetPasswordFail = ( state, action ) => {
    return updateObject( state, {
        loadingForgotPassword: false,
         error: action.error
        } );
};

const branchChangeForMasterSuccess = (state, action) => {
    return updateObject( state, { 
        branchNumber: action.newBranchNumber
     } );
};



//state = initialState - we must to do like that because otherwise it's undefined at the beginning 
const reducer = ( state = initialState, action ) => { // receiving the state and the action
    switch ( action.type ) {
        case actionTypes.AUTH_SIGN_IN_START: return authSignInStart(state, action);
        case actionTypes.AUTH_SIGN_IN_SUCCESS: return authSignInSuccess(state, action);
        case actionTypes.AUTH_SIGN_IN_FAIL: return authSignInFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

        case actionTypes.UPDATE_SETTING_USER_START: return updateSettingUserStart( state, action );
        case actionTypes.UPDATE_SETTING_USER_SUCCESS: return updateSettingUserSuccess( state, action );
        case actionTypes.UPDATE_SETTING_USER_FAIL: return updateSettingUserFail( state, action );

        case actionTypes.TOAST_MODAL_CLOSE: return purchaseToastCancel( state, action );

        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action); // return the update path when this function gets executed
        
        case actionTypes.SETTING_OPENING: return purchaseSettingInit( state, action );
        case actionTypes.SETTING_CLOSE: return purchaseSettingCancel( state, action );

        case actionTypes.RESET_PASSWORD_START: return resetPasswordStart( state, action );
        case actionTypes.RESET_PASSWORD_SUCCESS: return resetPasswordSuccess( state, action );
        case actionTypes.RESET_PASSWORD_FAIL: return resetPasswordFail( state, action );
        
        case actionTypes.BRANCH_CHANGE_FOR_MASTER_SUCCESS: return branchChangeForMasterSuccess( state, action );


        
        default: return state;
    }
};

export default reducer;
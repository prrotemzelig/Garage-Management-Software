import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = { // javascript object
    token: null, // if the token is null, the user is not authenticated! but if the token is not null, the user is authenticated
    userId: null,
    branchNumber: null,
    firstName: null,
    lastName: null,
    email: null,
    userPermissions: null,
    showSuccessCase: false, 
    userKey: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
    // TalpiotUsers: [],
    // GivatShaulUsers: [],
    // ModiinUsers: []
};

const purchaseToastCancel = ( state, action ) => {
    return updateObject( state, { showSuccessCase: false} ); 
};


const authSignInStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } ); // return my update state object
};

// const authSignUpStart = ( state, action ) => {
//     return updateObject( state, { error: null, loading: true } ); // return my update state object
// };



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
        
        error: null,
        loading: false // because we done!
     } );
};

// const authSignUpSuccess = (state, action) => {
//     return updateObject( state, { // in a success case we want to set the token,user ID, error,loading
//         error: null,
//         showSuccessCase: true,
//         loading: false // because we done!
//      } );
// };

const authSignInFail = (state, action) => { // get state and action
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

// const authSignUpFail = (state, action) => { // get state and action
//     return updateObject( state, {
//         error: action.error,
//         loading: false
//     });
// }

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null , branchNumber: null}); // we update the user to null so that made a logged in user is now lost again.
};


const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}




// const fetchUsersStart = ( state, action ) => { 
//     return updateObject( state, { loading: true } );
// };

// const fetchUsersSuccess = ( state, action ) => { 
//     if(action.BranchNumber === 'Talpiot'){
//         return updateObject( state, { 
//             TalpiotUsers: action.users,
//             loading: false
//         } );
//     }

//     else if(action.BranchNumber === 'GivatShaul'){
//         return updateObject( state, { 
//             GivatShaulUsers: action.users,
//             loading: false
//         } );
//     }

//     else if(action.BranchNumber === 'Modiin'){
//         return updateObject( state, { 
//             ModiinUsers: action.users,
//             loading: false
//         } );
//     }



// };

// const fetchUsersFail = ( state, action ) => { 
//     return updateObject( state, { loading: false } );
// };


//state = initialState - we must to do like that because otherwise it's undefined at the beginning 
const reducer = ( state = initialState, action ) => { // receiving the state and the action
    switch ( action.type ) {
        case actionTypes.AUTH_SIGN_IN_START: return authSignInStart(state, action);
        case actionTypes.AUTH_SIGN_IN_SUCCESS: return authSignInSuccess(state, action);
        case actionTypes.AUTH_SIGN_IN_FAIL: return authSignInFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

        // case actionTypes.AUTH_SIGN_UP_START: return authSignUpStart(state, action);
        // case actionTypes.AUTH_SIGN_UP_SUCCESS: return authSignUpSuccess(state, action);
        // case actionTypes.AUTH_SIGN_UP_FAIL: return authSignUpFail(state, action);

        case actionTypes.TOAST_MODAL_CLOSE: return purchaseToastCancel( state, action );


        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action); // return the update path when this function gets executed
        

        // case actionTypes.FETCH_USERS_START: return fetchUsersStart( state, action );
        // case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess( state, action );
        // case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail( state, action );
        
        default: return state;
    }
};

export default reducer;
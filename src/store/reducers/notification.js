import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    notification:[],
    loading: false

};


const notificationInit = ( state, action ) => {
    return updateObject( state );
};

const notificationOpeningStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const notificationOpeningSuccess = ( state, action ) => {
    const newNotification = updateObject( action.notificationData, { notificationKey: action.notificationId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
        return updateObject( state, {
            loading: false,
            notification: state.notification.concat( newNotification )
        });
    

};

const notificationOpeningFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchNotificationStart = ( state, action ) => { 
    return updateObject( state, { loading: true } );
};

const fetchNotificationSuccess = ( state, action ) => { 
    return updateObject( state, {
        notification: action.notification,
        loading: false
    } );
};

const fetchNotificationFail = ( state, action ) => { 
    return updateObject( state, { loading: false } );
};



const notificationDeleteStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const notificationDeleteFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const notificationDeleteSuccess = ( state, action ) => {
  //  const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    
        return updateObject( state, {
            notificationId:action.notificationId,
            loading: false
        });
  
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) { // here Ill write my different cases
        case actionTypes.NOTIFICATION_INIT: return notificationInit( state, action );
        case actionTypes.NOTIFICATION_OPENING_START: return notificationOpeningStart( state, action );
        case actionTypes.NOTIFICATION_OPENING_SUCCESS: return notificationOpeningSuccess( state, action )
        case actionTypes.NOTIFICATION_OPENING_FAIL: return notificationOpeningFail( state, action );

        case actionTypes.FETCH_NOTIFICATION_START: return fetchNotificationStart( state, action );
        case actionTypes.FETCH_NOTIFICATION_SUCCESS: return fetchNotificationSuccess( state, action );
        case actionTypes.FETCH_NOTIFICATION_FAIL: return fetchNotificationFail( state, action );

        case actionTypes.NOTIFICATION_DELETE_START: return notificationDeleteStart( state, action );
        case actionTypes.NOTIFICATION_DELETE_SUCCESS: return notificationDeleteFail( state, action );
        case actionTypes.NOTIFICATION_DELETE_FAIL: return notificationDeleteSuccess( state, action );

        default: return state; // return the current state
    }
};

export default reducer;
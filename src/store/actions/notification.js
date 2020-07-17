import * as actionTypes from './actionTypes';
import axios from '../../axios-cards';


export const purchaseNotificationInit = () => { 
    return {
        type: actionTypes.NOTIFICATION_OPENING 
    };
};


export const NotificationOpening = () => {  
    return dispatch => {
        dispatch( purchaseNotificationInit() ); 
        
    };
};

export const purchaseNotificationCancel = () => { 
    return {
        type: actionTypes.NOTIFICATION_CLOSE 
    };
};


export const NotificationClose = (  token ) => { 
    return dispatch => {
        dispatch( purchaseNotificationCancel() ); 
        
    };
};


export const notificationInit = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.NOTIFICATION_INIT // just return an action
    };
};


export const notificationOpeningSuccess = ( id, notificationData ) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    return { // here we return object where I have a type
        type: actionTypes.NOTIFICATION_OPENING_SUCCESS,
        notificationId: id, 
        notificationData: notificationData

    };
};

// this synchronous action creators

export const notificationOpeningFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.NOTIFICATION_OPENING_FAIL,
        error: error // pass on the error
    };
}


export const notificationOpeningStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.NOTIFICATION_OPENING_START
    };
};


//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const notificationOpening = ( notificationData, token,branchNumber, userKey) => { 

    return dispatch => {
        dispatch( notificationOpeningStart() ); // dispatch to the store
        //console.log(branchNumber+"  j  "+userKey);
        axios.post(branchNumber + '/users/' + userKey + '/notification.json' ,notificationData ) // send the HTTP request 

        .then( response => {// once we got the response so that we were successful, I will dispatch my 
         //   console.log(response.data)
            dispatch(notificationOpeningSuccess(response.data.name, notificationData)); 

        } )
        .catch( error => {
            dispatch(notificationOpeningFail(error));
            console.log(error);
        } );
    };
};

export const fetchNotificationSuccess = ( notification,node ) => { // we expect to get the cards as an argument


    return { // return a new object
        type: actionTypes.FETCH_NOTIFICATION_SUCCESS,
        notification: notification,
        node: node
    };
};

export const fetchNotificationFail = ( error ) => {// get a potential error
    return {
        type: actionTypes.FETCH_NOTIFICATION_FAIL,
        error: error
    };
};

export const fetchNotificationStart = () => {
    return {
        type: actionTypes.FETCH_NOTIFICATION_START
    };
};

export const fetchNotification = (token, userId,branchNumber,userKey) => { //here we run our async code
    return dispatch => {
        dispatch(fetchNotificationStart()); // we need to do that to set loading to true!
       // console.log(branchNumber);
       // console.log(userKey);
    //    const queryParams = '?auth=' + token ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.get(branchNumber + '/users/'+ userKey +'/notification.json' ) // we use axios to get my cards, // this referring to that cards node on my backend (firebase node)
            .then( res => { // when the data is there (in the node of cards in firebase)
               const fetchedNotification = [] ; 
            //  console.log(res.data);
        
                for ( let key in res.data ) { //in the cards node in the firebase, I'm not getting an array but I'll get back a javascript object
                fetchedNotification.push( {
                        ...res.data[key], // here I want to push  res.ata for a given key, accessing the value which of course is the card
                        id: key //to not lose the IDs though which are emy keys here I'll instead push a new object into this fetchedCards array where I will distribute the propertied off the Card object I've fetched from firebase with the spread operator and add 1 new property -> ID which is the ket because remember the key is in this object we've fetched
                    } );
            }

                dispatch(fetchNotificationSuccess(fetchedNotification,"notification"));
            } )
            .catch( err => { // catch any potential errors. and show this on the screen by wrap withErrorHandler
                console.log(err);
                dispatch(fetchNotificationFail(err));
            } );
    };
};



export const notificationDeleteStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.NOTIFICATION_DELETE_START
    };
};

// this synchronous action creators
export const notificationDeleteSuccess = ( id) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.NOTIFICATION_DELETE_SUCCESS,
        notificationId: id, 
    };
};

// this synchronous action creators
export const notificationDeleteFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.NOTIFICATION_DELETE_FAIL,
        error: error // pass on the error
    };
}

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.

export const notificationDelete = ( token,branchNumber,userKey,notificationKey ,userId) => { 
 
    return dispatch => {
        dispatch( notificationDeleteStart() ); // dispatch to the store
        axios.delete(branchNumber + '/users/'+ userKey +'/notification/' + notificationKey + '.json?x-http-method-override=DELETE',null )

        .then(res => {
      //  console.log(res.data);
        dispatch(notificationDeleteSuccess(res.data)); 
        dispatch(fetchNotification(token, userId, branchNumber,userKey));

        })
        .catch( error => {
            dispatch(notificationDeleteFail(error));
            console.log(error);
        } );

    };
};

export const notificationUpdateStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.NOTIFICATION_UPDATE_START
    };
};

// this synchronous action creators
export const notificationUpdateSuccess = ( id, notificationData) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.NOTIFICATION_UPDATE_SUCCESS,
        notificationId: id, 
        notificationData: notificationData,
    };
};

// this synchronous action creators
export const notificationUpdateFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.NOTIFICATION_UPDATE_FAIL,
        error: error // pass on the error
    };
}

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const notificationUpdate = ( updateData, token,branchNumber,userKey ,userId,notificationKey) => { 


    return dispatch => {
        dispatch( notificationUpdateStart() ); // dispatch to the store
        //console.log(branchNumber +" "+userKey +" "+notificationKey+" "+ updateData);
       // console.log( updateData);
        axios.patch(branchNumber + '/users/'+ userKey +'/notification/'+notificationKey+'/.json' , updateData)

        .then(res => {
       // console.log(res.data);
        dispatch(notificationUpdateSuccess(res.data.name, updateData)); 
        })
        .catch( error => {
            dispatch(notificationUpdateFail(error));
            console.log(error);
        } );

    };
};
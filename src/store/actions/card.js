import * as actionTypes from './actionTypes';
import * as actions from './index';

import axios from '../../axios-cards';
import axios2 from 'axios';
var async = require("async");


export const purchaseSetCurrentCardKey = () => { 
    return {
        type: actionTypes.PURCHASE_SET_CURRENT_CARD_KEY 
    };
};


export const setCurrentCardKey = () => {  
    return dispatch => {
        dispatch( purchaseSetCurrentCardKey() ); 
        
    };
};

export const purchaseWorksInit = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.PURCHASE_WORKS_INIT // just return an action
    };
};

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const workModalOpening = () => {  //token
    return dispatch => {
        dispatch( purchaseWorksInit() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};

export const purchaseWorksCancel = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.WORKS_MODAL_CLOSE 
    };
};




//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const workModalClose = (  token ) => { 
    return dispatch => {
        dispatch( purchaseWorksCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};

export const purchaseToastCancel = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.TOAST_MODAL_CLOSE 
    };
};


export const toastModalClose = (  ) => { 
    return dispatch => {
        dispatch( purchaseToastCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
    };
};

export const purchasePartsInit = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.PURCHASE_PARTS_INIT // just return an action
    };
};

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const partModalOpening = () => {  //token
    return dispatch => {
        dispatch( purchasePartsInit() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};

export const purchasePartsCancel = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.PARTS_MODAL_CLOSE // just return an action
    };
};


//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const partModalClose = (  token ) => { 
    return dispatch => {
        dispatch( purchasePartsCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};

// this synchronous action creators
export const cardUpdateSuccess = ( id, cardData ) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.CARD_UPDATE_SUCCESS,
        cardId: id, 
        //showUpdateSuccessCase: true,
        cardData: cardData 
    };
};

// this synchronous action creators
export const cardUpdateFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.CARD_UPDATE_FAIL,
        error: error // pass on the error
    };
}

export const cardUpdateStart = () => {
    return {
        type: actionTypes.CARD_UPDATE_START
    };
};



//garageReplacementVehicle,rentalCompanyReplacementVehicle,

export const cardUpdate = ( carData,cardData,customerData,garageReplacementData,rentalCompanyReplacementData,alternateVehicleTaken, token,branchNumber,identifiedCardID,userId ) => { 
 //let i = 0;
    return dispatch => {
        dispatch( cardUpdateStart() ); 
        axios.patch(branchNumber+'/cards/'+identifiedCardID+'/carData.json?auth=' + token, carData)
        .then(res => {
        dispatch(cardUpdateSuccess(res.data.name, carData)); 
        dispatch(fetchCards(token, userId, branchNumber));  // maybe we dont need this
       // i+=1;
        })
        .catch( error => {
            dispatch(cardUpdateFail(error));
        } );

       axios.patch(branchNumber+'/cards/'+identifiedCardID+'/cardData.json?auth=' + token, cardData)
        .then(res => {
        dispatch(cardUpdateSuccess(res.data.name, cardData)); 
       // i+=1;
        })
        .catch( error => {
            dispatch(cardUpdateFail(error));
        } );


        axios.patch(branchNumber+'/cards/'+identifiedCardID+'/customerData.json?auth=' + token, customerData)
        .then(res => {
        dispatch(cardUpdateSuccess(res.data.name, customerData)); 
       // i+=1;
        })
        .catch( error => {
            dispatch(cardUpdateFail(error));
        } );

        axios.patch(branchNumber+'/cards/'+identifiedCardID+'/garageReplacementData.json?auth=' + token, garageReplacementData)
        .then(res => {
        dispatch(cardUpdateSuccess(res.data.name, garageReplacementData)); 
               // i+=1;
        })
        .catch( error => {
            dispatch(cardUpdateFail(error));
        } );
        
        axios.patch(branchNumber+'/cards/'+identifiedCardID+'/rentalCompanyReplacementData.json?auth=' + token, rentalCompanyReplacementData)
        .then(res => {
        dispatch(cardUpdateSuccess(res.data.name, rentalCompanyReplacementData)); 
        })
        .catch( error => {
            dispatch(cardUpdateFail(error));
        } );

        let finalTag = '' ;
        finalTag = {  alternateVehicleTaken: alternateVehicleTaken};
        axios.patch(branchNumber+'/cards/'+identifiedCardID+'.json?auth=' + token, finalTag)
        .then(res => {
        dispatch(cardUpdateSuccess(res.data.name, alternateVehicleTaken)); 
        })
        .catch( error => {
            console.log(error);
            dispatch(cardUpdateFail(error));
        } )

        .finally(function(){
             alert('כרטיס עודכן בהצלחה');

        });
        
    };
};

// this synchronous action creators
export const cardOpeningSuccess = ( id, cardData, node,currentTicketNumber ) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.CARD_OPENING_SUCCESS,
        cardId: id, 
        cardData: cardData ,
        node: node,
        currentCardKey: id,
        currentTicketNumber: currentTicketNumber
    };
};

// this synchronous action creators
export const cardOpeningFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.CARD_OPENING_FAIL,
        error: error 
    };
}

export const cardOpeningStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.CARD_OPENING_START
    };
};

export const cardOpening = ( cardData,userId ,token,branchNumber,node ) => { 
    return dispatch => {
        dispatch( cardOpeningStart() ); // dispatch to the store
        // axios.post(branchNumber + '/cards.json?auth=' + token, cardData ) // send the HTTP request 

        axios.post(branchNumber + '/' + node + '.json?auth=' + token, cardData ) // send the HTTP request 
        .then( response => {// once we got the response so that we were successful, I will dispatch my 
            console.log(response);
            dispatch(cardOpeningSuccess(response.data.name, cardData, node,cardData.cardData.ticketNumber)); 
            dispatch(fetchCards(token, userId, branchNumber));  // maybe we dont need this
             dispatch(GetAllCardData(token,branchNumber ,userId,'cards', response.data.name)); 
             dispatch(actions.getImages(userId ,token,branchNumber,response.data.name,cardData.cardData.ticketNumber,'/images'));
             dispatch(actions.getDocs(userId ,token,branchNumber,response.data.name,cardData.cardData.ticketNumber,'/docs'));


            if(node==='cards'){
                alert('כרטיס נשמר בהצלחה');
            }
            else if(node==='closeCards'){
                alert('כרטיס נסגר בהצלחה');
            }

            // this.props.history.push( '/' ); // here we navigate away
        } )
        .catch( error => {
            console.log(error);
            dispatch(cardOpeningFail(error));
        } )
        
        .finally(function(){
            console.log("189");
            dispatch(fetchCards(token, userId, branchNumber));  // maybe we dont need this
        });
    };
};



export const purchaseInit = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.PURCHASE_INIT // just return an action
    };
};


export const fetchCardsSuccess = ( cards,node ) => { // we expect to get the cards as an argument
    return { // return a new object
        type: actionTypes.FETCH_CARDS_SUCCESS,
        cards: cards,
        node: node
    };
};

export const fetchCardsFail = ( error ) => {// get a potential error
    return {
        type: actionTypes.FETCH_CARDS_FAIL,
        error: error
    };
};

export const fetchCardsStart = () => {
    return {
        type: actionTypes.FETCH_CARDS_START
    };
};

export const fetchCards = (token, userId,branchNumber) => { //here we run our async code
    return dispatch => {
        dispatch(fetchCardsStart()); // we need to do that to set loading to true!

        const queryParams = '?auth=' + token ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.get(branchNumber + '/cards.json' + queryParams) // we use axios to get my cards, // this referring to that cards node on my backend (firebase node)
            
            .then( res => { // when the data is there (in the node of cards in firebase)
                // console.log(res);

                // so with the response I'm getting, I want to set some state which actually contain my cards and then outputs them.
                const fetchedCards = []; 
                //note!!! -> console.log(res.data); -> res.data will hold the data we get from firebase 
                //and I get back a javascript object where the keys are simply these unique IDs firebase generated for us and the value (we have the IDs as properties)
                //in the loop I turn my cards object into an array 
                for ( let key in res.data ) { //in the cards node in the firebase, I'm not getting an array but I'll get back a javascript object
                    fetchedCards.push( {
                        ...res.data[key], // here I want to push  res.ata for a given key, accessing the value which of course is the card
                        id: key //to not lose the IDs though which are emy keys here I'll instead push a new object into this fetchedCards array where I will distribute the propertied off the Card object I've fetched from firebase with the spread operator and add 1 new property -> ID which is the ket because remember the key is in this object we've fetched
                    } );
                }

                dispatch(fetchCardsSuccess(fetchedCards,'cards'));
            } )
            .catch( err => { // catch any potential errors. and show this on the screen by wrap withErrorHandler
                dispatch(fetchCardsFail(err));
            } );
    };
};



export const fetchCloseCards = (token, userId,branchNumber) => { 
    return dispatch => {
        dispatch(fetchCardsStart()); 

        const queryParams = '?auth=' + token ; 
        axios.get(branchNumber + '/closeCards.json' + queryParams) 
            
            .then( res => { 
                // console.log(res);

                const fetchedCards = []; 
          
                for ( let key in res.data ) {
                    fetchedCards.push( {
                        ...res.data[key], 
                        id: key 
                    } );
                }
                dispatch(fetchCardsSuccess(fetchedCards,'closeCards'));
            } )
            .catch( err => { 
                dispatch(fetchCardsFail(err));
            } );
    };
};
export const cardDeleteStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.CARD_DELETE_START
    };
};

// this synchronous action creators
export const cardDeleteSuccess = ( id,node) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.CARD_DELETE_SUCCESS,
        node: node
        //taskId: id, 
        //taskData: taskData,
       // list: list 
    };
};

// this synchronous action creators
export const cardDeleteFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.CARD_DELETE_FAIL,
        error: error // pass on the error
    };
}

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.

export const cardDelete = ( token,branchNumber,cardKey ,node,userId) => { 

    return dispatch => {
        dispatch(cardDeleteStart() ); // dispatch to the store
        //'/carData.json?auth=' + token,

        const queryParams = '?auth=' + token ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.delete(branchNumber + '/' + node + '/'+ cardKey + '.json' + queryParams,null )

        .then(res => {
        dispatch(cardDeleteSuccess(res,node)); 
        dispatch(fetchCards(token, userId, branchNumber));  // maybe we dont need this
     
        })
        .catch( error => {
            console.log(error);
            dispatch(cardDeleteFail(error));
        } );

    };
};

// this synchronous action creators
export const workOrPartsOpeningFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.WORK_OR_PARTS_ADD_FAIL,
        error: error // pass on the error
    };
}

//id, taskData,list
export const workOrPartsOpeningSuccess = (  ) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.

    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.WORK_OR_PARTS_ADD_SUCCESS,
    //    kind: kind
      //  taskId: id, 
       // taskData: taskData ,
       // list: list
    };
};

export const workOrPartsOpeningStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.WORK_OR_PARTS_ADD_START
    };
};

// const queryParams = '?auth=' + response.data.idToken ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
// axios2.post(branchNumber + '/users.json' + queryParams , dataBaseUser )

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.


export const workOrPartsOpening = ( formData, token,branchNumber, userId,kind,cardKey ) => {  //userKey

    return dispatch => {
 
        dispatch( workOrPartsOpeningStart() ); // dispatch to the store
        axios.post(branchNumber + '/cards/' + cardKey + '/' + kind + '.json?auth=' + token ,formData ) // send the HTTP request 

        .then( response => {// once we got the response so that we were successful, I will dispatch my 
            // console.log(response.data)
            dispatch(workOrPartsOpeningSuccess());  //check if the success case ok! //response.data.name, formData,kind
            dispatch(fetchCards(token, userId, branchNumber)); 
            dispatch(GetAllCardData(token,branchNumber ,userId,'cards', cardKey)); 

            // this.props.history.push( '/' ); // here we navigate away
        } )
        .catch( error => {
            dispatch(workOrPartsOpeningFail(error));
            console.log(error);
        } );
    };
};

//cardData,carData , customerData, workData , partData
export const GetAllCardDataSuccess = (workData,partsData) => { // we expect to get the cards as an argument
    return { // return a new object
        type: actionTypes.GET_ALL_CARD_DATA_SUCCESS,
        workData: workData,
        partsData: partsData
    };
};

export const GetAllCardDataFail = ( error ) => {// get a potential error
    return {
        type: actionTypes.GET_ALL_CARD_DATA_FAIL,
        error: error
    };
};

export const GetAllCardDataStart = () => {
    return {
        type: actionTypes.GET_ALL_CARD_DATA_START
    };
};

export const GetAllCardData = (token,branchNumber,userId, kind,cardKey) => { //here we run our async code
    return dispatch => {
        dispatch(GetAllCardDataStart()); // we need to do that to set loading to true!

        const queryParams = '?auth=' + token ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.get(branchNumber + '/' + kind + '/' + cardKey + '.json' + queryParams) 
            
            .then( res => { 
                // console.log(res);
           //     const openCard = {carData: {},cardData: {},customerData:{},workData: {},partData: {}}; 
              const workData = [] ; 
              const partsData = [] ; 

              if(res.data != null){
                for ( let key in res.data.workData ) { //in the cards node in the firebase, I'm not getting an array but I'll get back a javascript object
                workData.push( {
                        ...res.data.workData[key], // here I want to push  res.ata for a given key, accessing the value which of course is the card
                        workKey: key //to not lose the IDs though which are emy keys here I'll instead push a new object into this fetchedCards array where I will distribute the propertied off the Card object I've fetched from firebase with the spread operator and add 1 new property -> ID which is the ket because remember the key is in this object we've fetched
                    } );
                }
            }

            if(res.data != null){
                for ( let key in res.data.partsData ) { //in the cards node in the firebase, I'm not getting an array but I'll get back a javascript object
                partsData.push( {
                        ...res.data.partsData[key], // here I want to push  res.ata for a given key, accessing the value which of course is the card
                        workKey: key //to not lose the IDs though which are emy keys here I'll instead push a new object into this fetchedCards array where I will distribute the propertied off the Card object I've fetched from firebase with the spread operator and add 1 new property -> ID which is the ket because remember the key is in this object we've fetched
                    } );
                }
            }
            // console.log(workData);
            // console.log(partsData);
          dispatch(GetAllCardDataSuccess(workData,partsData ));

            //dispatch(GetAllCardDataSuccess(cardData,carData , customerData, workData ));
            } )
            .catch( err => { // catch any potential errors. and show this on the screen by wrap withErrorHandler
                console.log(err);
                dispatch(GetAllCardDataFail(err));
            } );
    };
};

export const WorkOrPartDeleteStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.WORK_OR_PARTS_DELETE_START
    };
};

// this synchronous action creators
export const WorkOrPartDeleteSuccess = ( id,list) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.WORK_OR_PARTS_DELETE_SUCCESS,
        taskId: id, 
        //taskData: taskData,
        list: list 
    };
};

// this synchronous action creators
export const WorkOrPartDeleteFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.WORK_OR_PARTS_DELETE_FAIL,
        error: error // pass on the error
    };
}

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.

export const WorkOrPartDelete = (token,branchNumber,cardKey,itemKey,list,userId) => {   // token,branchNumber,userKey,taskKey ,list,userId

    return dispatch => {
        dispatch( WorkOrPartDeleteStart() ); // dispatch to the store
        //'/carData.json?auth=' + token,

        const queryParams = '?auth=' + token ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
        //?x-http-method-override=DELETE
             //   axios.delete(branchNumber + '/' + node + '/'+ cardKey + '.json' + queryParams,null )
        axios.delete(branchNumber + '/cards/'+ cardKey +'/' + list  + '/' + itemKey + '.json' + queryParams ,null ) //x-http-method-override=DELETE

        .then(res => {
        dispatch(WorkOrPartDeleteSuccess(res,list)); 
        dispatch(GetAllCardData(token,branchNumber ,userId,'cards', cardKey)); 

        })
        .catch( error => {
            dispatch(WorkOrPartDeleteFail(error));
            console.log(error);
        } );

    };
};


export const workOrPartUpdateStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.WORK_OR_PARTS_UPDATE_START
    };
};


export const workOrPartUpdateSuccess = ( id, cardData ) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.WORK_OR_PARTS_UPDATE_SUCCESS
      //  cardId: id, 
       // cardData: cardData 
    };
};

export const workOrPartUpdateFail = ( error ) => { 
    return {
        type: actionTypes.WORK_OR_PARTS_UPDATE_FAIL,
        error: error 
    };
}




export const workOrPartUpdate = ( itemData, token,branchNumber,userId,list,kind,cardKey,itemKey ) => { 

    return dispatch => {
        dispatch( workOrPartUpdateStart() );

        axios.patch(branchNumber+'/' + list + '/'+ cardKey + '/' + kind + '/' + itemKey + '/.json?auth=' + token, itemData) //'/' +'/carData.json?auth=' + token
        .then(res => {            
            dispatch(workOrPartUpdateSuccess()); 
            dispatch(fetchCards(token, userId, branchNumber)); 
            dispatch(GetAllCardData(token,branchNumber ,userId,'cards', cardKey)); 

        })
        .catch( error => {
            dispatch(workOrPartUpdateFail(error));
            console.log(error);
        } );
    };
};








export const changeVehicleNumberStart = () => {
    return {
        type: actionTypes.CHANGE_VEHICLE_NUMBER_START
    };
};


export const changeVehicleNumberSuccess = ( id, cardData ) => { 
    return { 
        type: actionTypes.CHANGE_VEHICLE_NUMBER_SUCCESS
  
    };
};

export const changeVehicleNumberFail = ( error ) => { 
    return {
        type: actionTypes.CHANGE_VEHICLE_NUMBER_FAIL,
        error: error 
    };
}


export const changeVehicleNumber = ( newNumberInput, token, branchNumber,identifiedCardID,userId    ) => { 
    let finalTag = '' ;
    finalTag = {  licenseNumber: newNumberInput};

    return dispatch => {
        dispatch( changeVehicleNumberStart() );
        axios.patch(branchNumber+'/cards/'+ identifiedCardID + '/cardData/.json?auth=' + token , finalTag) 
        .then(res => {            
            dispatch(changeVehicleNumberSuccess()); 
            dispatch(fetchCards(token, userId, branchNumber)); 
            dispatch(GetAllCardData(token,branchNumber ,userId,'cards', identifiedCardID)); 

        })
        .catch( error => {
            dispatch(changeVehicleNumberFail(error));
        } );
    };
};









export const markCardIsOpenStart = () => {
    return {
        type: actionTypes.MARK_CARD_IS_OPEN_START
    };
};


export const markCardIsOpenSuccess = ( id, cardData ) => { 
    return { 
        type: actionTypes.MARK_CARD_IS_OPEN_SUCCESS
  
    };
};

export const markCardIsOpenFail = ( error ) => { 
    return {
        type: actionTypes.MARK_CARD_IS_OPEN_FAIL,
        error: error 
    };
}

export const markCardIsOpen = ( token, branchNumber,userId,identifiedCardID,firstName,lastName ) => { 
    // console.log(token);
    // console.log(branchNumber);
    // console.log(identifiedCardID);
    // console.log(userId);
    // console.log(firstName);
    // console.log(lastName);
    let isOpen = '' ;
    let whoOpened = '' ;
    isOpen = {  isTheCardOpenByUser: true};
    whoOpened = {  byWhoTheCardOpen: firstName + " " + lastName};

    return dispatch => {
        dispatch( markCardIsOpenStart() );
        axios.patch(branchNumber+'/cards/'+ identifiedCardID + '/.json?auth=' + token , isOpen) 
        .then(res => {            
            dispatch(markCardIsOpenSuccess()); 
            dispatch(fetchCards(token, userId, branchNumber)); 
            dispatch(GetAllCardData(token,branchNumber ,userId,'cards', identifiedCardID)); 

        })
        .catch( error => {
            dispatch(markCardIsOpenFail(error));
        } );


        axios.patch(branchNumber+'/cards/'+ identifiedCardID + '/.json?auth=' + token , whoOpened) 
        .then(res => {            
            dispatch(markCardIsOpenSuccess()); 
            dispatch(fetchCards(token, userId, branchNumber)); 
            dispatch(GetAllCardData(token,branchNumber ,userId,'cards', identifiedCardID)); 

        })
        .catch( error => {
            dispatch(markCardIsOpenFail(error));
        } );
    };
};





export const markCardIsClosedStart = () => {
    return {
        type: actionTypes.MARK_CARD_IS_CLOSED_START
    };
};


export const markCardIsClosedSuccess = ( id, cardData ) => { 
    return { 
        type: actionTypes.MARK_CARD_IS_CLOSED_SUCCESS
  
    };
};

export const markCardIsClosedFail = ( error ) => { 
    return {
        type: actionTypes.MARK_CARD_IS_CLOSED_FAIL,
        error: error 
    };
}

export const markCardIsClosed = ( token, branchNumber,userId,identifiedCardID) => { 
    let isOpen = '' ;
    let whoOpened = '' ;
    isOpen = {  isTheCardOpenByUser: false};
    whoOpened = {  byWhoTheCardOpen: ''};

    // console.log(token);
    // console.log(branchNumber);
    // console.log(userId);
    // console.log(identifiedCardID);

    return dispatch => {
        const requestOne = axios2.patch("https://garage-management-softwa.firebaseio.com/" + branchNumber+'/cards/'+ identifiedCardID + '/.json?auth=' + token , isOpen);
     //   const requestTwo = axios2.patch("https://garage-management-softwa.firebaseio.com/" + branchNumber+'/cards/'+ identifiedCardID + '/.json?auth=' + token , whoOpened);
    //    async.eachLimit([requestOne,requestTwo],1,function(file,callback){
        // dispatch( markCardIsClosedStart() );
        axios.patch(branchNumber+'/cards/'+ identifiedCardID + '/.json?auth=' + token , isOpen) 
    //  axios2.all([file]) //[requestOne, requestTwo]
        .then(axios2.spread((...responses) => {   
            dispatch( markCardIsClosedStart() );
           // console.log("779");

            const responseOne = responses[0]
           // const responseTwo = responses[1]
            dispatch(markCardIsClosedSuccess()); 
            dispatch(fetchCards(token, userId, branchNumber)); 
            dispatch(GetAllCardData(token,branchNumber ,userId,'cards', identifiedCardID)); 
           // this.forceUpdate();
         //   callback(null);

        }))
        .catch( error => {
            console.log(error);
            dispatch(markCardIsClosedFail(error));
           // callback(null);

        } );


       // axios.patch(branchNumber+'/cards/'+ identifiedCardID + '/.json?auth=' + token , whoOpened) 
        // .then(res => {            
        //     dispatch(markCardIsClosedSuccess()); 
        //     dispatch(fetchCards(token, userId, branchNumber)); 
        //     dispatch(GetAllCardData(token,branchNumber ,userId,'cards', identifiedCardID)); 

        // })
        // .catch( error => {
        //     dispatch(markCardIsClosedFail(error));
        // } );
   // });
        }
};


export const logoutCardReducers = () => { 
    return {
        type: actionTypes.AUTH_LOGOUT_CARD
    };
};
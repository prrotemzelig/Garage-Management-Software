import * as actionTypes from './actionTypes';
import axios from '../../axios-cards';


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
        type: actionTypes.WORKS_MODAL_CLOSE // just return an action
    };
};


//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const workModalClose = (  token ) => { 
    return dispatch => {
        dispatch( purchaseWorksCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
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
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.CARD_UPDATE_START
    };
};

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const cardUpdate = ( carData,cardData,customerData, token,branchNumber,identifiedCardID ) => { 
  //  console.log(branchNumber);
    return dispatch => {
        dispatch( cardUpdateStart() ); // dispatch to the store
        axios.patch(branchNumber+'/cards/'+identifiedCardID+'/carData.json?auth=' + token, carData)
        .then(res => {
      //  console.log(res.data.name);
        dispatch(cardUpdateSuccess(res.data.name, carData)); 

        })
        .catch( error => {
            dispatch(cardUpdateFail(error));

        } );

       axios.patch(branchNumber+'/cards/'+identifiedCardID+'/cardData.json?auth=' + token, cardData)
        .then(res => {
      //  console.log(res.data.name);
        dispatch(cardUpdateSuccess(res.data.name, cardData)); 

        })
        .catch( error => {
            dispatch(cardUpdateFail(error));


        } );


        axios.patch(branchNumber+'/cards/'+identifiedCardID+'/customerData.json?auth=' + token, customerData)
        .then(res => {
      //  console.log(res.data.name);
        dispatch(cardUpdateSuccess(res.data.name, customerData)); 

        })
        .catch( error => {
            dispatch(cardUpdateFail(error));

        } );
    };
};

// this synchronous action creators
export const cardOpeningSuccess = ( id, cardData, node ) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.CARD_OPENING_SUCCESS,
        cardId: id, 
        cardData: cardData ,
        node: node
    };
};

// this synchronous action creators
export const cardOpeningFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.CARD_OPENING_FAIL,
        error: error // pass on the error
    };
}

export const cardOpeningStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.CARD_OPENING_START
    };
};
export const cardOpening = ( cardData, token,branchNumber,node ) => { 
    return dispatch => {
        dispatch( cardOpeningStart() ); // dispatch to the store
        // axios.post(branchNumber + '/cards.json?auth=' + token, cardData ) // send the HTTP request 

        axios.post(branchNumber + '/' + node + '.json?auth=' + token, cardData ) // send the HTTP request 
        .then( response => {// once we got the response so that we were successful, I will dispatch my 
            console.log(response.data)
            dispatch(cardOpeningSuccess(response.data.name, cardData, node)); 

            // this.props.history.push( '/' ); // here we navigate away
        } )
        .catch( error => {
            dispatch(cardOpeningFail(error));

        } );
    };
};

export const purchaseInit = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.PURCHASE_INIT // just return an action
    };
};


export const fetchCardsSuccess = ( cards ) => { // we expect to get the cards as an argument
    return { // return a new object
        type: actionTypes.FETCH_CARDS_SUCCESS,
        cards: cards
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
                console.log(res);

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

                dispatch(fetchCardsSuccess(fetchedCards));
            } )
            .catch( err => { // catch any potential errors. and show this on the screen by wrap withErrorHandler
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
export const cardDeleteSuccess = ( id,list) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.CARD_DELETE_SUCCESS,
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
        console.log("244");

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
            console.log(response.data)
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
                console.log(res);
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
        console.log(res);
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
            console.log(res)
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


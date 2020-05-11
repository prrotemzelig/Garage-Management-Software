import * as actionTypes from './actionTypes';
import axios from '../../axios-cards';


export const purchaseWorksInit = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.PURCHASE_WORKS_INIT // just return an action
    };
};

export const purchaseWorksCancel = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.WORKS_MODAL_CLOSE // just return an action
    };
};

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const workModalOpening = (  token ) => { 
    return dispatch => {
        dispatch( purchaseWorksInit() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};


//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const workModalClose = (  token ) => { 
    return dispatch => {
        dispatch( purchaseWorksCancel() ); // dispatch to the store - we need to do that to set setModalShow to true!
        
    };
};



// this synchronous action creators
export const cardOpeningSuccess = ( id, cardData ) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.CARD_OPENING_SUCCESS,
        cardId: id, 
        cardData: cardData 
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


//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const cardOpening = ( cardData, token,branchNumber ) => { 
    return dispatch => {
        dispatch( cardOpeningStart() ); // dispatch to the store
        axios.post(branchNumber + '/cards.json?auth=' + token, cardData ) // send the HTTP request 
        .then( response => {// once we got the response so that we were successful, I will dispatch my 
            console.log(response.data)
            dispatch(cardOpeningSuccess(response.data.name, cardData)); 

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
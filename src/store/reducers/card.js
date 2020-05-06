import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cards: [], // all my cards
    loading: false, // we want to know if we are in a process of open new card or if we are done - true if we done open card **
    purchased: false,
//    modalShow: false,
    showWorkModel: false
//    showModal: false
    //showWorkModel: false
 
};

const purchaseWorksInit = ( state, action ) => {
    return updateObject( state, { showWorkModel: true } );
};

const purchaseWorksCancel = ( state, action ) => {
    return updateObject( state, { showWorkModel: false } ); 
};

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const cardOpeningStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const cardOpeningSuccess = ( state, action ) => {
    const newCard = updateObject( action.cardData, { id: action.cardId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    return updateObject( state, {
        loading: false,
        purchased: true,
        cards: state.cards.concat( newCard ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
    } );
};



const cardOpeningFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchCardsStart = ( state, action ) => { 
    return updateObject( state, { loading: true } );
};

const fetchCardsSuccess = ( state, action ) => { 
    return updateObject( state, { // here we want to stor the cards we fetched so we need to get the state 
        cards: action.cards,
        loading: false
    } );
};

const fetchCardsFail = ( state, action ) => { 
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) { // here Ill write my different cases
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case actionTypes.CARD_OPENING_START: return cardOpeningStart( state, action );
        case actionTypes.CARD_OPENING_SUCCESS: return cardOpeningSuccess( state, action )
        case actionTypes.CARD_OPENING_FAIL: return cardOpeningFail( state, action );
        case actionTypes.FETCH_CARDS_START: return fetchCardsStart( state, action );
        case actionTypes.FETCH_CARDS_SUCCESS: return fetchCardsSuccess( state, action );
        case actionTypes.FETCH_CARDS_FAIL: return fetchCardsFail( state, action );

        case actionTypes.PURCHASE_WORKS_INIT: return purchaseWorksInit( state, action );
        case actionTypes.WORKS_MODAL_CLOSE: return purchaseWorksCancel( state, action );

        
        default: return state; // return the current state
    }
};

export default reducer;
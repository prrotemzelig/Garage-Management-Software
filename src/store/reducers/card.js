import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cards: [], // all my cards
    closeCards: [],
    loading: false, // we want to know if we are in a process of open new card or if we are done - true if we done open card **
    purchased: false,
    showWorkModel: false,   
    showPartModel: false,
    showSuccessCase: false,   
    showCloseCardSuccessCase: false,
    showUpdateSuccessCase: false,
    workData: [],
    partsData: []

};

const purchaseWorksInit = ( state, action ) => {
    return updateObject( state, { showWorkModel: true } );
};

const purchaseWorksCancel = ( state, action ) => {
    return updateObject( state, { showWorkModel: false } ); 
};

const purchaseToastCancel = ( state, action ) => {
    return updateObject( state, { showSuccessCase: false ,showUpdateSuccessCase: false,showCloseCardSuccessCase: false} ); 
};



const purchasePartsInit = ( state, action ) => {
    return updateObject( state, { showPartModel: true } );
};

const purchasePartsCancel = ( state, action ) => {
    return updateObject( state, { showPartModel: false } ); 
};

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const cardOpeningStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const cardOpeningSuccess = ( state, action ) => {
    console.log("49");
    if(action.node === 'cards'){
        console.log("51");
    const newCard = updateObject( action.cardData, { id: action.cardId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    return updateObject( state, {
        loading: false,
        //purchased: true,
        showSuccessCase: true,
        cards: state.cards.concat( newCard ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
    } );
}
else if (action.node === 'closeCards'){
    console.log("61");
    const newCard = updateObject( action.cardData, { id: action.cardId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    return updateObject( state, {
        loading: false,
      //  purchased: true,
        showCloseCardSuccessCase: true,
        closeCards: state.cards.concat( newCard ) 
        //cards: state.cards.concat( newCard ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
    } );
}

};

const cardOpeningFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};



const fetchCardsStart = ( state, action ) => { 
    return updateObject( state, { loading: true } );
};

const fetchCardsSuccess = ( state, action ) => { 
    if(action.node=== 'cards'){
    return updateObject( state, { // here we want to stor the cards we fetched so we need to get the state 
        cards: action.cards,
        loading: false
    } );
}

else if(action.node=== 'closeCards'){
    return updateObject( state, { // here we want to stor the cards we fetched so we need to get the state 
        closeCards: action.cards,
        loading: false
    } );
}
};

const fetchCardsFail = ( state, action ) => { 
    return updateObject( state, { loading: false } );
};



const cardUpdateStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const cardUpdateSuccess = ( state, action ) => {
    //const newCard = updateObject( action.cardData, { id: action.cardId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    return updateObject( state, {
        loading: false,
        showUpdateSuccessCase: true
      //  purchased: true,
    } );
};

const cardUpdateFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const cardDeleteStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const cardDeleteFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const cardDeleteSuccess = ( state, action ) => {
    //const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
     // onlt need to update the old cards
    if(action.node === 'cards'){
        return updateObject( state, {
            loading: false,
            showSuccessCase: true
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    }
};


const workOrPartsOpeningStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const workOrPartsOpeningSuccess = ( state, action ) => {
   // if(action.kind === 'wordData'){
        return updateObject( state, {
            loading: false
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
  //  }

};


const workOrPartsOpeningFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const workOrPartUpdateStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const workOrPartUpdateSuccess = ( state, action ) => {
    //const newCard = updateObject( action.cardData, { id: action.cardId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    return updateObject( state, {
        loading: false
    } );
};

const workOrPartUpdateFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const GetAllCardDataStart = ( state, action ) => { 
    return updateObject( state, { loading: true } );
};

const GetAllCardDataSuccess = ( state, action ) => { 
    return updateObject( state, { // here we want to stor the cards we fetched so we need to get the state 
        workData: action.workData,
        partsData: action.partsData,
        loading: false
    } );
};

const GetAllCardDataFail = ( state, action ) => { 
    return updateObject( state, { loading: false } );
};

const WorkOrPartDeleteStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const WorkOrPartDeleteFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const WorkOrPartDeleteSuccess = ( state, action ) => {
  //  const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    if(action.list === 'workData'){
        return updateObject( state, {
            loading: false
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    }

    else if(action.list === 'partsData'){
        return updateObject( state, {
            loading: false
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    }
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) { // here Ill write my different cases

        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case actionTypes.CARD_OPENING_START: return cardOpeningStart( state, action );
        case actionTypes.CARD_OPENING_SUCCESS: return cardOpeningSuccess( state, action );
        case actionTypes.CARD_OPENING_FAIL: return cardOpeningFail( state, action );

        case actionTypes.FETCH_CARDS_START: return fetchCardsStart( state, action );
        case actionTypes.FETCH_CARDS_SUCCESS: return fetchCardsSuccess( state, action );
        case actionTypes.FETCH_CARDS_FAIL: return fetchCardsFail( state, action );

        case actionTypes.CARD_UPDATE_START: return cardUpdateStart( state, action );
        case actionTypes.CARD_UPDATE_SUCCESS: return cardUpdateSuccess( state, action );
        case actionTypes.CARD_UPDATE_FAIL: return cardUpdateFail( state, action );

        case actionTypes.CARD_DELETE_START: return cardDeleteStart( state, action );
        case actionTypes.CARD_DELETE_SUCCESS: return cardDeleteSuccess( state, action );
        case actionTypes.CARD_DELETE_FAIL: return cardDeleteFail( state, action );

        case actionTypes.PURCHASE_WORKS_INIT: return purchaseWorksInit( state, action );
        case actionTypes.WORKS_MODAL_CLOSE: return purchaseWorksCancel( state, action );

        case actionTypes.PURCHASE_PARTS_INIT: return purchasePartsInit( state, action );
        case actionTypes.PARTS_MODAL_CLOSE: return purchasePartsCancel( state, action );


        case actionTypes.TOAST_MODAL_CLOSE: return purchaseToastCancel( state, action );


        case actionTypes.WORK_OR_PARTS_ADD_START: return workOrPartsOpeningStart( state, action );
        case actionTypes.WORK_OR_PARTS_ADD_SUCCESS: return workOrPartsOpeningSuccess( state, action ); 
        case actionTypes.WORK_OR_PARTS_ADD_FAIL: return workOrPartsOpeningFail( state, action );
        
        case actionTypes.WORK_OR_PARTS_DELETE_START: return WorkOrPartDeleteStart( state, action );
        case actionTypes.WORK_OR_PARTS_DELETE_SUCCESS: return WorkOrPartDeleteSuccess( state, action );
        case actionTypes.WORK_OR_PARTS_DELETE_FAIL: return WorkOrPartDeleteFail( state, action );


        case actionTypes.WORK_OR_PARTS_UPDATE_START: return workOrPartUpdateStart( state, action ); 
        case actionTypes.WORK_OR_PARTS_UPDATE_SUCCESS: return workOrPartUpdateSuccess( state, action );
        case actionTypes.WORK_OR_PARTS_UPDATE_FAIL: return workOrPartUpdateFail( state, action );


        case actionTypes.GET_ALL_CARD_DATA_START: return GetAllCardDataStart( state, action );
        case actionTypes.GET_ALL_CARD_DATA_SUCCESS: return GetAllCardDataSuccess( state, action ); //GetAllCardDataSuccess
        case actionTypes.GET_ALL_CARD_DATA_FAIL: return GetAllCardDataFail( state, action );
        
        default: return state; // return the current state
    }
};

export default reducer;
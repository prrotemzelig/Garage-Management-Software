import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchedImages: [], 
    docs: [],
    loading: false,
    showSuccessCase: false,
    cardStorage: [],
    payload:'',
    error: '',
    showGetSuccessCase: false,
    emptyStorage: false,
    alert: ''
    //allImagesForCard: []

};



const imageOrDocUploadingStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const imageOrDocUploadingProgress = ( state, action ) => {
    return updateObject( state, { 
        payload: action.payload 
    } ); 
};


const imageOrDocUploadingSuccess = ( state, action ) => {

  //  const newCard = updateObject( action.cardData, { id: action.cardId } ); 
    return updateObject( state, {
        loading: false,
        showSuccessCase: true
       // cardStorage: state.cards.concat( newCard ) 
    } );



};

const imageOrDocUploadingFail = ( state, action ) => {
    return updateObject( state, {
         loading: false,
         error: action.error
     } );
};






const getImagesOrDocsStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};
const getImagesOrDocsSuccess = ( state, action ) => {//, { taskKey: action.taskId }
console.log(action.condition);
    if(action.condition === 'false'){
        return updateObject( state, { 
            loading: false,
            alert: 'No files to show',
            emptyStorage: true
        } ); 

 
    }
    else if(action.condition === 'true'){
    //const newImage = updateObject( action.fetchedImages ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    console.log(action.fetchedImages);
    return updateObject( state, { 
        fetchedImages: action.fetchedImages ,
        loading: false ,
        showGetSuccessCase: true
    } ); 
}
};

const getImagesOrDocsFail = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        showGetSuccessCase: false,
        error: action.error
    } );

};






const reducer = ( state = initialState, action ) => {
    switch ( action.type ) { 

        case actionTypes.IMAGE_OR_DOC_UPLOADING_START: return imageOrDocUploadingStart( state, action );
        case actionTypes.IMAGE_OR_DOC_UPLOADING_PROGRESS: return imageOrDocUploadingProgress( state, action );
        case actionTypes.IMAGE_OR_DOC_UPLOADING_SUCCESS: return imageOrDocUploadingSuccess( state, action );
        case actionTypes.IMAGE_OR_DOC_UPLOADING_FAIL: return imageOrDocUploadingFail( state, action );
        


        case actionTypes.GET_IMAGES_OR_DOCS_START: return getImagesOrDocsStart( state, action );
        case actionTypes.GET_IMAGES_OR_DOCS_SUCCESS: return getImagesOrDocsSuccess( state, action );
        case actionTypes.GET_IMAGES_OR_DOCS_FAIL: return getImagesOrDocsFail( state, action );
        
        default: return state; 
    }
};

export default reducer;
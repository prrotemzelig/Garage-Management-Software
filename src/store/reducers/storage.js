import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchedImages: [], 
    resizeImages: [],
    numberOfImages: 0,
    numberOfDocs: 0,
    fetchedDocs: [],
    loading: false,
    loadingImages: false,
    loadingResizeImages: false,
    loadingDocs: false,
    showSuccessCase: false,
    cardStorage: [],
    payload:0,
    error: '',
    errorImages: '',
    errorDocs: '',
    showGetSuccessCase: false,
    emptyStorage: false,
    emptyImagesStorage: false,
    emptyDocsStorage: false,
    alert: '',
    alertImages: '',
    alertDocs: '',
    loadingDeleteImages: false,
    showDeleteImagesCase: false,
    loadingDeleteDocs: false,
    showDeleteDocsCase: false,
    loadingDownloadDocs: false,
    errorDownloadDocs: false,
    loadingDownloadImage: false,
    errorDownloadImage: false,
    currentFileUploaded :'',
    isUploading: false,
    currentUploadNumber :''
    
};



const imageOrDocUploadingStart = ( state, action ) => {
    return updateObject( state, {
        isUploading: true,
         loading: true,
         currentFileUploaded: action.currentFileUploaded,
         payload: 0,
         currentUploadNumber: action.currentUploadNumber
        //  isUploading: true
        } ); 
};

const imageOrDocUploadingProgress = ( state, action ) => {
    return updateObject( state, { 
        payload: action.payload,
        currentFileUploaded: action.currentFileUploaded

    } ); 
};


const imageOrDocUploadingSuccess = ( state, action ) => {

  //  const newCard = updateObject( action.cardData, { id: action.cardId } ); 
  
    return updateObject( state, {
        loading: false,
        showSuccessCase: true,
        payload: action.payload,
        currentFileUploaded: action.currentFileUploaded
        // cardStorage: state.cards.concat( newCard ) 
    } );
};

const allUploadIsSuccess = ( state, action ) => {
    
      return updateObject( state, {
        isUploading: false,
          loading: false,
          payload: 0,
          currentFileUploaded: '',
          currentUploadNumber: ''
          // cardStorage: state.cards.concat( newCard ) 
      } );
  
  
  
  };

const imageOrDocUploadingFail = ( state, action ) => {
    return updateObject( state, {
         loading: false,
         error: action.error
     } );
};





const getImagesStart = ( state, action ) => {
    return updateObject( state, { 
        loadingImages: true,
        fetchedImages: [], 
        numberOfImages: 0,
        showSuccessCase: false,
        emptyImagesStorage: false,
        alertImages: '',
        errorImages: ''
    } ); 
};
const getImagesSuccess = ( state, action ) => {//, { taskKey: action.taskId }
//console.log(action.condition);
    if(action.condition === 'false'){
       // console.log(action.condition);
      //  if(action.node === '/images'){
        return updateObject( state, { 
            loadingImages: false,
            alertImages: 'No images to show',
            emptyImagesStorage: true,
            fetchedImages: [],
            resizeImages: [],
            numberOfImages: 0

        } ); 
   // }
 
    }
    else if(action.condition === 'true'){
     //   if(action.node === '/images'){
    //const newImage = updateObject( action.fetchedImages ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    //console.log(action.fetchedImages);
    return updateObject( state, { 
        fetchedImages: action.fetchedImages ,
        loadingImages: false ,
        showGetSuccessCase: true,
        numberOfImages: action.count
    } ); 
//}

// else if(action.node === '/images/resize'){
//     //const newImage = updateObject( action.fetchedImages ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
//     console.log(action.node);

//     console.log(action.fetchedImages);
//     return updateObject( state, { 
//         resizeImages: action.fetchedImages ,
//         loadingResizeImages: false ,
//         showGetSuccessCase: true,
        
//     } ); 
// }

}
};

const getImagesFail = ( state, action ) => {
    return updateObject( state, {
        loadingImages: false,
        showGetSuccessCase: false,
        errorImages: action.error,
        numberOfImages: 0
    } );
};





const deleteImagesStart = ( state, action ) => {
    return updateObject( state, { 
        loadingDeleteImages: true,
    } ); 
};
const deleteImagesSuccess = ( state, action ) => {
        return updateObject( state, { 
            loadingDeleteImages: false,
            showDeleteImagesCase: true
        } ); 
};

const deleteImagesFail = ( state, action ) => {
    return updateObject( state, {
        loadingDeleteImages: false,
        showDeleteImagesCase: false,
        errorImages: action.error
    } );
};




const getDocsStart = ( state, action ) => {
    return updateObject( state, {
         loadingDocs: true,
         numberOfDocs: 0,
         fetchedDocs: [],
         emptyDocsStorage: false,
         alertDocs: '',
         errorDocs: ''
        } ); 
};
const getDocsSuccess = ( state, action ) => {//, { taskKey: action.taskId }
//console.log(action.condition);
    if(action.condition === 'false'){
        return updateObject( state, { 
            loadingDocs: false,
            alertDocs: 'No docs to show',
            emptyDocsStorage: true,
            fetchedDocs: [] ,
            numberOfDocs: 0
        } ); 
 
    }
    else if(action.condition === 'true'){
    //const newImage = updateObject( action.fetchedImages ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    return updateObject( state, { 
        fetchedDocs: action.fetchedDocs ,
        loadingDocs: false ,
        successCaseDocs: true,
        numberOfDocs: action.count
    } ); 
}
};

const getDocsFail = ( state, action ) => {
    return updateObject( state, {
        loadingDocs: false,
        showGetSuccessCase: false,
        errorDocs: action.error,
        numberOfDocs: 0
    } );

};



const deleteDocsStart = ( state, action ) => {
    return updateObject( state, { 
        loadingDeleteDocs: true,
    } ); 
};
const deleteDocsSuccess = ( state, action ) => {
        return updateObject( state, { 
            loadingDeleteDocs: false,
            showDeleteDocsCase: true
        } ); 
};

const deleteDocsFail = ( state, action ) => {
    return updateObject( state, {
        loadingDeleteDocs: false,
        showDeleteDocsCase: false,
        errorDocs: action.error
    } );
};



const downloadDocStart = ( state, action ) => {
    return updateObject( state, { 
        loadingDownloadDocs: true
    } ); 
};
const downloadDocSuccess = ( state, action ) => {
        return updateObject( state, { 
            loadingDownloadDocs: false
        } ); 
};

const downloadDocFail = ( state, action ) => {
    return updateObject( state, {
        loadingDownloadDocs: false,
        errorDownloadDocs: action.error
    } );
};




const downloadImageStart = ( state, action ) => {
    return updateObject( state, { 
        loadingDownloadImage: true
    } ); 
};
const downloadImageSuccess = ( state, action ) => {
        return updateObject( state, { 
            loadingDownloadImage: false
        } ); 
};

const downloadImageFail = ( state, action ) => {
    return updateObject( state, {
        loadingDownloadImage: false,
        errorDownloadImage: action.error
    } );
};






const reducer = ( state = initialState, action ) => {
    switch ( action.type ) { 

        case actionTypes.IMAGE_OR_DOC_UPLOADING_START: return imageOrDocUploadingStart( state, action );
        case actionTypes.IMAGE_OR_DOC_UPLOADING_PROGRESS: return imageOrDocUploadingProgress( state, action );
        case actionTypes.IMAGE_OR_DOC_UPLOADING_SUCCESS: return imageOrDocUploadingSuccess( state, action );
        case actionTypes.IMAGE_OR_DOC_UPLOADING_FAIL: return imageOrDocUploadingFail( state, action );
        case actionTypes.ALL_UPLOAD_IS_SUCCESS: return allUploadIsSuccess( state, action );



        case actionTypes.GET_IMAGES_START: return getImagesStart( state, action );
        case actionTypes.GET_IMAGES_SUCCESS: return getImagesSuccess( state, action );
        case actionTypes.GET_IMAGES_FAIL: return getImagesFail( state, action );
        

        case actionTypes.DELETE_IMAGES_START: return deleteImagesStart( state, action );
        case actionTypes.DELETE_IMAGES_SUCCESS: return deleteImagesSuccess( state, action );
        case actionTypes.DELETE_IMAGES_FAIL: return deleteImagesFail( state, action );


        case actionTypes.GET_DOCS_START: return getDocsStart( state, action );
        case actionTypes.GET_DOCS_SUCCESS: return getDocsSuccess( state, action );
        case actionTypes.GET_DOCS_FAIL: return getDocsFail( state, action );


        case actionTypes.DELETE_DOCS_START: return deleteDocsStart( state, action );
        case actionTypes.DELETE_DOCS_SUCCESS: return deleteDocsSuccess( state, action );
        case actionTypes.DELETE_DOCS_FAIL: return deleteDocsFail( state, action );


        case actionTypes.DOWNLOAD_DOC_START: return downloadDocStart( state, action );
        case actionTypes.DOWNLOAD_DOC_SUCCESS: return downloadDocSuccess( state, action );
        case actionTypes.DOWNLOAD_DOC_FAIL: return downloadDocFail( state, action );



        
        case actionTypes.DOWNLOAD_IMAGE_START: return downloadImageStart( state, action );
        case actionTypes.DOWNLOAD_IMAGE_SUCCESS: return downloadImageSuccess( state, action );
        case actionTypes.DOWNLOAD_IMAGE_FAIL: return downloadImageFail( state, action );

        default: return state; 
    }
};

export default reducer;
import * as actionTypes from './actionTypes';
import axios from '../../axios-cards';
import { storageRef } from "../../config";
//import { reduxFirestore, getFirestore } from "redux-firestore";


export const imageOrDocUploadingStart = () => {
    return {
        type: actionTypes.IMAGE_OR_DOC_UPLOADING_START
    };
};

export const imageOrDocUploadingProgress = (payload) => {
    return {
        type: actionTypes.IMAGE_OR_DOC_UPLOADING_PROGRESS,
        payload: payload
    };
};

export const imageOrDocUploadingSuccess = ( ) => { 
    return { 
        type: actionTypes.IMAGE_OR_DOC_UPLOADING_SUCCESS
       // cardId: id
  
    };
};

// this synchronous action creators
export const imageOrDocUploadingFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.IMAGE_OR_DOC_UPLOADING_FAIL,
        error: error 
    };
}




export const imageOrDocUploading = ( file,userId ,token,branchNumber,node,cardKey,ticketNumber) => { 
  //  const firestore = getFirestore();

    return dispatch => {
        dispatch( imageOrDocUploadingStart() ); 
        const metadata = {   // Create the file metadata
            contentType: "image/jpeg"
          };

          const uploadTask = storageRef.child(branchNumber + "/" + ticketNumber +"/" + node + "/" + file[0].name).put(file[0]); //, metadata

          uploadTask.on("state_changed",function(snapshot) {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              let payload= Math.floor(progress) ;
                    dispatch(imageOrDocUploadingProgress(payload)); 
            },
            function(error) {
              dispatch(imageOrDocUploadingFail(error)); 
            },
            function() {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL()
                .then(function(downloadURL) {
                dispatch(imageOrDocUploadingSuccess());

                // firestore
                //   .collection("data")
                //   .doc("user")
                //   .update({
                //     image_url: downloadURL
                //   })
                //   .then(() => {
                //     //get the latest data
                //     //once the data is sent to the firestore the latest version is stored in the redux store
                //     console.log("84");
                //    // get_Data(dispatch, getState, { getFirestore });
                //   })
                //   .catch(error => {
                //     console.log(error);
                //     dispatch(imageOrDocUploadingFail(error)); 
                //   });
              });
            }
          )
        
        // .catch( error => {
        //     console.log(error);
        //     dispatch(imageOrDocUploadingFail(error)); 

        // } )
        
        // .finally(function(){
        //     console.log("189");
        //  //   dispatch(fetchCards(token, userId, branchNumber));  // ?

        // });
    };
};







export const getImagesOrDocsStart = () => {
    return {
        type: actionTypes.GET_IMAGES_OR_DOCS_START
    };
};

export const getImagesOrDocsSuccess = (fetchedImages,condition ) => { 
    console.log(condition);
    return { 
        type: actionTypes.GET_IMAGES_OR_DOCS_SUCCESS ,
        fetchedImages: fetchedImages,
        condition: condition

    };
};

export const getImagesOrDocsFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.GET_IMAGES_OR_DOCS_FAIL,
        error: error 
    };
}
// const uploadTask = storageRef.child(branchNumber + "/" + ticketNumber +"/" + node + "/" + file[0].name).put(file[0]); //, metadata
// uploadTask.on("state_changed",function(snapshot) {
//     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     let payload= Math.floor(progress) ;
//           dispatch(imageOrDocUploadingProgress(payload)); 
//   },
//   function(error) {
//     dispatch(getImagesOrDocsFail(error)); 
//   },
//   function() {
//     uploadTask.snapshot.ref.getDownloadURL()
//       .then(function(downloadURL) {
//       dispatch(getImagesOrDocsSuccess());

//     });
//   }
// )

//   // for folders
//   res.perfixes.forEach( folder => {
//     console.log(folder);
//  });
export const getImagesOrDocs = ( userId ,token,branchNumber,cardKey,ticketNumber) => { 
    return dispatch => {
            dispatch( getImagesOrDocsStart() ); 
    // create a Reference to that folder:
    var listRef = storageRef.child(branchNumber + "/" + ticketNumber + "/images");
    let counterFiles = 0;
    let count = 0;
    let fetchedImages = []; 

    
    listRef.listAll()
    .then(result =>  {
        count = result.items.length;
        if(count === 0){
            alert('אין תמונות להצגה'); 
            dispatch( getImagesOrDocsSuccess(fetchedImages,'false') ); 

        }
      result.items.forEach(imageRef => {
                counterFiles += 1;   
               imageRef.getDownloadURL()
               .then(function(url) {
                fetchedImages.push( {
                        key: imageRef.location.path,
                        url: url 
                    } );
                    if(counterFiles === count) {
                        dispatch( getImagesOrDocsSuccess(fetchedImages,'true') ); 
                  }    
          })
          .catch(error => {
                    dispatch(getImagesOrDocsFail(error));
          }) 
      });
  }    
) 
    .catch(error => {
                dispatch(getImagesOrDocsFail(error));
    })
      
    };
};
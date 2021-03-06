import * as actionTypes from './actionTypes';
import { storageRef } from "../../config";
//import { reduxFirestore, getFirestore } from "redux-firestore";
var async = require("async");

export const imageOrDocUploadingStart = (currentFileUploaded,currentUploadNumber) => {
    return {
        type: actionTypes.IMAGE_OR_DOC_UPLOADING_START,
        currentFileUploaded: currentFileUploaded,
        currentUploadNumber: currentUploadNumber
    };
};

export const imageOrDocUploadingProgress = (payload,currentFileUploaded) => {
    return {
        type: actionTypes.IMAGE_OR_DOC_UPLOADING_PROGRESS,
        payload: payload,
        currentFileUploaded: currentFileUploaded
    };
};

export const imageOrDocUploadingSuccess = (payload) => { 
    return { 
        type: actionTypes.IMAGE_OR_DOC_UPLOADING_SUCCESS,
        // currentFileUploaded: currentFileUploaded,
        payload: payload
       // cardId: id
  
    };
};

export const allUploadIsSuccess = () => { 
    return { 
        type: actionTypes.ALL_UPLOAD_IS_SUCCESS
        // currentFileUploaded: currentFileUploaded,
        // payload: payload
       // cardId: id
  
    };
};

export const imageOrDocUploadingFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    return {
        type: actionTypes.IMAGE_OR_DOC_UPLOADING_FAIL,
        error: error 
    };
}




export const imageOrDocUploading = ( allFiles,userId ,token,branchNumber,node,cardKey,ticketNumber) => { 

//const promises = [];
return dispatch => {
    let i = 1;


    async.eachLimit(allFiles,1,function(file,callback){
       // promises.push(file1);
    let type=file.type;
    let finalNode;
    if(type.includes('image/jpeg') || type.includes('image/gif') || type.includes('image/png')){ //'image/gif', 'image/jpeg', 'image/png'
         finalNode = 'images';
       }
       else{
         finalNode = 'docs';
       }

    let currentUploadNumber = i + "/" + allFiles.length;
    dispatch( imageOrDocUploadingStart(file.name,currentUploadNumber)); 
    const uploadTask = storageRef.child(branchNumber + "/" + ticketNumber +"/" + finalNode + "/" + file.name).put(file); //, metadata
      
         // promises.push(uploadTask);
          uploadTask.on("state_changed", function(snapshot) {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              let payload= Math.floor(progress) ;
                    dispatch(imageOrDocUploadingProgress(payload,file.name)); 
            },
            function(error) {
              dispatch(imageOrDocUploadingFail(error)); 
            },
            function() {
              uploadTask.snapshot.ref.getDownloadURL()
                .then(function(downloadURL) {
                dispatch(imageOrDocUploadingSuccess(0));
                if(finalNode === 'images'){
                    dispatch(getImages(userId ,token,branchNumber,cardKey,ticketNumber,'/images'));
                    i+=1;
                    callback(null);
                }
                else if( finalNode === 'docs'){
                    dispatch(getDocs(userId ,token,branchNumber,cardKey,ticketNumber,'/docs'));
                    i+=1;
                    callback(null);
                }
              });
            }
          ) 
})

    .finally(function(){
        dispatch(allUploadIsSuccess());
    });
// Promise.all(promises).then(tasks => {
//     dispatch(imageOrDocUploadingSuccess(-1));
//     console.log('all uploads complete');
// });
    };

};









export const getImagesStart = () => {
    return {
        type: actionTypes.GET_IMAGES_START
    };
};

export const getImagesSuccess = (fetchedImages,condition,node,count) => { 
    return { 
        type: actionTypes.GET_IMAGES_SUCCESS ,
        fetchedImages: fetchedImages,
        condition: condition,
        node: node,
        count: count

    };
};

export const getImagesFail = ( error ) => { 
    return {
        type: actionTypes.GET_IMAGES_FAIL,
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


export const getImages = ( userId ,token,branchNumber,cardKey,ticketNumber,node) => { 
  
    return dispatch => {
            dispatch( getImagesStart() ); 
    // create a Reference to that folder:
    var listRef = storageRef.child(branchNumber + "/" + ticketNumber + node); //"/images" node
    let counterFiles = 0;
    let count = 0;
    let fetchedImages = []; 

    //listAll
    listRef.list()
    .then(result =>  {
        count = result.items.length;
        if(count === 0){
            dispatch( getImagesSuccess(fetchedImages,'false',node,count) ); 
        }
    
      result.items.forEach(imageRef => {
               imageRef.getDownloadURL()
               .then(function(url) {
                    let img = new Image();
                    img.src = url;  // URL.createObjectURL(url);
                    img.onload = function(e)  {
                    fetchedImages.push( {
                        width: img.width,
                        height: img.height,
                        name: imageRef.name,
                        key: imageRef.location.path,
                        url: url,
                        index: counterFiles,
                        check: false
                    } );
                    counterFiles += 1;   
                 //   console.log(counterFiles);
                  //  console.log(count);

                    if(counterFiles === count) {
                       // console.log("212");
                        dispatch( getImagesSuccess(fetchedImages,'true',node,count) ); 
                  }  
                }
                //     if(counterFiles === count) {
                //         console.log("212");
                //         dispatch( getImagesSuccess(fetchedImages,'true',node,count) ); 
                //   }    
          })
          .catch(error => {
            // console.log(error);
            dispatch(getImagesFail(error));
          }) 
      });
  }    
) 
    .catch(error => {
        // console.log(error);
        dispatch(getImagesFail(error));
    })
    };
};




export const deleteImagesStart = () => {
    return {
        type: actionTypes.DELETE_IMAGES_START
    };
};

export const deleteImagesSuccess = (fetchedImages,condition,node,count) => { 
    return { 
        type: actionTypes.DELETE_IMAGES_SUCCESS 
    };
};

export const deleteImagesFail = ( error ) => { 
    return {
        type: actionTypes.DELETE_IMAGES_FAIL,
        error: error 
    };
}


export const deleteImages = ( userId ,token,branchNumber,cardKey,ticketNumber,node,name) => { 
    return dispatch => {
            dispatch( deleteImagesStart() ); 
    var listRef = storageRef.child(branchNumber + "/" + ticketNumber + node + '/' + name); //"/images" node
        listRef.delete()
        .then(result => {
            dispatch(deleteImagesSuccess(result));
            dispatch(getImages( userId ,token,branchNumber,cardKey,ticketNumber,node));
        })
    .catch(error => {
                dispatch(deleteImagesFail(error));
    })
    };
};




export const getDocsStart = () => {
    return {
        type: actionTypes.GET_DOCS_START
    };
};

export const getDocsSuccess = (fetchedDocs,condition,node,count) => { 
    return { 
        type: actionTypes.GET_DOCS_SUCCESS ,
        fetchedDocs: fetchedDocs,
        condition: condition,
        node: node,
        count: count

    };
};

export const getDocsFail = ( error ) => { 
    return {
        type: actionTypes.GET_DOCS_FAIL,
        error: error 
    };
}


export const getDocs = ( userId ,token,branchNumber,cardKey,ticketNumber,node) => { 

    return dispatch => {
            dispatch( getDocsStart() ); 
    var listRef = storageRef.child(branchNumber + "/" + ticketNumber + node ); 
    //let counterFiles = 0;
    let count = 0;
    let fetchedDocs = []; 
    let countIndex = 0;

    listRef.listAll()
    .then(result =>  {
        count = result.items.length;
        if(count === 0){
            dispatch( getDocsSuccess(fetchedDocs,'false',node,count) ); 

        }
      result.items.forEach(folder => {
              //  counterFiles += 1;   
                folder.getDownloadURL()
               .then(function(url) {

                var forestRef = storageRef.child(folder.location.path);
                forestRef.getMetadata().then(function(metadata) {  // Get metadata properties
                    // Metadata now contains the metadata for 'images/forest.jpg'            
                    var newData = new Date(metadata.timeCreated);
                    fetchedDocs.push( {
                        name: folder.name,
                        lastModified: newData.toLocaleTimeString('en-US',{ hour12: false }) + " " + newData.toLocaleDateString(),
                        key: folder.location.path,
                        url: url,
                        index: countIndex,
                        check: false
                    } );
                    countIndex += 1;
                        if(countIndex === count) {
                            dispatch( getDocsSuccess(fetchedDocs,'true',node,count) ); 
                      }    

                    
                }).catch(function(error) {
                    // console.log(error);
                    dispatch(getDocsFail(error));
                });
                // fetchedDocs.push( {
                //     name: folder.name,
                //     // lastModified: folder.timeCreated,
                //     key: folder.location.path,
                //     url: url,
                //     index: countIndex,
                //     check: false
                // } );
                // countIndex += 1;
                //     if(countIndex === count) {
                //         dispatch( getDocsSuccess(fetchedDocs,'true',node,count) ); 
                //   }    
          })
          .catch(error => {
                    dispatch(getDocsFail(error));
          }) 
      });
  }    
) 
    .catch(error => {
                //  console.log(error);
                dispatch(getDocsFail(error));
    });

    // .finally(function(){
    //  if(counterFiles === count) {
    //    // dispatch( getDocsSuccess(fetchedDocs,'true',node,count) ); 
    //  }

    // });
    };
};



export const deleteDocsStart = () => {
    return {
        type: actionTypes.DELETE_DOCS_START
    };
};

export const deleteDocsSuccess = (fetchedImages,condition,node,count) => { 
    return { 
        type: actionTypes.DELETE_DOCS_SUCCESS 
    };
};

export const deleteDocsFail = ( error ) => { 
    return {
        type: actionTypes.DELETE_DOCS_FAIL,
        error: error 
    };
}


export const deleteDocs = ( userId ,token,branchNumber,cardKey,ticketNumber,node,name) => { 
    return dispatch => {
            dispatch( deleteDocsStart() ); 
    var listRef = storageRef.child(branchNumber + "/" + ticketNumber + node + '/' + name); //"/images" node
        listRef.delete()
        .then(result => {
            dispatch(deleteDocsSuccess(result));
            // console.log(userId);
            // console.log(token);
            // console.log(branchNumber);
            // console.log(cardKey);
            // console.log(ticketNumber);
            // console.log(node);

            dispatch(getDocs( userId ,token,branchNumber,cardKey,ticketNumber,node));
        })

    .catch(error => {
                dispatch(deleteDocsFail(error));
    })
    };
};





export const downloadDocStart = () => {
    return {
        type: actionTypes.DOWNLOAD_DOC_START
    };
};

export const downloadDocSuccess = () => { 
    return { 
        type: actionTypes.DOWNLOAD_DOC_SUCCESS 
    };
};

export const downloadDocFail = ( error ) => { 
    return {
        type: actionTypes.DOWNLOAD_DOC_FAIL,
        error: error 
    };
}


export const downloadDoc = ( userId ,token,branchNumber,cardKey,ticketNumber,node,name) => { 
   // console.log("459");

    return dispatch => {
            dispatch( downloadDocStart() ); 

            storageRef.child(branchNumber + "/" + ticketNumber + "/" + node + "/" + name).getDownloadURL().then(function(url) {
  
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'blob';
              
                xhr.onload = function(event) {
                     var FileSaver = require('file-saver');
                    FileSaver.saveAs(xhr.response, name);    
                };
              
                xhr.send();
                dispatch(downloadDocSuccess());

              
              }).catch(function(error) {
                //   console.log(error);
                  dispatch(downloadDocFail(error));

              });

    };
};


export const downloadImageStart = () => {
    return {
        type: actionTypes.DOWNLOAD_IMAGE_START
    };
};

export const downloadImageSuccess = () => { 
    return { 
        type: actionTypes.DOWNLOAD_IMAGE_SUCCESS 
    };
};

export const downloadImageFail = ( error ) => { 
    return {
        type: actionTypes.DOWNLOAD_IMAGE_FAIL,
        error: error 
    };
}


export const downloadImage = ( userId ,token,branchNumber,cardKey,ticketNumber,node,name) => { 
    console.log( userId + token + branchNumber + cardKey + ticketNumber + node+name);
    return dispatch => {
            dispatch( downloadImageStart() ); 
            storageRef.child(branchNumber + "/" + ticketNumber + "/" + node + "/" + name).getDownloadURL().then(function(url) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                     var FileSaver = require('file-saver');
                    FileSaver.saveAs(xhr.response, name);    
                };
                xhr.send();
                dispatch(downloadImageSuccess());
              }).catch(function(error) {
                  dispatch(downloadImageFail(error));
              });
    };
};


export const logoutStorageReducers = () => { 
    return {
        type: actionTypes.AUTH_LOGOUT_STORAGE
    };
};
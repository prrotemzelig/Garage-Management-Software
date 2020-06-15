//import firebase from 'firebase/app';
//import 'firebase/storage';
import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCNB6T4idqQfbcC5S6BhRnFBh3cSoPaW2A",
  authDomain: "garage-management-softwa.firebaseapp.com",
  databaseURL: "https://garage-management-softwa.firebaseio.com",
  projectId: "garage-management-softwa",
  storageBucket: "garage-management-softwa.appspot.com",
  messagingSenderId: "53566570219",
  appId: "1:53566570219:web:e2a32ec613a74242ed88ae",
  measurementId: "G-VD73MDRB7K"
};
  
firebase.initializeApp(config);
const storage = firebase.storage(); // Get a reference to the storage service, which is used to create references in your storage bucket



 const auth = firebase.auth();
 const f = firebase;
 const storageRef = storage.ref(); // Create a storage reference from our storage service
 const database = firebase.firestore();

export { storage , auth , f  , storageRef , database , firebase as default }

// export default config;
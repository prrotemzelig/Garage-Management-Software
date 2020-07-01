//import $ from 'jquery';
//import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { f } from "./config";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'; //compose allows us to compose our own set of enhancers and middleware is just one kind of enhancer
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

import thunk from 'redux-thunk';
import './index.module.css';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

//import '@fortawesome/fontawesome-free/css/all.min.css';
//import 'bootstrap-css-only/css/bootstrap.min.css';
//import 'mdbreact/dist/css/mdb.css';

//import './index.module.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker.js';
import cardReducer from './store/reducers/card';
import authReducer from './store/reducers/auth'; // we must import all the reducer we have here!! ( we that we added to our global root reducer)
import taskReducer from './store/reducers/task'; // we must import all the reducer we have here!! ( we that we added to our global root reducer)
import adminReducer from './store/reducers/admin'; // we must import all the reducer we have here!! ( we that we added to our global root reducer)
import storageReducer from './store/reducers/storage'; // we must import all the reducer we have here!! ( we that we added to our global root reducer)
import notificationReducer from './store/reducers/notification'; // we must import all the reducer we have here!! ( we that we added to our global root reducer)


// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true // attaches auth is ready promise to store
};


//  "composeEnhancersjust" holds a function
//const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
//const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : (null || compose);
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({  // here we pass a javascript object
  card: cardReducer,
  auth: authReducer,
  task: taskReducer,
  admin: adminReducer,
  storage: storageReducer,
  notification: notificationReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })) // with that the thunk middleware is unlocked and should work
));

// const store = createStore(
//   rootReducer,
//   composeEnhancers(
//     reactReduxFirebase(f, rrfConfig),
//     reduxFirestore(f),
//     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
//   )
// );

//The provider should wrap everything
const app = (
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
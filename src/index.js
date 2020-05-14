//import $ from 'jquery';
//import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'; //compose allows us to compose our own set of enhancers and middleware is just one kind of enhancer
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


//  "composeEnhancersjust" holds a function
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({  // here we pass a javascript object
  card: cardReducer,
  auth: authReducer,
  task: taskReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk) // with that the thunk middleware is unlocked and should work
));


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
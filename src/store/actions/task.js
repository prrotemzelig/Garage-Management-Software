import * as actionTypes from './actionTypes';
import axios from '../../axios-cards';


export const taskInit = () => { // this will be dispatched whenever we load the checkout page //** */
    return {
        type: actionTypes.TASK_INIT // just return an action
    };
};


export const taskOpeningSuccess = ( id, taskData,list ) => { // here we expect to get the id of the newly created card, so the card which was created on the backend, on the database on our backend, we expect to get this as an id here because we want to pass it on the action which we actually create here, so that in the reducer, we can use that action to actually add the new card to our cards array.
    console.log(list);
    //also I want the cardData
    return { // here we return object where I have a type
        type: actionTypes.TASK_OPENING_SUCCESS,
        taskId: id, 
        taskData: taskData ,
        list: list
    };
};

// this synchronous action creators
export const taskOpeningFail = ( error ) => { // here we might get the error message, but we simply want to return a new object of type
    console.log(error);
    return {
        type: actionTypes.TASK_OPENING_FAIL,
        error: error // pass on the error
    };
}


export const taskOpeningStart = () => {
    return {// this being a async normal action reaches redux which has the reducer
        type: actionTypes.TASK_OPENING_START
    };
};

// const queryParams = '?auth=' + response.data.idToken ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
// axios2.post(branchNumber + '/users.json' + queryParams , dataBaseUser )

//this is the async action one
//this is the action we dispatched from the container once we click that save card button.
export const taskOpening = ( taskData, token,branchNumber, userKey,list ) => { 
    console.log(list);
    //console.log(userKey);
    return dispatch => {
        dispatch( taskOpeningStart() ); // dispatch to the store
        //axios.post(branchNumber + '/users/' + userKey + '/taskData.json' ,taskData ) // send the HTTP request 
        axios.post(branchNumber + '/users/' + userKey + '/taskData/' + list + '.json' ,taskData ) // send the HTTP request 

        .then( response => {// once we got the response so that we were successful, I will dispatch my 
            console.log(response.data)
            dispatch(taskOpeningSuccess(response.data.name, taskData,list)); 

            // this.props.history.push( '/' ); // here we navigate away
        } )
        .catch( error => {
            dispatch(taskOpeningFail(error));

        } );
    };
};



export const fetchTasksSuccess = ( todo,doing,done ) => { // we expect to get the cards as an argument
   // console.log(tasks);
    return { // return a new object
        type: actionTypes.FETCH_TASKS_SUCCESS,
        //tasks: tasks
        todo: todo,
        doing:doing,
        done:done
    };
};

export const fetchTasksFail = ( error ) => {// get a potential error
    return {
        type: actionTypes.FETCH_TASKS_FAIL,
        error: error
    };
};

export const fetchTasksStart = () => {
    return {
        type: actionTypes.FETCH_TASKS_START
    };
};

export const fetchTasks = (token, userId,branchNumber,userKey) => { //here we run our async code
    return dispatch => {
        dispatch(fetchTasksStart()); // we need to do that to set loading to true!

        const queryParams = '?auth=' + token ; //+ '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.get(branchNumber + '/users/'+ userKey +'/taskData.json' ) // we use axios to get my cards, // this referring to that cards node on my backend (firebase node)
            
            .then( res => { // when the data is there (in the node of cards in firebase)
                console.log(res);

                // so with the response I'm getting, I want to set some state which actually contain my cards and then outputs them.
               // const fetchedTasks = { TODO:[] ,  DOING:[] ,  DONE:[]  }; 
                
               const todo = [] ; 
               const doing = [] ; 
               const done = [] ;
               //note!!! -> console.log(res.data); -> res.data will hold the data we get from firebase 
                //and I get back a javascript object where the keys are simply these unique IDs firebase generated for us and the value (we have the IDs as properties)
                //in the loop I turn my cards object into an array 
            

                for ( let key in res.data.todo ) { //in the cards node in the firebase, I'm not getting an array but I'll get back a javascript object
                todo.push( {
                        ...res.data.todo[key], // here I want to push  res.ata for a given key, accessing the value which of course is the card
                        id: key //to not lose the IDs though which are emy keys here I'll instead push a new object into this fetchedCards array where I will distribute the propertied off the Card object I've fetched from firebase with the spread operator and add 1 new property -> ID which is the ket because remember the key is in this object we've fetched
                    } );
                }

                for ( let key in res.data.doing ) { //in the cards node in the firebase, I'm not getting an array but I'll get back a javascript object
                doing.push( {
                        ...res.data.doing[key], // here I want to push  res.ata for a given key, accessing the value which of course is the card
                        id: key //to not lose the IDs though which are emy keys here I'll instead push a new object into this fetchedCards array where I will distribute the propertied off the Card object I've fetched from firebase with the spread operator and add 1 new property -> ID which is the ket because remember the key is in this object we've fetched
                    } );
                }

                for ( let key in res.data.done ) { //in the cards node in the firebase, I'm not getting an array but I'll get back a javascript object
                done.push( {
                        ...res.data.done[key], // here I want to push  res.ata for a given key, accessing the value which of course is the card
                        id: key //to not lose the IDs though which are emy keys here I'll instead push a new object into this fetchedCards array where I will distribute the propertied off the Card object I've fetched from firebase with the spread operator and add 1 new property -> ID which is the ket because remember the key is in this object we've fetched
                    } );
                }

                console.log(todo);
                console.log(doing);
                console.log(done);

                dispatch(fetchTasksSuccess(todo,doing,done));
            } )
            .catch( err => { // catch any potential errors. and show this on the screen by wrap withErrorHandler
                dispatch(fetchTasksFail(err));
            } );
    };
};
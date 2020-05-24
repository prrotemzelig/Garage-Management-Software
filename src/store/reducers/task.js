import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    todo: [],
    doing:[],
    done:[],
    loading: false

};


const taskInit = ( state, action ) => {
    return updateObject( state );
};

const taskOpeningStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const taskOpeningSuccess = ( state, action ) => {
    const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    if(action.list === 'todo'){
        return updateObject( state, {
            loading: false,
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
            todo: state.todo.concat( newTask )
        });
    }

    else if(action.list === 'doing'){
        return updateObject( state, {
            loading: false,
            doing:state.doing.concat( newTask )
        } );
    }

    else if(action.list === 'done'){
        return updateObject( state, {
            loading: false,        
            done:state.done.concat( newTask )
        } );
    }

};

const taskOpeningFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchTasksStart = ( state, action ) => { 
    return updateObject( state, { loading: true } );
};

const fetchTasksSuccess = ( state, action ) => { 
    return updateObject( state, { // here we want to stor the cards we fetched so we need to get the state 
        todo: action.todo,
        doing: action.doing,
        done: action.done,
        loading: false
    } );
};

const fetchTasksFail = ( state, action ) => { 
    return updateObject( state, { loading: false } );
};

const taskUpdateStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const taskUpdateFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const taskUpdateSuccess = ( state, action ) => {
  //  const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    
    if(action.list === 'todo'){
        return updateObject( state, {
            loading: false
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    }

    else if(action.list === 'doing'){
        return updateObject( state, {
            loading: false
            //doing:state.doing.concat( newTask )
        } );
    }

    else if(action.list === 'done'){
        return updateObject( state, {
            loading: false      
            //done:state.done.concat( newTask )
        } );
    }
};

const taskDeleteStart = ( state, action ) => {
    return updateObject( state, { loading: true } ); 
};

const taskDeleteFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const taskDeleteSuccess = ( state, action ) => {
  //  const newTask = updateObject( action.taskData, { taskKey: action.taskId } ); // here we marge the id of the card and also the details of the card to 1 object, that come separate from action-card.js
    
    if(action.list === 'todo'){
        return updateObject( state, {
            loading: false
            //  tasks: state.tasks.concat( newTask ) // here we need to update my cards - (concat return a new array and therefore we added this immutably)
           // todo: state.todo.concat( newTask )
           //onFetchTasks(token, userId, branchNumber,userKey)
        });
    }

    else if(action.list === 'doing'){
        return updateObject( state, {
            loading: false
            //doing:state.doing.concat( newTask )
        } );
    }

    else if(action.list === 'done'){
        return updateObject( state, {
            loading: false      
            //done:state.done.concat( newTask )
        } );
    }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) { // here Ill write my different cases
        case actionTypes.TASK_INIT: return taskInit( state, action );
        case actionTypes.TASK_OPENING_START: return taskOpeningStart( state, action );
        case actionTypes.TASK_OPENING_SUCCESS: return taskOpeningSuccess( state, action )
        case actionTypes.TASK_OPENING_FAIL: return taskOpeningFail( state, action );

        case actionTypes.FETCH_TASKS_START: return fetchTasksStart( state, action );
        case actionTypes.FETCH_TASKS_SUCCESS: return fetchTasksSuccess( state, action );
        case actionTypes.FETCH_TASKS_FAIL: return fetchTasksFail( state, action );
    
        case actionTypes.TASK_UPDATE_START: return taskUpdateStart( state, action );
        case actionTypes.TASK_UPDATE_SUCCESS: return taskUpdateSuccess( state, action );
        case actionTypes.TASK_UPDATE_FAIL: return taskUpdateFail( state, action );

        case actionTypes.TASK_DELETE_START: return taskDeleteStart( state, action );
        case actionTypes.TASK_DELETE_SUCCESS: return taskDeleteFail( state, action );
        case actionTypes.TASK_DELETE_FAIL: return taskDeleteSuccess( state, action );

        default: return state; // return the current state
    }
};

export default reducer;
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import setAuthorizationToken from "./utils/setAuthorizationToken"
import reducer from './reducers/reducer';

// const createStore = redux.createStore;

// const initialState = {
//     counter: 0
// }

// // Reducer
// const rootReducer = (state = initialState, action) => {
//     if (action.type === 'INC_COUNTER') {
//         return {
//             ...state,
//             counter: state.counter + 1
//         };
//     }
//     return state;
// };

// // Store
// const store = createStore(rootReducer);
// console.log(store.getState());

// // Subscription
// store.subscribe(() => {
//     console.log('[Subscription]', store.getState());
// });

// // Dispatching Action
// store.dispatch({type: 'INC_COUNTER'});
// store.dispatch({type: 'ADD_COUNTER', value: 10});
// console.log(store.getState());

//createStore(rootReducer,initialState,Applymiddleware -thunk-)



const store = createStore(
  reducer, {},
  applyMiddleware(thunk)
  
  //applyMiddleware(logger())
)

setAuthorizationToken(localStorage.token)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
registerServiceWorker();

//stores needs root reducer
//reducer takes state, action and returns new state 
//(as second parameter to store we need initial state but we dont have
//as third parameter we can pass middle ware)
//in this case we have no action so we apply middle ware right away

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { createStore, applyMiddleware, combineReducers} from "redux"

import reducerOrig from './reducers/reducer';

import logger from "redux-logger";

import { reducer as reduxFormReducer } from 'redux-form';

let chatApp = reducerOrig

const reducer1 = combineReducers({
  chatApp,
  form: reduxFormReducer
})


const store = createStore(
  reducer1, 
   applyMiddleware(logger,thunk)
  //applyMiddleware(thunk)
)



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

export default store

//stores needs root reducer
//reducer takes state, action and returns new state 
//(as second parameter to store we need initial state but we dont have
//as third parameter we can pass middle ware)
//in this case we have no action so we apply middle ware right away

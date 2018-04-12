import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { createStore, applyMiddleware} from "redux"
import setAuthorizationToken from "./utils/setAuthorizationToken"
import reducer from './reducers/reducer';

// import logger from "redux-logger";


const store = createStore(
   reducer, 
 // applyMiddleware(logger,thunk)
  applyMiddleware(thunk)
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

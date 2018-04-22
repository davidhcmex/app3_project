import React from 'react';
import ReactDOM from 'react-dom';

import {Vehicle} from './Vehicle';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

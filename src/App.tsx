import * as React from 'react';
import './bootstrap.min.css';
//import {Vehicle} from './Vehicle';

import { Route, BrowserRouter } from "react-router-dom";


import { Home } from "./components/Home";
import { User } from "./components/User";
import { Header } from "./components/Header";

class App extends React.Component {
  render() {
      return (
          <BrowserRouter>
              <div>
                 
                  <Route path={"/"} component={Header} />
                      <Route path={"/home"} component={Home} />
                      <Route path={"/user/:id"} component={User} />
              </div>
          </BrowserRouter>
      );
  }
}

export default App;



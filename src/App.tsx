import * as React from 'react';
import './index.css';
import './bootstrap.min.css';

//import {Vehicle} from './Vehicle';

import { Route, BrowserRouter, Switch } from "react-router-dom";


import { Register } from "./components/Register";
// import { User } from "./components/User";
import { Login } from "./components/Login";

//import { Header } from "./components/Header";
import  ChatComposed  from "./components/ChatComposed";





class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path={"/"} component={Login} />
                        <Route path={"/register"} component={Register} />
                        <Route path={"/login"} component={Login} />
                        <Route path={"/chat"} component={ChatComposed} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;



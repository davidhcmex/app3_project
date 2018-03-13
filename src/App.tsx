import * as React from 'react';
import './index.css';
import './bootstrap.min.css';

//import {Vehicle} from './Vehicle';

import { Route, BrowserRouter } from "react-router-dom";


import { Register } from "./components/Register";
import { User } from "./components/User";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Header } from "./components/Header";
import { ChatComposed }  from "./components/ChatComposed";





class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>

                    <Route path={"/"} component={Header} />
                    <Route path={"/register"} component={Register} />
                    <Route path={"/login"} component={Login} />
                    <Route path={"/user/:id"} component={User} />
                    <Route path={"/logout"} component={Logout} />
                    <Route path={"/chat"} component={ChatComposed} />

                </div>
            </BrowserRouter>
        );
    }
}

export default App;



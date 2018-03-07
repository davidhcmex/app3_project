import * as React from 'react';
import './bootstrap.min.css';
//import {Vehicle} from './Vehicle';

import { Route, BrowserRouter } from "react-router-dom";


import { Register } from "./components/Register";
import { User } from "./components/User";
import { Header } from "./components/Header";
import { Chat } from "./components/Chat";





class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>

                    <Route path={"/"} component={Header} />
                    <Route path={"/register"} component={Register} />
                    <Route path={"/user/:id"} component={User} />
                    <Route path={"/chat"} component={Chat} />

                </div>
            </BrowserRouter>
        );
    }
}

export default App;



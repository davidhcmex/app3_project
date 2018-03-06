import * as React from 'react';
import './bootstrap.min.css';
//import {Vehicle} from './Vehicle';

import { Route, BrowserRouter } from "react-router-dom";


import { Register } from "./components/Register";
import { User } from "./components/User";
import { Header } from "./components/Header";
import { Chat } from "./components/Chat";




class App extends React.Component {

    // componentDidMount() {
    //     this.callApi()
    //         .then(res => this.setState({ response: res.express }))
    //         .catch(err => console.log(err));
    // }

    // callApi = async () => {
    //     const response = await fetch('/api/get');
    //     const body = await response.json();

    //     if (response.status !== 200) throw Error(body.message);
    //     return body;
    // };

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



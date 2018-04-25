import * as React from 'react';
import './index.css';
import './bootstrap.min.css';

//import {Vehicle} from './Vehicle';

import { Route, BrowserRouter, Switch } from "react-router-dom";


import { Register } from "./components/Register";
// import { User } from "./components/User";
import Login from "./components/Login";

//import { Header } from "./components/Header";
import ChatComposed from "./components/ChatComposed";

import { addLocaleData, IntlProvider } from 'react-intl';
import * as en from "react-intl/locale-data/en"
import * as es from "react-intl/locale-data/es"
import * as fr from "react-intl/locale-data/fr"
import { flattenMessages } from "./components/Intl/Util"

import { connect } from "react-redux";

import messages from "./components/Intl/Messages"

// let locale = (navigator.languages && navigator.languages [0])
// || navigator.language
// || "en-us"

//let locale = "es-ES"

addLocaleData([...en, ...es, ...fr])





class App extends React.Component<s2p, {}>{

    constructor(props: any) {
        super(props)

    }

    render() {
     
        return (
            <IntlProvider key={this.props.lang} locale={this.props.lang} messages={flattenMessages(messages[this.props.lang])}>
               
        {/* //   <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}> */}
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
            </IntlProvider>
        );
    }
}

interface s2p {
    lang: string
}

// const mapStateToProps = (state: any) => {
//    // console.log(state.form.simple) // IVAN ask
//     return {
//         lang: state.form.simple.values || "en-US"

//     };
// };
//export default App;

const mapStateToProps = (state: any) => {
    // console.log(state.form.simple) // IVAN ask
    return {
        lang: state.chatApp.lang

    };
};
export default connect<s2p, {}, {}>(mapStateToProps, {})(App)



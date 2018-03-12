import * as React from "react";

import {Header} from "./Header";

// Root is a Route (The "/" Route)
export class Root extends React.Component {
    render() {
        return (
            <div >
                        <Header />
            </div>
        );
    }
}
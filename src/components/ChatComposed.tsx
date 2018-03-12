import * as React from "react";
import  Chat  from "./ChatSimple";

// Home is a Route and is also called by Root
export class ChatComposed extends React.Component {
    render() {
        return (
            <div>
                <Chat />
            </div>
        );
    }
}
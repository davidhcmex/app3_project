import * as React from "react";
import Chat from "./ChatSimple";
import { Left } from "./Left";
import  Right  from "./Right";


// Home is a Route and is also called by Root
export class ChatComposed extends React.Component {
    render() {
        return (
            <div className="pageWrapper">
                <header text-alignment="center">
  
                    <h1>My Chat</h1>
                </header>
                <div className="contentWrapper">
                    <aside className="sidebar1">
                        <Left />
                    </aside>
                    <article className="main">
                        <div >
                            <Chat />
                        </div>
                    </article>
                    <aside className="sidebar2" >
                      
                     <Right />
                    </aside>
                </div>
                <footer>
                    <p>Messages to be submitted</p>

                </footer>
            </div>
        );
    }
}
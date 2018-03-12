import * as React from "react";
import Chat from "./ChatSimple";
import { Left } from "./Left";
import '../index.css';

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
                        <h2>Sidebar 2 </h2>
                        <ul>
                            <li>Aenean orci ante</li>
                            <li>Venenatis non adipiscing vita</li>
                            <li> Fringilla et neque</li>
                            <li>Aenean orci ante</li>
                            <li>Venenatis non adipiscing vita</li>
                            <li> Fringilla et neque</li>
                        </ul>
                        <p>Control Sidebar</p>
                    </aside>
                </div>
                <footer>
                    <p>Messages to be submitted</p>

                </footer>
            </div>
        );
    }
}
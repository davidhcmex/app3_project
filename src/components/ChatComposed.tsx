import * as React from "react";
import  Chat  from "./ChatSimple";
import Left from "./Left";
import Right from "./Right";
import * as openSocket from 'socket.io-client';
import  Logged  from "./Logged";
import { RouteComponentProps } from "react-router";


interface stateProps {
    socket:SocketIOClient.Socket
}


// Home is a Route and is also called by Root
export class ChatComposed extends React.Component<RouteComponentProps<{}>,stateProps> {

    constructor(props: any) {
        super(props)
        this.state = {
            socket: openSocket('http://127.0.0.1:4000'),
        }

    }
    render() {
        return (
            <div className="pageWrapper">
                <header text-alignment="center">

                    <h1>My Chat</h1>
                </header>
                <div className="contentWrapper">
                    <aside className="sidebar1">
                        <h2>Users Logged Now</h2>
                        <Logged socket={this.state.socket}/>
                        <h2>Users in Contacts</h2>
                        <Left socket={this.state.socket}/>
                    </aside>


                    <article className="main">
                        <div >
                            <Chat socket={this.state.socket}/>
                        </div>
                    </article>
                    <aside className="sidebar2" >

                        <Right socket={this.state.socket} history={this.props.history}/>
                    </aside>
                </div>
                <footer>


                </footer>
            </div>
        );
    }
}

import * as React from "react";
import Chat from "./ChatSimple";
import Left from "./Left";
import Right from "./Right";
import * as openSocket from 'socket.io-client';
import Logged from "./Logged";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";


interface stateProps {
    socket: SocketIOClient.Socket
}

interface m2p {
    chatNumber: number
}

// Home is a Route and is also called by Root
export class ChatComposed extends React.Component<m2p & RouteComponentProps<{}>, stateProps> {

    constructor(props: any) {
        super(props)
        this.state = {
            socket: openSocket('http://127.0.0.1:4000'),
        }

    }

    getChatNumber = () => (
        <Chat socket={this.state.socket} />
        // (this.props.chatNumber===1) ?
        //     <Chat socket={this.state.socket} top="top" /> :
            // <Chat socket={this.state.socket} top="bottom" />
    )

    handleChat = () => {
        console.log("HElluva")
        console.log(this.props.chatNumber)
    }
    render() {
        return (
            <div className="pageWrapper">
                <header text-alignment="center">

                    <h1>My Chat</h1>
                    <button onClick={this.handleChat} className="btn btn-info" >Click Me</button>
                </header>
                <div className="contentWrapper">
                    <aside className="sidebar1">
                        <h2>Users Logged Now</h2>
                        <Logged socket={this.state.socket} />
                        <h2>Users in Contacts</h2>
                        <Left socket={this.state.socket} />
                    </aside>


                    <article className="main">
                        <div >
                            {/* <Chat socket={this.state.socket}/> */}

                            {this.getChatNumber()}


                        </div>
                    </article>
                    <aside className="sidebar2" >

                        <Right socket={this.state.socket} history={this.props.history} />
                    </aside>
                </div>
                <footer>


                </footer>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        chatNumber: state.numChats

    };
};

export default connect<m2p, {}, { }>(mapStateToProps, {})(ChatComposed)

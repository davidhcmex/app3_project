import * as React from "react";
import Chat from "./ChatSimple";
import Left from "./Left";
import Right from "./Right";
import * as openSocket from 'socket.io-client';
import Logged from "./Logged";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';


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


    render() {
        return (
            <div className="pageWrapper">
                <header text-alignment="center">

                    <h1>
                        <FormattedMessage
                            id="chatComposed.myChat"
                            defaultMessage="dashboard"
                        />
                    </h1>

                </header>
                <div className="contentWrapper">
                    <aside className="sidebar1">
                        <h2>
                        <FormattedMessage
                            id="chatComposed.usersLoggedNow"
                            defaultMessage="dashboard"
                        />
                        </h2>
                        <Logged socket={this.state.socket} />
                        <h2>
                        <FormattedMessage
                            id="chatComposed.usersInContacts"
                            defaultMessage="dashboard"
                        />
                        </h2>
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
        chatNumber: state.chatApp.numChats

    };
};

export default connect<m2p, {}, {}>(mapStateToProps, {})(ChatComposed)

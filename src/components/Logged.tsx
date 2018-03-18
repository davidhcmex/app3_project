import * as React from "react";
//import * as openSocket from 'socket.io-client';
import { connect } from "react-redux"

interface PropsInterface {
    username: string,
    
}
interface p {
    socket:SocketIOClient.Socket
}

interface StateInterface {
    currentUsers: Array<{ _id: string, socketIDId: string, username: string }>,
    prevLogon: Array<{ socketID: string, username: string }>,
    logon: Array<{ socketID: string, username: string }>
}



// Home is a Route and is also called by Root
export class Logged extends React.Component<PropsInterface & p, StateInterface> {

    constructor(props: any) {
        super(props)
        this.state = {

            currentUsers: [],
            prevLogon: [],
            logon: []

            // selectedUsers: [{ _id: "", username: "" }],
        }
    }

    componentDidMount() {
       // var socket = openSocket('http://127.0.0.1:4000');

        this.props.socket.emit("username", this.props.username);
        // emitting to server and others the incoming message

        this.props.socket.on('currentusers', (data: any) => {
            console.log("currentusers")
            console.log(data)
            this.setState({ currentUsers: data })
            //  this.setState({all_logged:data})
        });
        
        this.props.socket.on('logon', (data: any) => {
            this.setState({ prevLogon: this.state.logon },
                () => this.setState({ logon: [...this.state.prevLogon, data] }
                ))
            //this.setState((state) => ({ logon: [...this.state.logon, data] }))
            //this.setState({ logon: [...this.state.logon, data] })
        });

        this.props.socket.on('logoff', (id:any) => {
            console.log("logging off currentuser")
            console.log(this.state.currentUsers)
            console.log("logging off logon")
            console.log(this.state.logon)
            
           // localStorage.removeItem("username");
        });
            


    }

    render() {

        return (
            <div>
                <div className="pageWrapper">
                    {this.state.currentUsers.map(function (d: any, idx: any) {
                        return (<p key={idx}>{d.username}</p>)
                    })}
                </div>
                <div className="pageWrapper">

                    {this.state.logon.map((d, idx) => {
                        return <p key={d.socketID}>{d.username}</p>
                    })}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        username: state.nameLoggedUser
   
    };
};



export default connect<PropsInterface, {}, {socket:SocketIOClient.Socket}>(mapStateToProps, {})(Logged)
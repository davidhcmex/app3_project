import * as React from "react";
//import * as openSocket from 'socket.io-client';
import { connect } from "react-redux"

interface PropsInterface {
    username: string,

}
interface p {
    socket: SocketIOClient.Socket
}

interface StateInterface {
    currentUsers: Array<{ _id: string, socketID: string, username: string }>,
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
        let aux = []

        this.props.socket.emit("username", this.props.username);
        // emitting to server and others the incoming message

        this.props.socket.on('currentusers', (data: any) => {
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

        this.props.socket.on('logoff', (id: any) => {

            console.log("id:", id)
            console.log("logging off currentuser")
            console.log(this.state.currentUsers)
            const index1 = this.state.currentUsers.findIndex(obj => obj.socketID === id);
            // console.log(this.state.currentUsers)
            console.log(index1)

            if (index1 != -1) {
      
                aux = this.state.currentUsers.filter((elem)=>elem.username != this.state.currentUsers[index1].username)
                this.setState({ currentUsers: aux });
            }


         //   console.log("logging off logon original")
         //   console.log(this.state.logon)

            // console.log("props socket id")
            // console.log(this.props.socket.id)
            const index2 = this.state.logon.findIndex(obj => obj.socketID === id);
           // console.log("index2", index2, "value", this.state.logon[index2].username )

            if (index2 != -1) {
               // console.log("deleting from logon")
                aux = this.state.logon.filter((elem)=>elem.username != this.state.logon[index2].username)
                this.setState({ logon: aux }, () => (console.log(this.state.logon)));

            }

            // localStorage.removeItem("username");
        });



    }

    render() {

        return (
            <div>
                <div className="pageWrapper">

                    {this.state.logon.map((d, idx) => {
                        return <p key={d.socketID}>Logon {d.username}</p>
                    })}

                </div>
                <div className="pageWrapper">
                    {this.state.currentUsers.map(function (d: any, idx: any) {
                        return (<p key={d.socketID}>Current User {d.username}</p>)
                    })}
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        username: state.chatApp.nameLoggedUser

    };
};



export default connect<PropsInterface, {}, { socket: SocketIOClient.Socket }>(mapStateToProps, {})(Logged)
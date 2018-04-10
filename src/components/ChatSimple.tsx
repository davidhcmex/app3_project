import * as React from 'react';
import { connect } from "react-redux"

interface stateInterface {
    message: string,
    status: string,
    uiUsername: string,
    the_messages: Array<{ userId: string, username: string, message: string, conversationId:string }>,
    //   roomId: string,
}

interface PropsInterface {
    username: string,
    userId: string,
    roomIdrdx: string,
    filterconversationId: string,
    all_messages: Array<{ userId: string, username: string,  message: string, roomId: string }>,
    arrayWithNames: Array<{ userName: string, message: string, roomId: string }>

}

interface p {
    socket: SocketIOClient.Socket,
    top: string
}

export class Chat extends React.Component<PropsInterface & p & d2p, stateInterface> {
    constructor(props: any) {
        super(props)
        this.state = {

            message: "",
            status: "",
            uiUsername: "",
            the_messages: [{ userId: "", username: "",  message: "" , conversationId:""}],
            // roomId: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e: React.FormEvent<EventTarget>) {
        this.setState(
            {
                message: this["message"].value
            })
    }

    componentWillMount() {
        //receiving data to be output to local component render
        // TEMPORAL SE ANALIZARA DESPUES
        //  this.props.socket.on('output', (data: any) => this.display_screen(data));

        //    IN SETUP <=      
        this.props.socket.on('emitbroadcast', (data: any) => {
            console.log("emitbroadcast has been received in chat component ")
            console.log(data)

        });

        // IN DISPLAY <=

        this.props.socket.on('broadcastmessage', (data: any) => {
            console.log("broadcastmessage has been received in chat component to be displayed ")

            console.log(data)
            // important !
            if (this.props.userId != data.userId)
                // store in redux of the incoming message
                { 
                    
                    this.props.addMessageRedux({ userId: data.userId, username: data.username, message: data.message, roomId: data.roomId })
                    
                }
             //this.display_screen(data) // not possible to use state and redux at the same time!
        });


    }

    display_screen(data: any) {

        let third_array = []
        third_array = (this.state.the_messages).concat(data)

        this.setState({ the_messages: third_array })
        console.log(this.state.the_messages)
    }

    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        this.props.socket.on("status", (data: any) => {
            this.setState({ status: data.status })
        })




        // TEMPORAL SE ANALIZARA DESPUES this.props.socket.emit("input", { name: this.props.username, message: this["message"].value })
        // send the message to the server so it gets broadcasted with "broadcastmessage" (on didMount)
        this.props.socket.emit("messagetoroom", { userId: this.props.userId, username: this.props.username, message: this["message"].value, roomId: this.props.roomIdrdx })
        console.log(this.props.userId, this.props.username)
        //store in redux of the local message
        this.props.addMessageRedux({ userId: this.props.userId, username: this.props.username, message: this["message"].value, roomId: this.props.roomIdrdx })
        this.props.filter_from_history(this.props.roomIdrdx)

    }

    render() {

        console.log("coonversationid", this.props.filterconversationId)
        console.log("all conversations", this.props.all_messages)
        let newArray = this.props.all_messages.filter((element) => {
            // for all the messages where the roomId is equal to the id of last pressed button
            return element.roomId == this.props.filterconversationId
        });


        return (
           
                    <div className="container" >

                        <div className="row">
                            <div className="col-md-6 offset-md-3 col-sm-12">
                                <div id="status">{this.state.status}</div>
                                <form onSubmit={this.onSubmit}>

                                    <div className="form-group">
                                        <label className="control-label">Logged User:</label>
                                        <p><strong> {this.props.username} </strong ></p>


                                    </div>
                                    <div id="chat">
                                        <div className="form-group">
                                            <label className="control-label">Message</label>
                                            <input value={this.state.message}
                                                type="text" name="message"
                                                ref={node => this["message"] = node}
                                                onChange={this.onChange}
                                                className="form-control" />

                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-md">
                                                Submit
                                            </button>
                                            <br />
                                        </div>
                                        <label className="control-label">Messages Flow</label>
                                        <div className="card">

                                            <div id="messages" className="card-block" style={{ height: "300px" }}>
                                                {/* {this.state.the_messages.map((d, idx) => {
                                                    return (<p key={idx}>{d.userId}{d.message}</p>)
                                                })} */}

                                                {newArray.map((d, idx) => {
                                                    return (<p key={idx}><strong>{d.username}:</strong>&nbsp;&nbsp;&nbsp;{d.message}</p>)
                                                })}

                                                {/* {(this.props.arrayWithNames !== undefined) ?
                                                    this.props.arrayWithNames.map((d, idx) => {
                                                        return (<p key={idx}><strong>{d.userName}:</strong>&nbsp;&nbsp;&nbsp;{d.message}</p>)
                                                    })
                                                    :

                                                    <br /> */}




                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        


        );
    }
}


const mapStateToProps = (state: any) => {
    return {

        userId: state.idLoggedUser,
        username: state.nameLoggedUser,
        roomIdrdx: state.roomId,
        filterconversationId: state.filterconversationId,
        all_messages: state.messages,
        arrayWithNames: state.arrayWithNames
    };
};


interface owned {
    //  top: string,
    socket: SocketIOClient.Socket
}

interface d2p {
    addMessageRedux: (messajeObj: { userId: string, username: string, message: string, roomId: string }) => (any),
    filter_from_history: (conversationId: string) => (any),
    getNames: (arrayOfIds: Array<{ userId: string, message: string, roomId: string }>) => (any),
    assignNames: (arrayWithNames: Array<{ userNames: string, message: string, roomId: string }>) => (any)



}

import axios from "axios"

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getNames: (arrayOfMessages: Array<{ userId: string, message: string, roomId: string }>) => axios.post("/api/users/getnamesmessages/", { arrayOfMessages }),

        assignNames: (arrayWithNames: Array<{ userNames: string, message: string, roomId: string }>) => dispatch({ type: "ADD_MSG_WITH_NAMES", payload: { arrayWithNames } }),

        filter_from_history: (switchtoconversationId: string) => dispatch({ type: "FILTER", payload: { switchtoconversationId } }),
        addMessageRedux: (messageObj: { userId: string, message: string, roomId: string }) => dispatch({ type: "ADD_MSG", payload: { messageObj } }),

    }
}

export default connect<PropsInterface, d2p, owned>(mapStateToProps, mapDispatchToProps)(Chat)
//export default connect(null, mapDispatchToProps)(Chat)
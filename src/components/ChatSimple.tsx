import * as React from 'react';
import { connect } from "react-redux"

interface stateInterface {
    message: string,
    status: string,
    uiUsername: string,
    the_messages: Array<{ name: string, message: string }>,
 //   roomId: string,
}

interface PropsInterface {
    username: string,
    userId: string,
    roomIdrdx: string
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
            the_messages: [{ name: "", message: "" }],
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

    componentDidMount() {
        //receiving data to be output to local component render
        // TEMPORAL SE ANALIZARA DESPUES
        //  this.props.socket.on('output', (data: any) => this.display_screen(data));

        //    IN SETUP <=      
        this.props.socket.on('emitbroadcast', (data: any) => {
            console.log("emitbroadcast has been received in chat component ")
            console.log(data)
         //   this.setState({ roomId: data.roomId })
        });

        // IN DISPLAY <=

        this.props.socket.on('broadcastmessage', (data: any) => {
            console.log("broadcastmessage has been received in chat component to be displayed ")
            this.display_screen(data)
        });


    }

    display_screen(data: any) {
        console.log(data)
        let third_array = []
        third_array = (this.state.the_messages).concat(data)
        this.setState({ the_messages: third_array })
    }

    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        this.props.socket.on("status", (data: any) => {
            this.setState({ status: data.status })
        })




        // TEMPORAL SE ANALIZARA DESPUES this.props.socket.emit("input", { name: this.props.username, message: this["message"].value })
        this.props.socket.emit("messagetoroom", { name: this.props.username, message: this["message"].value, roomId: this.props.roomIdrdx })
        this.props.addMessageRedux({userId: this.props.userId, message: this["message"].value, roomId: this.props.roomIdrdx })

        // OR

        // REDUX

        //this.props.emit(this["uname"].value, this["message"].value)

    }

    render() {
        return (
            <div className="outer">
                
                <div className={this.props.top}>
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
                                                {this.state.the_messages.map(function (d, idx) {
                                                    return (<p key={idx}>{d.name}{d.message}</p>)
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
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
        roomIdrdx: state.roomId
    };
};


interface owned {
    top:string,
    socket: SocketIOClient.Socket
}

interface d2p{
    addMessageRedux: (messajeObj: {userId:string, message: string, roomId:string }) => (any)
}


const mapDispatchToProps = (dispatch: Function) => {
    return {
        addMessageRedux: (messageObj: {userId:string, message: string, roomId:string }) => dispatch({ type: "ADD_MSG", payload: {messageObj}  }),
    }
}

export default connect<PropsInterface, d2p, owned>(mapStateToProps, mapDispatchToProps)(Chat)
//export default connect(null, mapDispatchToProps)(Chat)
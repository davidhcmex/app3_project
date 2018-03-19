import * as React from 'react';
//import * as openSocket from 'socket.io-client';
import { connect } from "react-redux"
//import handleSocket from "../modules/socketHandling"
//import { emit } from "./Thunks/emitThunk"

//import { emit } from "./Actions/emitActions"

interface stateInterface {
 
    message: string,
    status: string,
    uiUsername:string,
    the_messages: Array<{ name: string, message: string }>

}

interface PropsInterface {
    username:string,
}

interface p {
    socket:SocketIOClient.Socket
}

export class Chat extends React.Component<PropsInterface & p, stateInterface> {

    constructor(props: any) {
        super(props)
        this.state = {
      
            message: "",
            status: "",
            uiUsername: "",
            the_messages: [{ name: "", message: "" }],

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
         this.props.socket.on('output', (data: any) => this.display_screen(data));
    }

    display_screen(data: any) {
        let third_array = []

        third_array = (this.state.the_messages).concat(data)
        this.setState({ the_messages: third_array })
    }

    onSubmit(e:React.FormEvent<EventTarget>) {

        e.preventDefault()

      //  var socket = openSocket('http://127.0.0.1:4000');

        
        this.props.socket.on("status", (data:any) => {
            this.setState({ status: data.status })

        })




        this.props.socket.emit("input", { name: this.props.username, message: this["message"].value })

        // OR

        // REDUX

        //this.props.emit(this["uname"].value, this["message"].value)

    }

    render() {
        return (
            <div className="container">
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
                                        type="text" name="Message"
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

            </div >

        );
    }
}

const mapStateToProps = (state: any) => {
    return {
 
        userId: state.idLoggedUser,
        username: state.nameLoggedUser
    };
};
export default connect<PropsInterface, {}, {socket:SocketIOClient.Socket}>(mapStateToProps, { })(Chat)
//export default connect(null, mapDispatchToProps)(Chat)
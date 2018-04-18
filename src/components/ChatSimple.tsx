import * as React from 'react';
import { connect } from "react-redux"
import * as moment from "moment"


import 'moment/locale/es'  // without this line it didn't work
import { FormattedMessage } from 'react-intl';

interface stateInterface {
    message: string,
    status: string,
    uiUsername: string,
    the_messages: Array<{ userId: string, username: string, message: string, conversationId: string }>,
    //   roomId: string,
}

interface PropsInterface {
    username: string,
    userId: string,
    roomIdrdx: string,
    filterconversationId: string,
    all_messages: Array<{ userId: string, username: string, message: string, roomId: string, timestamp: string }>,
    arrayWithNames: Array<{ userName: string, message: string, roomId: string }>
    lang: string


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
            the_messages: [{ userId: "", username: "", message: "", conversationId: "" }],
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


        // IN DISPLAY <=

        this.props.socket.on('broadcastmessage', (data: any) => {
            console.log("broadcastmessage has been received in chat component to be displayed ")

            console.log(data)
            // important !
            if (this.props.userId != data.userId)
            // store in redux of the incoming message
            {

                this.props.addMessageRedux({ userId: data.userId, username: data.username, message: data.message, roomId: data.roomId, timestamp: data.timestamp })

            }

        });


    }


    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        this.props.socket.on("status", (data: any) => {
            this.setState({ status: data.status })
        })
        this.setState(
            {
                message: ""
            })




        // TEMPORAL SE ANALIZARA DESPUES this.props.socket.emit("input", { name: this.props.username, message: this["message"].value })
        // send the message to the server so it gets broadcasted with "broadcastmessage" (on didMount)

        moment.locale(this.props.lang.substr(0, 2))


        let localTimestamp = moment().format("LL, LTS").toString()
        console.log(localTimestamp)
        this.props.socket.emit("messagetoroom", { userId: this.props.userId, username: this.props.username, message: this["message"].value, roomId: this.props.roomIdrdx, timestamp: localTimestamp })

        //store in redux of the local message

        var d = new Date();
        var local_date = d.toLocaleDateString();
        var local_time = d.toLocaleTimeString();

        console.log("local date", local_date)
        console.log("local time", local_time)
        this.props.addMessageRedux({ userId: this.props.userId, username: this.props.username, message: this["message"].value, roomId: this.props.roomIdrdx, timestamp: localTimestamp })
        this.props.filter_from_history(this.props.roomIdrdx)

    }

    render() {

        console.log("coonversationid", this.props.filterconversationId)
        console.log(moment().format("LL, LTS").toString())
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
                                <label className="control-label">
                                    <FormattedMessage
                                        id="chatSimple.LoggedUser"
                                        defaultMessage="dashboard"
                                    />
                                </label>
                                <p><strong> {this.props.username} </strong ></p>


                            </div>
                            <div id="chat">
                                <div className="form-group">
                                    <label className="control-label">
                                        <FormattedMessage
                                            id="chatSimple.MessageLabel"
                                            defaultMessage="dashboard"
                                        />
                                    </label>
                                    <input value={this.state.message}
                                        type="text" name="message"
                                        ref={node => this["message"] = node}
                                        onChange={this.onChange}
                                        className="form-control" />

                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-md">
                                        <FormattedMessage
                                            id="chatSimple.Submit"
                                            defaultMessage="dashboard"
                                        />
                                    </button>
                                    <br />
                                </div>
                                <label className="control-label">
                                <FormattedMessage
                                            id="chatSimple.MessagesFlow"
                                            defaultMessage="dashboard"
                                        />
                                </label>
                                <div className="card">

                                    <div id="messages" className="card-block" style={{ height: "300px" }}>
                                        {/* {this.state.the_messages.map((d, idx) => {
                                                    return (<p key={idx}>{d.userId}{d.message}</p>)
                                                })} */}

                                        {newArray.map((d, idx) => {
                                            return (<p key={idx}><strong>{d.username}</strong>,({d.timestamp}):&nbsp;&nbsp;&nbsp;{d.message}</p>)
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

        userId: state.chatApp.idLoggedUser,
        username: state.chatApp.nameLoggedUser,
        roomIdrdx: state.chatApp.roomId,
        filterconversationId: state.chatApp.filterconversationId,
        all_messages: state.chatApp.messages,
        arrayWithNames: state.chatApp.arrayWithNames,
        timestamp: state.chatApp.timestamp,
        lang: state.chatApp.lang
    };
};


interface owned {
    //  top: string,
    socket: SocketIOClient.Socket
}

interface d2p {
    addMessageRedux: (messajeObj: { userId: string, username: string, message: string, roomId: string, timestamp: string }) => (any),
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
        addMessageRedux: (messageObj: { userId: string, message: string, roomId: string, timestamp: string }) => dispatch({ type: "ADD_MSG", payload: { messageObj } }),

    }
}

export default connect<PropsInterface, d2p, owned>(mapStateToProps, mapDispatchToProps)(Chat)
//export default connect(null, mapDispatchToProps)(Chat)
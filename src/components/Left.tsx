import * as React from 'react';
import { connect } from "react-redux"


interface ClassState {
    groupConversationId: string,
    members: any,
    OwnedGroupRoomId: Array<{ _id: string }>
    contacts: Array<{ _id: string, user: string, contact: string, username: string, contactname: string, conversationId: string }>

}


export class Left extends React.Component<connected_p, ClassState> {
    constructor(props: any) {
        super(props)
        this.state = {
            groupConversationId: "",
            OwnedGroupRoomId: [{ _id: "" }],
            contacts: [],
            members: []

        }
    }


    handleChat = (e: React.FormEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.id)
        let room_name = e.currentTarget.id

        console.log(this.props)

        // call the server-side function 'adduser' and send one parameter (value of prompt)
        //    => OUT SETUP

        this.props.socket.emit('addconversation', { room_name, user_name: this.props.nameLoggedUser });

        // DAVID Apr-2 room_name has to be put in redux so that the chat component know where to START
        this.props.setRoom(room_name)

        // DAVID Apr-2  this is needed to add a chat window to those already existent
        // DAVID Apr-8 no longer used, will be replaced by REDUX
        // this.props.setChatsNumber()


    }

    switchToChat = (e: React.FormEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.id)

        // if the id belonging to the button is different from the actual id where the conversation is happening

        //if (e.currentTarget.id != this.props.roomId) {
           // this.props.clear_message_window()
            this.props.filter_from_history(e.currentTarget.id ) 
            this.props.setRoom(e.currentTarget.id)
            // filter the content of the chat window according to REDUX
        //}


        // DAVID Apr-2  this is needed to add a chat window to those already existent
        // no need for this !!!.. time waisted :-(
        // this.props.setChatsNumber()
        // I will resume next monday from here

        // get the values in redux for the conversation belonging to the id
        // erase the content of the window
        // if there are values for that conversation id, put them in the window
        // (they must be ordered by timestamp to preserve the same sequence)




    }


    allMembers = (members: any) => {
        let all = ""

        members.forEach((element: any) => {

            all = all.concat("", element.username, "   email: ", element.email, "\n")

        });
        return (all)
    }




    componentDidMount() {

        this.props.getgroupsIds(this.props.loggedUser)

            .then(
                (response: any) => {
                    if (response.data !== undefined) {
                        this.setState({ OwnedGroupRoomId: response.data },
                            () => {
                                console.log("withRoomId", this.state)
                            })
                        this.props.getNames(response.data)
                            .then((response: any) => {
                                console.log("coming back")

                                this.setState({
                                    groupConversationId: response.data[0]._id,
                                    members: response.data[0].members
                                }, () => { console.log(response.data[0].members) })

                            }, () => { console.log("empty response, not found") })
                    }
                })


        // Ojo... is this necessary ?, do I need to put in the state befor hand ??
        this.props.getAllContactsList(this.props.loggedUser).then(
            (response: any) => {
                this.setState({ contacts: response.data })
            }
        )


    }


    render() {

        return (
            <div>
                {/* 1/1 REDUX REDUX REDUX REDUX REDUX */}
                {/* {(this.state.allUsers).map((d, idx) => { */}

                {(this.state.contacts).map((d, idx) => {
                    let li_value = d.contactname
                    return (
                        <div key={idx}>
                            <button onClick={this.handleChat} className="btn btn-info" id={d.conversationId} key={d.contact} >{li_value}</button>
                            <button onClick={this.switchToChat} className="btn btn-success" id={d.conversationId} key={d.contact.concat("b")} >switch here</button>
                            <br />
                        </div>
                    )
                })}
                <br />

                {this.state.groupConversationId ?
                    <div>
                        <button onClick={this.handleChat} className="btn btn-info" id={this.state.groupConversationId} key={this.state.groupConversationId} data-toggle="tooltip" data-placement="top" title={this.allMembers(this.state.members)}>Grupo</button>
                        <button onClick={this.switchToChat} className="btn btn-success" id={this.state.groupConversationId} key={this.state.groupConversationId.concat("b")} data-toggle="tooltip" data-placement="top" title={this.allMembers(this.state.members)}>Switch Here</button>
                    </div>
                    :
                    <br />
                }


                {/* {this.props.uiUserID ?
                    <button className="btn btn-info" key={this.props.uiUserID.concat("@@", this.props.uicontactId)} >{this.props.uicontactName}</button>
                    :
                    <br />
                } */}
            </div >
        );
    }
}

type m2p = {
    contacts: Array<{ _id: string, userId: string, contactId: string }>,
    loggedUser: string
    nameLoggedUser: string
    roomId: string
    uiUserID: string
    uicontactId: string
    uicontactName: string
    uiuserName: string
}

type d2p = {
    getgroupsIds: any
    getAllContactsList: (userIdTerm: string) => (any)
    getNames: (arrayOfIds: string) => (any)
    setRoom: (roomId: string) => (any)
    setChatsNumber: () => (any)
    filter_from_history: (conversationId:string)=> (any)
    clear_message_window: () => (any)
}

type own_p = {
    socket: SocketIOClient.Socket

}

type connected_p = m2p & d2p & own_p

const mapStateToProps = (state: any) => {
    return {
        contacts: state.allContactsInState,
        loggedUser: state.idLoggedUser,
        nameLoggedUser: state.nameLoggedUser,
        roomId: state.roomId,

        //properties of the recently added contact (it already is in Mongo)
        uiUserID: state.userIdContactState,
        uiuserName: state.userNameContactState,
        uicontactId: state.contactIdState,
        uicontactName: state.contactNameState


    };
};

import axios from "axios"

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getNames: (arrayOfIds: string) => axios.post("/api/users/getnames/", { arrayOfIds }),
        getgroupsIds: (userId: string) => axios.post("/api/users/getgroups/", { userId: userId }),
        getAllContactsList: (userIdTerm: string) => axios.post("/api/users/contactlist/", { userIdParam: userIdTerm }),
        setRoom: (roomId: string) => dispatch({ type: "SET_ROOMID", payload: { roomId } }),
        setChatsNumber: () => dispatch({ type: "SET_CHATNUMBER" }),
        filter_from_history: (switchtoconversationId:string)=> dispatch({type:"FILTER", payload:{switchtoconversationId}}),
        clear_message_window: () => dispatch({ type: "CLEAR_CHATWINDOW"}),
        //  displayAllContacts: (allUsers: Array<{ _id: string, username: string, selected: boolean }>) => dispatch({ type: "ADD_USERS", payload: { allUsers } })
    }
}

export default connect<m2p, d2p, own_p>(mapStateToProps, mapDispatchToProps)(Left)




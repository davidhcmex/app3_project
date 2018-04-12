import * as React from 'react';
import { connect } from "react-redux"


interface ClassState {
    groupConversationId: string,
    members: any,
    OwnedGroupRoomId: Array<{ _id: string }>
    contacts: Array<{ _id: string, user: string, contact: string, username: string, contactname: string, conversationId: string }>,
    display: Array<string>
    displayGroup: string
    cboot: Array<string>
    cbootgroup: string

}


export class Left extends React.Component<connected_p, ClassState> {
    constructor(props: any) {
        super(props)
        this.state = {
            groupConversationId: "",
            OwnedGroupRoomId: [{ _id: "" }],
            contacts: [],
            members: [],

            display: [],
            displayGroup: "block",

            cboot: [],
            cbootgroup: "btn btn-primary"


        }
    }


    switchToChat = (idx: number) => (e: React.FormEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.id)

        this.props.setRoom(e.currentTarget.id)
        this.props.filter_from_history(e.currentTarget.id)
        this.setState({
            cboot: Array.from({ length: this.state.contacts.length }, (v, k) => "btn btn-default"),
            cbootgroup: "btn btn-default"
        }, () => {
            if (idx === 0)
                this.setState({
                    cbootgroup: "btn btn-primary"
                })
            else {
                let cboot = [...this.state.cboot]
                cboot[idx - 1] = "btn btn-primary"
                this.setState({
                    cboot
                })
            }
        });






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

                                // this.props.setRoom(response.data[0]._id)
                                // this.props.filter_from_history(response.data[0]._id)

                                this.props.socket.emit('addconversations', [{ conversationId: response.data[0]._id, user_name: "" }])

                                this.props.socket.on('joined', () => {
                                    this.props.setRoom(response.data[0]._id)
                                    this.props.filter_from_history(response.data[0]._id)
                                })


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

                let contactAllinfo = response.data

                let conversationId_Username = contactAllinfo.map((obj: { conversationId: string, username: string }) => ({ conversationId: obj.conversationId, user_name: obj.username }));

                this.props.socket.emit('addconversations', conversationId_Username);

                // this magic is for filling the arrays of styles for the buttons
                this.setState({ contacts: response.data }, () => {

                    this.setState({ cboot: Array.from({ length: this.state.contacts.length }, (v, k) => "btn btn-default") });

                })
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

                        <div key={idx} >
                            <div>
                                {/* hack to have the ability to manage the active chat button */}
                                <button onClick={this.switchToChat(idx + 1)} /*style={{ display: this.state.display[idx] }} className="btn btn-default"*/ className={this.state.cboot[idx]} id={d.conversationId} key={d.contact.concat("b")} >{li_value}</button>

                            </div>
                        </div>


                    )
                })}
                <br />

                {this.state.groupConversationId ?
                    <div>
                        <button onClick={this.switchToChat(0)}  /*style={{ display: this.state.displayGroup }} className="btn btn-default" */ className={this.state.cbootgroup} id={this.state.groupConversationId} key={this.state.groupConversationId.concat("b")} data-toggle="tooltip" data-placement="top" title={this.allMembers(this.state.members)}>Grupo</button>

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
    filter_from_history: (conversationId: string) => (any)
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
        filter_from_history: (switchtoconversationId: string) => dispatch({ type: "FILTER", payload: { switchtoconversationId } }),
        clear_message_window: () => dispatch({ type: "CLEAR_CHATWINDOW" }),
        //  displayAllContacts: (allUsers: Array<{ _id: string, username: string, selected: boolean }>) => dispatch({ type: "ADD_USERS", payload: { allUsers } })
    }
}

export default connect<m2p, d2p, own_p>(mapStateToProps, mapDispatchToProps)(Left)




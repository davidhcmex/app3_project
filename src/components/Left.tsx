import * as React from 'react';
import { connect } from "react-redux"


interface ClassState {

    contacts: Array<{ _id: string, user: string, contact: string, username: string, contactname: string, conversationId: string }>

}


export class Left extends React.Component<connected_p, ClassState> {
    constructor(props: any) {
        super(props)
        this.state = {

            contacts: [],

            // selectedUsers: [{ _id: "", username: "" }],
        }
    }


    handleChat = (e: React.FormEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.id)
        let room_name = e.currentTarget.id

        console.log(this.props)

        // call the server-side function 'adduser' and send one parameter (value of prompt)
        this.props.socket.emit('addconversation', { room_name, user_name:this.props.nameLoggedUser });


        this.props.socket.on(e.currentTarget.id,
            (data: any) => {
                console.log("private conversation established")
                console.log(data)
            })


        this.props.socket.on('emitbroadcast', function (data: any) {
            console.log("emitbroadcast has been received ")
            console.log(data)

        });

    }

    componentDidMount() {

        // Ojo... is this necessary ?, do I need to put in the state befor hand ??
        this.props.getAllContactsList(this.props.loggedUser).then(
            (response: any) => {
                console.log("new data")
                console.log(response)
                this.setState({ contacts: response.data })
            }
        )

        console.log(this.props)

    }


    render() {
        return (
            <div>
                {/* 1/1 REDUX REDUX REDUX REDUX REDUX */}
                {/* {(this.state.allUsers).map((d, idx) => { */}
                {(this.state.contacts).map((d, idx) => {
                    let li_value = d.contactname
                    return (
                        <div>
                            <button onClick={this.handleChat} className="btn btn-info" id={d.conversationId} key={d.conversationId} >{li_value}</button>
                            <br />
                        </div>
                    )
                })}
                <br />
                {this.props.uiUserID ?
                    <button className="btn btn-info" key={this.props.uiUserID.concat("@@", this.props.uicontactId)} >{this.props.uicontactName}</button>
                    :
                    <br />
                }
            </div >
        );
    }
}

type m2p = {
    contacts: Array<{ _id: string, userId: string, contactId: string }>,
    loggedUser: string
    nameLoggedUser:string
    uiUserID: string
    uicontactId: string
    uicontactName: string
    uiuserName: string
}

type d2p = {
    getAllContactsList: (userIdTerm: string) => (any)
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

        getAllContactsList: (userIdTerm: string) => axios.post("/api/users/contactlist/", { userIdParam: userIdTerm }),
        //  displayAllContacts: (allUsers: Array<{ _id: string, username: string, selected: boolean }>) => dispatch({ type: "ADD_USERS", payload: { allUsers } })
    }
}

export default connect<m2p, d2p, own_p>(mapStateToProps, mapDispatchToProps)(Left)




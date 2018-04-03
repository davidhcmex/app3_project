
interface stateInterface {
    allUsersInState: Array<{ _id: string, username: string, selected: boolean }>
    idLoggedUser: string,
    allContactsInState: Array<{ _id: string, userId: string, contactId: string }>,
    messages:Array<{userId:string, message: string, roomId:string }>


    userId: string,
    usernamec: string,
    contactId: string,
    contactName: string,
    numChats: number
}

var initialState: stateInterface = {
    allUsersInState: [],
    idLoggedUser: "",
    allContactsInState: [],
    messages:[],

    userId: "",
    usernamec: "",
    contactId: "",
    contactName: "",
    numChats: 0
}

interface payloadInterface {
    type: string,
    payload: {
        id: string,
        username: string,
        allUsers: Array<{ _id: string, username: string, selected: boolean }>
        allContacts: Array<{ _id: string, userId: string, contactId: string }>
        messageObj: { userId:string, message: string, roomId:string}
        userId: string
        usernamec: string
        contactId: string,
        contactName: string,
        roomId: string
    }
}


const reducer = (state = initialState, action: payloadInterface) => {

    if (action.type === 'SET_CHATNUMBER') {
        var adding=0
        if (state.numChats === 1)
            adding = -1
        else
            adding = +1

        return {
            ...state,

            numChats: state.numChats + adding
        }
    }

    if (action.type === 'ADD_MSG') {
        return {
            ...state,
            messages: [...state.messages, action.payload.messageObj]
        }

       
        
    }

    if (action.type === 'ADD_USERS') {

        return {
            ...state,
            allUsersInState: action.payload.allUsers
        }
    }

    if (action.type === 'SET_USER_ID') {

        return {
            ...state,
            idLoggedUser: action.payload.id,
            nameLoggedUser: action.payload.username
        }
    }

    if (action.type === 'UNSET_USER_ID') {

        return {
            ...state,
            idLoggedUser: "",
            nameLoggedUser: ""
        }
    }

    if (action.type === 'ADD_CONTACTS') {

        return {
            ...state,
            allContactsInState: action.payload.allContacts
        }
    }

    if (action.type === 'ADD_USERUID') {

        return {
            ...state,
            userIdContactState: action.payload.userId,
            userNameContactState: action.payload.usernamec,
            contactIdState: action.payload.contactId,
            contactNameState: action.payload.contactName
        }
    }

    if (action.type === 'UNSET_CONTACTS') {

        return {
            ...state,
            userIdContactState: "",
            userNameContactState: "",
            contactIdState: "",
            contactNameState: ""
        }
    }


    if (action.type === 'SET_ROOMID') {

        return {
            ...state,
            roomId: action.payload.roomId
        }
    }



    return state;
};

export default reducer;






// export default reducer;
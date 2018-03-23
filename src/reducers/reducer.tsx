
interface stateInterface {
    allUsersInState: Array<{ _id: string, username: string, selected: boolean }>
    idLoggedUser: string,
    allContactsInState: Array<{ _id: string, userId: string, contactId: string }>,

    userId: string,
    usernamec: string,
    contactId: string, 
    contactName:string
}

var initialState: stateInterface = {
    allUsersInState: [],
    idLoggedUser: "",
    allContactsInState: [],

    userId: "",
    usernamec: "",
    contactId: "", 
    contactName:""
}

interface payloadInterface {
    type: string,
    payload: {
        id: string,
        username:string,
        allUsers: Array<{ _id: string, username: string, selected: boolean }>
        allContacts: Array<{ _id: string, userId: string, contactId: string }>
        userId: string
        usernamec: string
        contactId:string, 
        contactName:string
    }
}


const reducer = (state = initialState, action: payloadInterface) => {

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



    return state;
};

export default reducer;






// export default reducer;
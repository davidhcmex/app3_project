
interface stateInterface {
    allUsersInState: Array<{ _id: string, username: string, selected: boolean }>
    idLoggedUser: string,
    allContactsInState: Array<{ _id: string, userId: string, contactId: string }>
}

var initialState: stateInterface = {
    allUsersInState: [],
    idLoggedUser: "",
    allContactsInState: []
}

interface payloadInterface {
    type: string,
    payload: {
        id: string,
        username:string,
        allUsers: Array<{ _id: string, username: string, selected: boolean }>
        allContacts: Array<{ _id: string, userId: string, contactId: string }>
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

    if (action.type === 'ADD_CONTACTS') {

        return {
            ...state,
            allContactsInState: action.payload.allContacts
        }
    }



    return state;
};

export default reducer;






// export default reducer;
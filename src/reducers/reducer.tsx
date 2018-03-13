
interface stateInterface {
    allUsersInState: Array<{ _id: string, username: string, selected: boolean }>
    idLoggedUser: string
}

var initialState: stateInterface = {
    allUsersInState: [],
    idLoggedUser: ""
}

interface payloadInterface {
    type:string,
    payload: {
        id:string,
        allUsers:Array<{ _id: string, username: string, selected: boolean }> }
}

const reducer = (state = initialState, action:payloadInterface ) => {

    if (action.type === 'ADD_CONTACTS') {

        return {
            ...state,
            allUsersInState: action.payload.allUsers
        }
    }

    if (action.type === 'SET_USER_ID') {
      
        return {
            ...state,
            idLoggedUser: action.payload.id
        }
    }

    return state;
};

export default reducer;






// export default reducer;
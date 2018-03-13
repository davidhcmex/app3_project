
interface stateInterface {
    allUsersInState: Array<{ _id: string, username: string, selected: boolean }>
}

var initialState: stateInterface = {
    allUsersInState: []
}

const reducer = (state = initialState, action:any) => {

    if (action.type === 'ADD_CONTACTS') {

        return {
            ...state,
            allUsersInState: action.payload.allUsers
        }
    }
    return state;
};

export default reducer;






// export default reducer;


type objType = {
    _id: string,
    username: string,
    selected: boolean
}

interface stateInterface {
    allUsers: Array<objType>
}

var initialState: stateInterface = {
    allUsers: []
}

const reducer = (state = initialState, action: any) => {

}
export default reducer;




// const reducer = (state = {}, action:any) => {

//     if (action.type === 'EMIT_INPUT') {
//         console.log("here" + action.payload.name + action.payload.message )
//         socket.emit("input", {name:action.payload.name, message:action.payload.message},()=>{console.log("done")})
//         return state


//     }
//     return state;
// };

// export default reducer;
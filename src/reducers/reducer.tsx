import * as openSocket from 'socket.io-client';
var socket = openSocket('http://127.0.0.1:4000');



const reducer = (state = {}, action:any) => {
    
    if (action.type === 'EMIT_INPUT') {
        console.log("here" + action.payload.name + action.payload.message )
        socket.emit("input", {name:action.payload.name, message:action.payload.message},()=>{console.log("done")})
        return state
            
        
    }
    return state;
};

export default reducer;
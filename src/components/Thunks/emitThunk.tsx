import * as openSocket from 'socket.io-client';
var socket = openSocket('http://127.0.0.1:4000');



export function emit(name:any, message:any) {
    return (dispatch:Function) => {
        return socket.emit("input", {name, message})
    }
}
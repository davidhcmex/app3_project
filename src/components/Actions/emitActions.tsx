

// function save_message(name:string,message:string) {
// return {
//     type:"EMIT_MSG",
//     payload: {name,message}
// }
// }

// export function emit(name:string, message:string) {
//     return (dispatch:Function) => {
//         const obj = {name, message}
//         socket.emit("input", obj)
//         dispatch(save_message(name,message))
//     }
    
// }

export function emit(name:string, message:string) {
    return (dispatch:Function) => {
        return {
            onEmit: (name:any, message:any) => dispatch({ type: 'EMIT_INPUT', payload: { name, message } })
        }
    }
    
}
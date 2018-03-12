import axios from "axios"



export function findContacts(data:any) {
    return (dispatch:Function) => {
        return axios.post("/api/users/find", data)
    }
    
}
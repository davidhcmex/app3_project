import axios from "axios"



export function login(data:any) {
    return (dispatch:Function) => {
        return axios.post("/api/users/login",{username:data.username,password:data.password})
    }
    
}
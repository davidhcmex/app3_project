import axios from "axios";


export function userSignupRequest(userData:any) {
    return (dispatch:any) => {
        console.log("hi")
        return axios.post("/api/users",userData)
    }
}
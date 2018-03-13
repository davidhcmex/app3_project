import axios from "axios"



export function userlist(searchTerm:string) {
    return (dispatch:Function) => {
        return axios.post("/api/users/userlist/",{searchParam:searchTerm})
    }
    
}
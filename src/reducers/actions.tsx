export const ADD_MSG_WITH_NAMES = 'ADD_MSG_WITH_NAMES';
export const FILTER = 'FILTER';    /***** ya (dos veces en chatsimple y left) */
export const UNSETFILTER = 'UNSETFILTER'; /***** ya  en right */
export const UNSET_ROOMID = 'UNSET_ROOMID'; /***** ya  en right */
export const UNSET_CHATHISTORY = 'UNSET_CHATHISTORY'; /***** ya  en right */

export const ADD_MSG = 'ADD_MSG'; /***** ya  en chat simple */
export const ADD_USERS = 'ADD_USERS'; /***** ya  en right */
export const SET_USER_ID = 'SET_USER_ID'; /***** ya  en logn form */
export const UNSET_USER_ID = 'UNSET_USER_ID'; /***** ya  en right */
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const ADD_USERUID = 'ADD_USERUID'; /***** ya  en right */
export const UNSET_CONTACTS = 'UNSET_CONTACTS'; /***** ya  en right */
export const SET_ROOMID = 'SET_ROOMID'; /***** ya  en left */

export const filter = (switchtoconversationId:string) => {
    return {
        type: FILTER,
        payload: {switchtoconversationId}
    };
};

export const set_roomid = (roomId:string) => {
    return {
        type: SET_ROOMID,
        payload: {roomId}
    };
};

export const set_user_id = (id: string, username: string) => {
    return {
        type: SET_USER_ID,
        payload: {username, id}
    };
};

export const unsetuserid = () => {
    return {
        type: UNSET_USER_ID
 
    };
};

export const unsetcontacts = () => {
    return {
        type: UNSET_CONTACTS
 
    };
};

export const unsetchathistory = () => {
    return {
        type: UNSET_CHATHISTORY
 
    };
};

export const unset_roomid = () => {
    return {
        type: UNSET_ROOMID
 
    };
};



export const unsetfilter = () => {
    return {
        type: UNSETFILTER
 
    };
};

export const add_useruid = (userId:string, usernamec:string, contactId:string, contactName:string) => {
    return {
        type: ADD_USERUID,
        payload: {userId, usernamec, contactId, contactName}
 
    };
};

export const add_msg = (messageObj: { userId: string, message: string, roomId: string }) => {
    return {
        type: ADD_MSG,
        payload: {messageObj}
 
    };
};

export const add_users = (allUsers: Array<{ _id: string, username: string, selected: boolean }>) => {
    return {
        type: ADD_USERS,
        payload: {allUsers}
    };
};







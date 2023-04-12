import { ADD_FRIEND } from "../actionTypes"

export const addFriend=(user)=>{
    return {
        type:ADD_FRIEND,
        payload:user
    }
}
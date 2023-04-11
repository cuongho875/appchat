import { CHAT_GROUP, CHAT_PRIVATE, RESET } from "../actionTypes"

export const resetBoxChat = ()=>{
    return {
        type: RESET
    }
}
export const chatPrivate=(user)=>{
    return{
        type: CHAT_PRIVATE,
        payload:{
            type: CHAT_PRIVATE,
            user:user
        }
    }
}
export const chatGroup=(groupId)=>{
    return{
        type: CHAT_GROUP,
        payload:{
            type:CHAT_GROUP,
            groupId:groupId
        }
    }
}
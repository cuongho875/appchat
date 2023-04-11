import { ON_MESSAGE } from "../actionTypes"

export const onMessageSocket = (message)=>{
    return {
        type: ON_MESSAGE,
        payload: message
    }
}
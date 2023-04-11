import { CHAT_GROUP, CHAT_PRIVATE, RESET } from "../actionTypes"

export const BoxChatReducer = (state= null,action)=>{
    switch(action.type){
        case CHAT_PRIVATE:
            return action.payload;
        case CHAT_GROUP:
            return action.payload;
        case RESET:
            return null;
        default:
            return state;
    }
}
export default BoxChatReducer;
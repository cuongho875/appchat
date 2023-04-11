import { LOG_OUT, SIGN_IN } from "../actionTypes";

export const authenReducer =(state = null, action)=>{
    switch(action.type){
        case SIGN_IN:
            return action.payload;
        case LOG_OUT:
            return null;
        default: 
            return state;
    }
}
export default authenReducer;
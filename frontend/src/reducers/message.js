import { ON_MESSAGE } from "../actionTypes";

export const messageReducer = (state = "null",action)=>{
    switch(action.type){
        case ON_MESSAGE: 
            return action.payload;
        default:
            return state;
    }
}
export default messageReducer;
import { ADD_FRIEND } from "../actionTypes";

export const friendReducer = (state = null,action)=>{
    switch(action.type){
        case ADD_FRIEND:
            return action.payload;
        default: 
            return state;
    }
}
export default friendReducer;
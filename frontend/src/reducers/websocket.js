import { CONNECTION, DISCONNECTION } from "../actionTypes";

export const websocketReducer = (state = null , action)=>{
    switch(action.type){
        case CONNECTION:
            return action.payload;
        case DISCONNECTION:
            return null;
        default: 
            return state;
    }
}
export default websocketReducer;
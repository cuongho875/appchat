import { DARK_MODE, LIGHT_MODE } from "../actionTypes";

export const modeReducer = (state = "light",action)=>{
    switch(action.type){
        case LIGHT_MODE: 
            return action.payload;
        case DARK_MODE: 
            return action.payload;
        default:
            return state;
    }
}
export default modeReducer;
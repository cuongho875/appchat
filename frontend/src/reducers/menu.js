import { MENU_CHATS, MENU_CONTACTS, MENU_PROFILE, MENU_SETTINGS } from "../actionTypes";

export const menuReducer = (state = MENU_CHATS,action)=>{
    switch(action.type){
        case MENU_PROFILE:
            return MENU_PROFILE;
        case MENU_CHATS:
            return MENU_CHATS;
        case MENU_CONTACTS:
            return MENU_CONTACTS;
        case MENU_SETTINGS:
            return MENU_SETTINGS;
        default:
            return state;
    }
}
export default menuReducer;
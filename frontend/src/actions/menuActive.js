import { MENU_CHATS, MENU_CONTACTS, MENU_PROFILE, MENU_SETTINGS } from "../actionTypes"

export const activeProfile = ()=>{
    return {
        type:MENU_PROFILE
    }
}
export const activeChats = ()=>{
    return {
        type:MENU_CHATS
    }
}
export const activeContacts = ()=>{
    return {
        type:MENU_CONTACTS
    }
}
export const activeSettings = ()=>{
    return {
        type:MENU_SETTINGS
    }
}
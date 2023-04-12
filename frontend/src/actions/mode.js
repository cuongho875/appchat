import { DARK_MODE, LIGHT_MODE } from "../actionTypes"

export const changeDarkMode = ()=>{
    return {
        type: DARK_MODE,
        payload:"dark"
    }
}
export const changeLightMode = ()=>{
    return {
        type: LIGHT_MODE,
        payload:"light"
    }
}
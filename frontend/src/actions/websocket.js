import { CONNECTION, DISCONNECTION } from "../actionTypes"

export const connectWS=(socket)=>{
    return {
        type: CONNECTION,
        payload:socket
    }
}
export const disConnectWS=()=>{
    return {
        type: DISCONNECTION
    }
}
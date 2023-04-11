import {combineReducers} from 'redux';
import menu from './menu';
import authen from './authentication';
import socket from './websocket';
import boxchat from './boxchat';
import messageReceiver from './message';
const AllReducers = combineReducers({
    menu,
    authen,
    socket,
    boxchat,
    messageReceiver
});
export default AllReducers;
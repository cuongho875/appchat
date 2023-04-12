import {combineReducers} from 'redux';
import menu from './menu';
import authen from './authentication';
import socket from './websocket';
import boxchat from './boxchat';
import messageReceiver from './message';
import friend from './friend';
import modeReducer from './mode'
const AllReducers = combineReducers({
    menu,
    authen,
    socket,
    boxchat,
    messageReceiver,
    friend,
    modeReducer
});
export default AllReducers;
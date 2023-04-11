import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { connectWS } from "../../actions/websocket";
import BoxChat from "../../components/BoxChat";
import MenuContainer from "../../components/MenuContainer";
import SideBar from "../../components/SideBarContainer";

export default function HomePage() {
  const user = useSelector((state)=>state.authen);
  const ws = new WebSocket("ws://localhost:8080/chat");
  const navigate = useNavigate();
  const socket = useSelector((state)=>state.socket);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(user){
      let common = {
        type:'CONNECT',
        userId:user.userId
      }
      ws.onopen = function(e) {
        ws.send(JSON.stringify(common));
        dispatch(connectWS(ws));
      };
    }
    else{
      navigate('/signin')
    }
  },[])
  // if(socket){
  //   socket.onmessage=(e)=>{
  //     console.log(e.data);
  //   }
  // }
      return (
    <div>
      {user?<div className="App h-[100vh] w-[100vw] flex overflow-hidden">
      <MenuContainer />
      <SideBar />
      <BoxChat/>
    </div>:''}
    </div>
  );
}

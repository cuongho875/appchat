import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatPrivate } from "../../actions/boxchat";
import { CHAT_PRIVATE } from "../../actionTypes";
import { getDayFromDate } from "../../lib";

export default function ChatItem({ data }) {
  const [isActive,setIsActive] = useState(false);
  const self = useSelector((state) => state.authen);
  const chatActive = useSelector((state)=>state.boxchat);
  const user =
    data.sender.userId == self.userId ? data.receiver : data.sender;
  const dispatch = useDispatch();
  const handleChat = () => {
    dispatch(chatPrivate(user));
  };
  useEffect(()=>{
    if(chatActive){
      if(chatActive.type === CHAT_PRIVATE){
        if(chatActive.user.userId === user.userId){
          setIsActive(true);
        }
        else{
          setIsActive(false);
        }
      }
    }
  },[chatActive])
  const dateFormat = new Date(data.timestamp);
  let date = getDayFromDate(dateFormat);
  const className = isActive?" flex py-3 px-5 items-center cursor-pointer bg-slate-200 rounded-md":" flex py-3 px-5 items-center cursor-pointer hover:bg-slate-200 rounded-md";
  return (
    <div
      className={className}
      onClick={handleChat}
    >
      <img className="w-8 rounded-3xl" src={user.avatar} alt={user.username} />
      <div className="ml-3">
      <div className="">{`${user.firstName} ${user.lastName}`}</div>
      <div className="flex w-full text-sm text-zinc-400	">
        <div>{data.sender.userId===self.userId?`You: ${data.content}`:data.content}</div>
        <div className="pl-2">{`. ${date}`}</div>
      </div>
      </div>
    </div>
  );
}

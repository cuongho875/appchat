import React from 'react'
import { useSelector } from 'react-redux';
import { getDayFromDate } from '../../lib';

export default function Message({message}) {
    const user = useSelector((state)=>state.authen);
    const sender = message.sender;
    const date = getDayFromDate(new Date(message.timestamp));
  return (
    <li className="">
        {user.userId == sender.userId?
        <div className="flex justify-end flex-wrap">
            <div className="flex justify-end w-full pr-10">
                <div className=" py-2 px-6 rounded-md shadow  bg-[rgba(78,172,109,.23)]">{message.content}</div>
            </div>
            <div className="inline-flex mb-3 items-center">
                <div className="text-[#797c8c] text-xs">{date}</div>
                <div className="ml-3">You</div>
                <img src={sender.avatar} className="w-8 rounded-3xl"/>
            </div>
        </div>:
        <div>
        <div className="flex w-full pl-10">
            <div className="bg-white inline py-2 px-6 rounded-md shadow ">{message.content}</div>
        </div>
        <div className="flex mb-3 items-center">
            <img src={sender.avatar} className="w-8 rounded-3xl"/>
            <div className="ml-3">{`${sender.firstName} ${sender.lastName}`}</div>
            <div className="text-[#797c8c] text-xs">{date}</div>

        </div>
    </div>}
    </li>
  )
}

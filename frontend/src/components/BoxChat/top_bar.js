import React from 'react'
import { useSelector } from 'react-redux'

export default function TopBarUser() {
    const boxchat =useSelector((state)=>state.boxchat);
    const user = boxchat.user;
    return (
    <div className="w-full h-24 bg-white/50 backdrop-blur fixed flex items-center px-3">
        <img src={user.avatar} alt={user.username} className="w-10 rounded-3xl"/>
        <div className="ml-4">{`${user.firstName} ${user.lastName}`}</div>
    </div>
  )
}

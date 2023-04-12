import React, { Component } from 'react'
import { useDispatch } from 'react-redux';
import { chatPrivate } from '../../actions/boxchat';

export default function ContactItem({user}) {
    const dispatch = useDispatch();
    const handleChat = () => {
        dispatch(chatPrivate(user));
      };
  return (
    <div className="flex py-3 px-5 items-center cursor-pointer hover:bg-slate-200 rounded-md"
    onClick={handleChat}>
              <img className="w-8 rounded-3xl" src={user.avatar} alt={user.username} />
      <div className="ml-3">{`${user.firstName} ${user.lastName}`}</div>
    </div>
  )
}
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFriend } from '../../actions/friend';
import api from '../../api';

export default function ModalContactItem({user}) {
  const self = useSelector((state)=>state.authen);
  const isSelf = user.userId===self.userId?true:false;
  const dispatch = useDispatch();
  const handleAddFriend=()=>{
      api.post(`/user/addFriend/${self.userId}/${user.userId}`)
        .then((res)=>{
            if(res.data.type ==="SUCCESS"){
                alert(res.data.message);
                dispatch(addFriend(user));
            }
            else if(res.data.type ==="ERROR"){
                alert(res.data.message)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
  }
  return (
    <div className="py-2 px-10 flex items-center w-full justify-between border-b">
        <div className="flex items-center">
        <img className="w-8" src={user.avatar} alt={user.username}/>
        <div className="pl-4">
        <div>{`${user.firstName} ${user.lastName}`}</div>
        <div className="text-xs">
        {isSelf?`You`:''}
        </div>
        </div>
        </div>
        {!isSelf?<div>
            <button className="border-cyan-400 bg-cyan-400 px-1 py-2"
            onClick={handleAddFriend}>
                <span>
                    Add Friend
                </span>
            <i className='bx bxs-user-plus'></i>
            </button>
        </div>:''}
    </div>
  )
}

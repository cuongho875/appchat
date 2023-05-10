import React, { useEffect, useRef, useState } from 'react'
import ChatItem from '../ChatItem'
import api from '../../api';
import {useSelector} from 'react-redux'
import Search from '../Search';
export default function TabChats() {
  const [data,setData] = useState([]);
  const [dataInitial,setDataInitial] = useState([]);
  const refSearch = useRef();
  const user = useSelector((state)=>state.authen);
  const messageReceiver = useSelector((state)=>state.messageReceiver);
  const loadData = ()=>{
    api.get(`/message/getListBoxChat/${user.userId}`).then((res)=>{
      // console.log(res.data)
      setData(res.data);
      setDataInitial(res.data);
    })
  }
  useEffect(()=>{
    loadData();
  },[messageReceiver])
  const handleSearch=(e)=>{
    setData(dataInitial.filter((item)=>{
      if(item.sender.userId === user.userId){
        let fullName =`${item.receiver.firstName} ${item.receiver.lastName}`;
        if(fullName.match(refSearch.current.value)){
          return item;
        }
      }
      else{
        let fullName =`${item.sender.firstName} ${item.sender.lastName}`;
        if(fullName.match(refSearch.current.value)){
          return item;
        }
      }
    }))
  }
  return (
    <div className="w-full h-full bg-fuchsia-50	dark:bg-[#262626]">
      <div className="pt-4 h-[130px]">
        <div className="px-6 text-2xl font-medium	">
        Chats
        </div>
        <div className="w-full flex mt-8 justify-center">
        <input ref={refSearch} type="text" 
        className="w-64 px-6 py-2 text-sm focus:outline-none rounded-md"
        onChange={handleSearch}
        placeholder="Search here..."/>
    </div>      </div>
      <div className="w-full h-[calc(100vh - 130px)]">
       <div className="w-full h-full overflow-y-auto">
        {data.map((item,index)=>{
          return <ChatItem key={index} data={item}/>
        })}
       </div>
      </div>
    </div>
  )
}

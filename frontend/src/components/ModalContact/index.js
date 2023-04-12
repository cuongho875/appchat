import React,{forwardRef, useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux';
import api from '../../api';
import './index.css';
import ModalContactItem from './item';
function ModalContact(props,ref) {
  const refInput =  useRef();
  const [data,setData] = useState([]);
  const handleSearch=(e)=>{
    api.get(`/user/search/${refInput.current.value}`)
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    e.preventDefault();
  }
  return (
    <div >
          <div className="modal" >
        <div className="flex w-full px-4 py-4 h-12 border-b items-center justify-between">
            <div className="text-base font-medium">
                Add Contact
            </div>
            <div className="text-lg p-2 cursor-pointer" ref={ref}>
                <i className="bx bx-x" ></i>
            </div>
        </div>
        <form onSubmit={handleSearch} className="w-full px-8 py-6 flex items-center justify-center border-b">
        <input
          ref={refInput} type="text" className="w-3/4 py-2 px-4 focus:outline-none border border-cyan-400" autoComplete="off" placeholder="Search here..."/>
          <button className="flex items-center bg-cyan-400	 p-2 border border-cyan-400	">
          <i className="bx bx-search" ></i>
            <span>Tìm kiếm </span>
          </button>
        </form>
        <div>
        <div className="">
            {data.map((item,index)=>{
              return <ModalContactItem key={index} user={item}/>
            })}
        </div>
        </div>
    </div>
    </div>
  )
}
export default forwardRef(ModalContact);
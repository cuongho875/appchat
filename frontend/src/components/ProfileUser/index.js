import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import UserDropDown from "./user_dropdown";

export default function ProfileUser() {
  const user = useSelector((state) => state.authen);
  const [isEnable,setIsEnable] = useState(false);
  const dropDown = useRef();
  useEffect(()=>{
    if(isEnable){
      dropDown.current.style.display = "block";
    }
    else{
      dropDown.current.style.display = "none";

    }
  },[isEnable])
  const handleEnable=()=>{
    if(isEnable){
      setIsEnable(false);
    }
    else{
      setIsEnable(true);
    }
  }
  return (
    <div className="">
      <div className="h-20 flex justify-center items-center relative">
        <img
        onClick={handleEnable}
          src={user.avatar}
          alt={user.username}
          className="w-10 rounded-3xl border-4 cursor-pointer border-white"
        />
      <UserDropDown ref={dropDown}/>
      </div>
    </div>
  );
}

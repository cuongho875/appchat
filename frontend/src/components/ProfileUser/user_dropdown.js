import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOut } from "../../actions/authentication";
import { resetBoxChat } from "../../actions/boxchat";
import api from "../../api";

function UserDropDown(props,ref) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSelector((state)=>state.socket);
    const handleLogOut = ()=>{
      api.post('/auth/logout')
      .then((res)=>{
        dispatch(logOut());
        dispatch(resetBoxChat());
        socket.close();
        navigate('/signin')   
       })
      .catch((err)=>{
        console.log(err)
      })
    }
  return (
    <div ref={ref}
      className="absolute py-2 bg-white mb-2 whitespace-nowrap  ml-2 shadow-sm rounded p-4 z-50 none"
      style={{
        inset: "auto auto 0px 0px",
        transform: "translate3d(0px, -56px, 0px)",
        display: "block",
      }}
    >
      <div className="cursor-pointer">Change Password</div>
      <div className="cursor-pointer" onClick={handleLogOut}>Log out</div>
    </div>
  );
}
export default React.forwardRef(UserDropDown);

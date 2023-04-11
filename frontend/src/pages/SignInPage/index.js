import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router';
import { signIn } from '../../actions/authentication';
import Cookies from 'js-cookie';
import api from '../../api';
export default function SignInPage() {
    const username = useRef();
    const password = useRef();
    const [message,setMessage]=useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.authen);
    useEffect(()=>{
      if(user){
        navigate('/');
      }
    })
    const handleSignIn=(e)=>{
        if(username.current.value === '' || username.current.value === ''){
            setMessage("Chưa nhập đầy đủ thông tin")
        }
        else{
            axios.post('http://localhost:8080/api/auth/signin',{
                username:username.current.value,
                password:password.current.value
            },{
                headers:{
                    Accept:'*',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000/',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
                },
                withCredentials:true
            }).then((res)=>{
                // dispatch(signIn(res.data));
                const userId = Cookies.get("userId")
                if (userId) {
                  api
                  .get(`/user/getUser/${userId}`,{
                    headers:{
                      'Authorization': `Bearer ${res.data.accessToken}`
                    }
                  })
                  .then((res) => {
                    dispatch(signIn(res.data));
                    navigate('/');
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                }
            }).catch((err)=>{
              setMessage(err.response.data.message)
            })

        }
        e.preventDefault();
        
    }
  return (
    <div className="w-full h-full pt-10 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Chat
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign In
            </h1>
            <form className="space-y-4 md:space-y-6" method="POST" 
                            onSubmit={handleSignIn}
                            >
              <div>
              {message?<div className="text-red-600 text-sm">* {message}</div>:''}

                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                ref={username}
                autoComplete="off"
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                ref={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account ?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  SignUp here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

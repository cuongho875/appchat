import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import TopBarUser from "./top_bar";
import api from "../../api";
import FormSend from "./form_send";
import { onMessageSocket } from "../../actions/message";
export default function BoxChat() {
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.authen);
  const boxchat = useSelector((state) => state.boxchat);
  const [messages, setMessages] = useState([]);
  const refListMessage = useRef();
  const dispatch = useDispatch();
  const fetctMessagesInitial = () => {
    api
      .get(`/message/getAllMessage/${user.userId}/${boxchat.user.userId}`)
      .then((res) => {
        setMessages(res.data);
        if (refListMessage.current) {
          refListMessage.current.scrollTop =
            refListMessage.current.scrollHeight;
          refListMessage.current.scrollIntoView({ behavior: "smooth" });
        }
      });
  };
  useEffect(() => {
    if (boxchat) {
      if (boxchat.user) {
        fetctMessagesInitial();
        fetctMessagesInitial();
      }
    }
  }, [boxchat]);

  if (socket) {
    socket.onmessage = (e) => {
      const response = JSON.parse(e.data);
      console.log(response);
      setMessages((messages) => [...messages, response]);
      dispatch(onMessageSocket(response));
      if (refListMessage.current) {
        refListMessage.current.scrollTop = refListMessage.current.scrollHeight;
        refListMessage.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  }
  return (
    <div className="h-[100vh] w-full relative">
      {boxchat ? (
        <div>
          <div className="absolute top-0 left-0 h-full w-full bg-slate-200"></div>
          <div className="h-[85vh] overflow-y-auto scrollbar scrollbar-thumb-gray-900 w-full relative bg-[url('https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cdf9a08b200998.png')]">
            <TopBarUser />
            <div className="py-24 px-3">
              <ul>
                {messages.map((item, index) => (
                  <Message key={index} message={item} />
                ))}
                <li ref={refListMessage}></li>
              </ul>
            </div>
          </div>
          <FormSend/>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

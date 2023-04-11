import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";
export default function FormSend() {
  const [disable, setDisable] = useState(true);
  const refMessage = useRef();
  const refBtn = useRef();
  const user = useSelector((state) => state.authen);
  const boxchat = useSelector((state) => state.boxchat);
  const socket = useSelector((state) => state.socket);
  const handleSubmit = (e) => {
    const message = {
      content: refMessage.current.value,
      sender: user,
      receiver: boxchat.user,
    };
    const common = {
      message: message,
      type: "CHAT",
    };
    socket.send(JSON.stringify(common));
    api
      .post("/message/sendMessage", message)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    refMessage.current.value = "";
    e.preventDefault();
  };

  const onChangeInput = () => {
    if (refMessage.current.value) {
      refBtn.current.disabled = false;
    } else {
      refBtn.current.disabled = true;
    }
  };
  return (
    <div className="fixed bottom-0 w-full h-[15vh] flex items-center bg-white/50 bg-white">
      <div className="h-[50%] w-full px-6 flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex items-center"
        >
          <input
            ref={refMessage}
            onChange={onChangeInput}
            className="h-10 w-[60%] px-4 py-2 text-[#495057] text-sm
            transition-shadow	 rounded-md	
           focus:outline-0 focus:border-solid focus:border-2 border-[#e6ebf5]"
            autoComplete="off"
            placeholder="Type your message..."
            type="text"
            name="message"
          />
          <div className="h-10 ml-4">
            <button
              ref={refBtn}
              className="h-10 bg-[#4eac6de6] w-10 text-white disabled:opacity-50 rounded-md transition-shadow	"
              type="submit"
              disabled={true}
            >
              <i className="bx bxs-send"></i>{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

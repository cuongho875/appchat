import React, { useEffect, useRef, useState } from "react";
import ModalContact from "../ModalContact";
import Overlay from "../Overlay";

export default function ButtonAddContact() {
  const refOverLay = useRef();
  const refBtnClose = useRef();
  const handleAddContact = () => {
    setDisable(true);
  };
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (disable) {
      if (refBtnClose) {
        refBtnClose.current.addEventListener("click", (e) => {
          setDisable(false);
        });
      }
      if (refOverLay) {
        refOverLay.current.addEventListener("click", (e) => {
          setDisable(false);
        });
      }
    }
  }, [disable]);
  return (
    <div className="text-md font-normal">
      <button
        onClick={handleAddContact}
        className="hover:bg-[#4eac6de6] hover:text-white px-2 py-1 bg-slate-200 rounded-md text-[#4eac6de6]"
      >
        <i className="bx bx-plus"></i>
      </button>
      {disable ? <ModalContact ref={refBtnClose} /> : ""}
      {disable ? <Overlay ref={refOverLay} /> : ""}
    </div>
  );
}

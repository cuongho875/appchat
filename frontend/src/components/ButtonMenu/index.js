import React from "react";

export default function ButtonMenu({ icon, title, active,onClick }) {
  const className = active
    ? "text-3xl w-full h-full flex justify-center items-center text-[#4eac6d] relative"
    : "text-3xl w-full h-full flex justify-center items-center";
  
  return (
    <div className="w-full h-20 py-2">
      <button title={title} className={className} onClick={onClick}>
          {active?
          <span className="absolute h-5 w-[3px] bg-[#4eac6d] right-0"></span>:''}
        <li className={icon}></li>
      </button>
    </div>
  );
}

import React, { forwardRef} from 'react'
import './index.css'
function Overlay(props,ref) {
  return (
    <div 
    ref={ref} className="bg-blend-overlay z-40 fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)]"></div>
  )
}
export default forwardRef(Overlay);

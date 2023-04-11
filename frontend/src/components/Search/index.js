import React, { forwardRef, useRef } from 'react'

 function Search({title},ref) {
     
  return (
    <div>
        <input ref={ref} type="text" 
        onChange={()=>{
            console.log(ref.current.value)
        }} 
        placeholder={title}/>
    </div>
  )
}
export default forwardRef(Search);
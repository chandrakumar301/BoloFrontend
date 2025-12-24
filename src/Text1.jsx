import React from 'react'
// import { useState } from 'react'
import './App.css'
function Text({setInputValue,inputValue}) {
  return (
    <div className='textPage'>
        <input contentEditable="true" className="text_input" placeholder='EnterText' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} draggable="true" type="text" /> 
    </div>
  )
}

export default Text

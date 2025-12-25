import React from 'react'
import './App.css'
import { useEffect } from 'react'
const ToolBar = ({setDown,Down}) => {

  useEffect(()=>{
    if(Down===true){
    // alert("chandra");
    // setDown(false);
  }
  })
  return (
    <div className='chandra'>
      <div className='Nav'>
        <h2>Project Name</h2>
        <button>Preview</button>
        <button>Save</button>
        <button>Send</button>
        <button className='PDF' onClick={()=>{setDown(true)}}>Download</button>
      </div>
    </div>
  )
}

export default ToolBar;
